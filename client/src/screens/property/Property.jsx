import React, { useState, Suspense, useRef, useEffect } from "react";
import {
  Center,
  SimpleGrid,
  Box,
  VStack,
  Divider,
  Text,
  Button,
} from "@chakra-ui/react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { url } from "../../Global/URL";
import showToast from "../../Global/Toast";
import { useToast, useTheme } from "@chakra-ui/react";
import { GoogleMap, LoadScript, MarkerF, Marker } from "@react-google-maps/api";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Loader from "../../components/Loader";

// importing other page components
import LocationCards from "../Home/LocationCards";

const Property = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useToast();
  const { colors } = useTheme();

  //   setting the response for nearby properties
  const [nearby, setNearby] = useState();
  console.log(nearby);

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
          longitude: data[0].location.coordinates[0],
          latitude: data[0].location.coordinates[1],
        })
        .then((response) => response.data);
      console.log(response);
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
              bg="brand.violet"
              style={{ borderRadius: "20px", overflow: "hidden" }}
            >
              <LoadScript googleMapsApiKey="AIzaSyCBsEwnTS9s-IvZmvirO4t9OIT9VEs4UAU">
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
              <Text
                fontWeight={"bold"}
                mt={"70px"}
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
                <Text mt={"5px"} fontSize={20} color={"#fff"}>
                  Current Price
                </Text>
                <Text mt={"5px"} fontSize={35} color={"brand.blue"}>
                  {data[0].price} ETH
                </Text>
              </Box>
              <SimpleGrid columns={[1, 2]} mt={30} height={"100%"} gap={5}>
                <Button
                  color={"#fff"}
                  bg={"brand.violet"}
                  style={{ borderRadius: "15px" }}
                >
                  Buy
                </Button>
                <Button
                  border={"solid 0.5px #fff"}
                  color={"#fff"}
                  bg={"transparent"}
                  style={{ borderRadius: "15px" }}
                >
                  Save for Later
                </Button>
              </SimpleGrid>
            </VStack>
          </Box>
        </Box>
      </SimpleGrid>
      <div className="other-properties p-4 mt-4">
        <h1 className="text-3xl font-bold text-white">
          Other Nearby Properties
        </h1>
        <div className="flex justify-start items-center gap-4 mt-4">
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
                    key={index}
                    title={res.title}
                    price={res.price}
                    state={res.state}
                  />
                </span>
              );
            })
          ) : (
            <Loader />
          )}
        </div>
      </div>
    </div>
  );
};

export default Property;
