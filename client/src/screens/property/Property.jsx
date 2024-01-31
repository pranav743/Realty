import React, { useState, Suspense, useRef, useEffect } from "react";
import {
  Center,
  SimpleGrid,
  Box,
  VStack,
  Divider,
  Text,
  Button,
  AbsoluteCenter,
} from "@chakra-ui/react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { url } from "../../Global/URL";
import showToast from "../../Global/Toast";
import { useToast, useTheme } from "@chakra-ui/react";
import { GoogleMap, LoadScript, MarkerF, Marker } from "@react-google-maps/api";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Loader from "../../components/Loader";
import { ethers } from "ethers";
import abi from "../Realty.json";

// importing other page components
import LocationCards from "../Home/LocationCards";
import NearbyAmenities from "./NearbyAmenities";
import Images from "./Images";
import { whiten } from "@chakra-ui/theme-tools";
import { getUserDetails } from "../../Global/authUtils";



const Property = () => {
  //BLOCKCHAIN CALL STARTS

  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null,
  });

  useEffect(() => {
    const connectWallet = async () => {
      const contractAddress = "0x149D1B28ac0aD75149e3126B109Ee59E72bb7322";
      const contractAbi = abi.abi;
      try {
        const { ethereum } = window;
        if (ethereum) {
          const account = await ethereum.request({ method: "eth_requestAccounts" });
        } else {
          console.log("no metamask");
        }
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(contractAddress, contractAbi, signer);
        setState({ provider, signer, contract });
      } catch (error) {
        console.log(error);
      }
    };
    connectWallet();
  }, []);

  const { contract } = state;

  const getProperty = async (propertyID,price) => {
    try {
      console.log("BUYING PROPERTY")
      const BuyDetails = await contract.buyProperty(propertyID,price);
      alert("PROPERTY BOUGHT");
      showToast(toast, 'Success', 'success', "Property Bought !");
    } catch (error) {
      console.error("Error fetching batch details:", error.reason);
      showToast(toast, 'Error', 'error', error.reason);
    }
  };

  //BLOCKCHAIN CALL ENDS

  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useToast();
  const { colors } = useTheme();

  //   setting the response for nearby properties
  const [nearby, setNearby] = useState();
  // console.log(nearby);

  //   reloading the page
  const [reload, setReload] = useState(false);

  //MAPS
  const [selectedMarkerInfo, setSelectedMarkerInfo] = useState(false);
  console.log(selectedMarkerInfo);

  const hexToRgb = (hex) => {
    const bigint = parseInt(hex.slice(1), 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return `${r}, ${g}, ${b}`;
  };

  const addToWishList = async () => {
    try {
        const current_user = await getUserDetails();
        const res = await axios.post(url+'/add-to-wishlist', {user_id: current_user._id, property_id: id});
        console.log(res) ;
      showToast(toast, "success", 'success', "Property Added to WishList");

    } catch (error) {
      console.log(error);
      showToast(toast, "error", 'error', "Something Went Wrong");
    }
  }

  //   fetching the data
  const { isError, isLoading, data } = useQuery({
    queryKey: ["/properties/all/id"],
    retryDelay: 100000,
    queryFn: async () => {
      const temp = await axios
        .get(url + `/properties/all?_id=${id}`)
        .then((response) => response.data.data);
      console.log(temp);
      return temp;
    },
  });

  const fetchNearbyProperties = async () => {
    try {
      const response = await axios
        .post(url + `/find`, {
          longitude: data[0].location.coordinates[1],
          latitude: data[0].location.coordinates[0],
        })
        .then((response) => response.data);
      // console.log(response);
      setNearby(response);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchNearbyProperties();
  }, [data]);

  if (isLoading) {
    return <Loader />;
  }
  if (isError) {
    return <h1>There was an error loading the data :(</h1>;
  }

  return (
    <div>
      <SimpleGrid columns={[1, 2]} height={"100%"}>
        <Box height="100%">
          <Center h={"100%"}>
            <Box
              h={"500px"}
              minW={"300px"}
              w={"100%"}
              maxW={"500px"}
              // bg="brand.violet"
              style={{ borderRadius: "20px", overflow: "hidden" }}
            >
              <LoadScript
                googleMapsApiKey="AIzaSyCBsEwnTS9s-IvZmvirO4t9OIT9VEs4UAU"
                loadingElement={<Loader />}
              >
                <GoogleMap
                  mapContainerStyle={{
                    width: "100%",
                    height: "100%",
                  }}
                  center={{
                    lat: data[0].location.coordinates[0],
                    lng: data[0].location.coordinates[1],
                  }}
                  zoom={20}
                >
                  <MarkerF
                    position={{
                      lat: data[0].location.coordinates[0],
                      lng: data[0].location.coordinates[1],
                    }}
                    icon={{
                      // url: user,
                      scaledSize: { width: 50, height: 50 },
                    }}
                  />
                  {/* <Marker position={{ lat: 19.076, lng: 72.8777 }} /> */}
                </GoogleMap>
              </LoadScript>
            </Box>
          </Center>
        </Box>
        <Box height="100%">
          <Box
            bg={"dark.700"}
            minH={"100%"}
            h={"auto"}
            w={"100%"}
            p={5}
            style={{ borderRadius: "15px" }}
          >
            <VStack align={"left"}>
              <span onClick={() => (window.location.href = `/room/3D/1`)}>
                <Button border={'solid 1px #fff'} bg={'transparent'} color={'#fff'}>View in 3D</Button>
              </span>
              <Text
                fontWeight={"bold"}
                mt={"10px"}
                fontSize={28}
                color={"#fff"}
              >
                {data[0].title}
              </Text>
              <Text color={"font.300"} fontSize={"18px"} w={"80%"}>
                Owned by{" "}
                <span style={{ color: colors.brand.pink }}>Pranav</span>
              </Text>

              <Text
                color={"font.200"}
                fontStyle={"italic"}
                mt={10}
                fontSize={"18px"}
              >
                {data[0].description}
              </Text>

              <Box
                mt={"50px"}
                bg={"transparent"}
                p={5}
                border={"solid 0.5px #fff"}
                style={{ borderRadius: "20px" }}
              >
                <Text mt={"5px"} fontSize={22} color={"#fff"}>
                  Current Price
                </Text>
                <Text mt={"5px"} fontSize={35} color={"brand.blue"}>
                  {data[0].price} ETH 
                </Text>
                <Text mt={"5px"} fontSize={20} color={"font.300"}>
                ₹ {Number(data[0].price) * 194000}
                </Text>
              </Box>
              <SimpleGrid columns={[1, 2]} mt={30} height={"100%"} gap={5}>
                <Button
                  color={"#fff"}
                  bg={"brand.violet"}
                  style={{ borderRadius: "15px" }}
                  onClick={()=>getProperty(Number(data[0].propertyID),Number(data[0].price)*100)}
                >
                  Buy
                </Button>
                <Button
                  border={"solid 0.5px #fff"}
                  color={"#fff"}
                  bg={"transparent"}
                  style={{ borderRadius: "15px" }}
                  onClick={addToWishList}
                >
                  Save for Later
                </Button>
              </SimpleGrid>
            </VStack>
          </Box>
        </Box>
      </SimpleGrid>
      <Box position="relative" padding="10">
        <Divider />
        <AbsoluteCenter
          bg="dark.300"
          color={"white"}
          fontSize={"20px"}
          px="4"
          borderRadius={8}
        >
          Property Images
        </AbsoluteCenter>
      </Box>
      <Images images={data[0].image} />
      <Box position="relative" padding="10">
        <Divider />
        <AbsoluteCenter
          bg="dark.300"
          color={"white"}
          fontSize={"20px"}
          px="4"
          borderRadius={8}
        >
          Nearby Amenities
        </AbsoluteCenter>
      </Box>
      {data && (
        <NearbyAmenities
          latitude={data[0].location.coordinates[0]}
          longitude={data[0].location.coordinates[1]}
        />
      )}
      <Box position="relative" padding="10">
        <Divider />
        <AbsoluteCenter
          bg="dark.300"
          color={"white"}
          fontSize={"20px"}
          px="4"
          borderRadius={8}
        >
          Other Nearby Properties
        </AbsoluteCenter>
      </Box>
      <div className="other-properties p-4 px-8 mt-4">
        <div className="flex justify-start items-center gap-4">
          {nearby ? (
            nearby.data.map((res, index) => {
              return (
                // <Link to={`/property/${res._id}`}>
                <span
                  onClick={() => {
                    window.location.href = `/property/${res._id}`;
                  }}
                >
                  <LocationCards
                    layout={"grid"}
                    key={index}
                    title={res.title}
                    price={res.price}
                    state={res.state}
                    image={res.image}
                  />
                </span>
              );
            })
          ) : (
            <Loader />
          )}
          {/* {nearby && (
            <h1 style={{ color: "#fff" }}> No properties avaliable Nearby</h1>
          )} */}
          {nearby && nearby.data.length == 0 && (
            <h1 className="text-white margin-auto">
              {" "}
              No properties avaliable Nearby 😢
            </h1>
          )}
        </div>
      </div>
    </div>
  );
};

export default Property;
