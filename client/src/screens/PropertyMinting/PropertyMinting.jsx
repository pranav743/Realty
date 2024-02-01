import { VStack, Text, SimpleGrid, Box } from "@chakra-ui/layout";
import { FormControl } from "@chakra-ui/form-control";
import {
  FormLabel,
  Input,
  Textarea,
  Select,
  Button,
  useToast,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import abi from "../Realty.json";
import axios from "axios";
import { places } from "../newProfile/data";
import { url } from "../../Global/URL";
import { getUserDetails } from "../../Global/authUtils";
import { useNavigate } from "react-router-dom";

import showToast from "../../Global/Toast";

const PropertyMinting = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [bedroom, setBedroom] = useState("");
  const [bathroom, setBathroom] = useState("");
  const [area, setArea] = useState("");
  const [image, setImage] = useState([]);
  const [propertyID, setPropertyID] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  //blockchain call starts

  const [st, setst] = useState({
    provider: null,
    signer: null,
    contract: null,
  });

  useEffect(() => {
    const connectWallet = async () => {
      const contractAddress = "0xbB63f7054DA6eAeD619f5EaFb0A6d3d22837c9A2";
      const contractAbi = abi.abi;
      console.log(contractAbi);
      try {
        const { ethereum } = window;
        if (ethereum) {
          const account = await ethereum.request({
            method: "eth_requestAccounts",
          });
          console.log("ACCOUNT: ", account[0]);
        } else {
          console.log("no metamask");
        }

        const provider = new ethers.providers.Web3Provider(ethereum);

        console.log(provider);

        const signer = provider.getSigner();

        console.log("signer", signer);

        const contract = new ethers.Contract(
          contractAddress,
          contractAbi,
          signer
        );

        console.log("contract", contract);

        setst({ provider, signer, contract });
      } catch (error) {
        console.log(error);
      }
    };
    connectWallet();
  }, []);

  const MintProperty = async () => {
    setIsSubmitted(true);
    const { contract } = st;
    console.log("contract", st);

    //addthetoken uri and the propertyid

    try {
      const MintedPropID = await contract.mintNFT(
        url + `?propertyID=${propertyID}`,
        propertyID
      );
      showToast(toast, "success", "success", `NFT Minted !`);
      handleSubmit();
      showToast(toast, "success", "success", "Property Listed !");
    } catch (error) {
      console.error("Error fetching batch details:", error);
    }
    setIsSubmitted(false);
  };

  //blockchain call ends

  const [user, setUser] = useState("");
  const [file, setFile] = useState();

  const toast = useToast();

  const getData = async () => {
    try {
      const data = await getUserDetails();
      // console.log(data);
      setUser(data);
    } catch (error) {
      navigate("/login");
    }
    if (!localStorage.getItem("RSaccessToken")) {
      navigate("/login");
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const details = {
    title: title,
    description: description,
    price: price,
    city: city,
    state: state,
    location: {
      coordinates: [Number(latitude), Number(longitude)],
    },
    bedrooms: bedroom,
    bathrooms: bathroom,
    area: area,
    image: image,
    user: user,
    propertyID: propertyID,
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFile(file);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImage(reader.result);
    };
  };

  const handleSubmit = async () => {
    // e.preventDefault();
    setIsSubmitted(true);
    console.log(details);
    try {
      const res = await axios.post(url + "/mint", details);
      console.log(res.data);
      showToast(toast, "success", "success", "Property Successfully Minted");
    } catch (error) {
      // console.log(error);
      showToast(toast, "error", "error", error.response.data.msg);
      // console.log(error);
    }
    setIsSubmitted(false);
  };

  console.log(st);
  return (
    <VStack mx={200}>
      <Text
        bgGradient="linear(to-l, #22c0ff, #7033ff)"
        bgClip="text"
        fontSize="4xl"
        fontWeight="500"
        mt={2}
      >
        Mint Property
      </Text>

      <FormControl isRequired color="white">
        <FormLabel>Property ID</FormLabel>
        <Input
          mb={4}
          placeholder="Property ID"
          type="text"
          onChange={(e) => {
            setPropertyID(e.target.value);
          }}
          value={details.propertyID}
        />

        <FormLabel>Title</FormLabel>
        <Input
          mb={4}
          placeholder="Enter Title"
          type="text"
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          value={details.title}
        />

        <FormLabel>Description</FormLabel>
        <Textarea
          mb={4}
          placeholder="Enter Description"
          onChange={(e) => {
            setDescription(e.target.value);
          }}
          value={details.description}
        />

        <FormLabel>Price</FormLabel>
        <Input
          mb={4}
          placeholder="Price in Ether"
          type="number"
          onChange={(e) => {
            setPrice(e.target.value);
          }}
          value={details.price}
        />

        <FormLabel>Location</FormLabel>

        <SimpleGrid columns={[1, 2]} height={"100%"} gap={5}>
          <Select
            placeholder="State"
            mb={4}
            onChange={(e) => setState(e.target.value)}
            value={details.state}
          >
            <option value="" className="text-black">
              State
            </option>
            {places.map((place, index) => (
              <option key={index} value={place.state} className="text-black">
                {place.state}
              </option>
            ))}
          </Select>

          <Select
            mb={4}
            placeholder="City"
            onChange={(e) => {
              setCity(e.target.value);
            }}
            value={details.city}
          >
            <option value="" className="text-black">
              City
            </option>
            {state !== "" &&
              places
                .find((entry) => entry.state === state)
                .cities.map((city, index) => {
                  return (
                    <option key={index} value={city} className="text-black">
                      {city}
                    </option>
                  );
                })}
          </Select>
        </SimpleGrid>

        <SimpleGrid columns={[1, 2]} height={"100%"} gap={5}>
          <Input
            mb={4}
            placeholder="Latitude"
            type="text"
            onChange={(e) => {
              setLatitude(e.target.value);
            }}
            value={details.latitude}
          />
          <Input
            mb={4}
            placeholder="Longitude"
            type="text"
            onChange={(e) => {
              setLongitude(e.target.value);
            }}
            value={details.longitude}
          />
        </SimpleGrid>

        <SimpleGrid columns={[1, 2]} height={"100%"} gap={5}>
          <Box>
            <FormLabel>Bedrooms</FormLabel>
            <Input
              mb={4}
              placeholder="Bedrooms"
              type="number"
              onChange={(e) => {
                setBedroom(e.target.value);
              }}
              value={details.bedrooms}
            />
          </Box>

          <Box>
            <FormLabel>Bathrooms</FormLabel>
            <Input
              mb={4}
              placeholder="Bathrooms"
              type="number"
              onChange={(e) => {
                setBathroom(e.target.value);
              }}
              value={details.bathrooms}
            />
          </Box>
        </SimpleGrid>

        <FormLabel>Area</FormLabel>
        <Input
          mb={4}
          placeholder="Area"
          type="number"
          onChange={(e) => {
            setArea(e.target.value);
          }}
          value={details.area}
        />

        <label
          htmlFor="property_image"
          className={`border rounded-md flex items-center justify-center gap-4 cursor-pointer ${
            file ? "border-green-500" : "border-white"
          }`}
        >
          <span className="text-xl px-4 py-2 text-center">
            {file ? "Change" : "Upload"} Image
          </span>
        </label>
        <Input
          placeholder="Property Image"
          name="property_image"
          multiple
          onChange={handleImageChange}
          type="file"
          id="property_image"
          hidden
        />
        {file && (
          <div className="mt-2 p-2 text-lg text-center max-w-max self-center">
            {file && (
              <div className="flex gap-4 items-center text-xl">
                <img src="/images/tick.svg" alt="" srcSet="" className="pt-1" />
                Image Uploaded
              </div>
            )}
          </div>
        )}

        <Button
          isLoading={isSubmitted}
          bg={"brand.pink"}
          w={"100%"}
          my={5}
          onClick={() => MintProperty()}
        >
          Mint Property
        </Button>
      </FormControl>
    </VStack>
  );
};

export default PropertyMinting;
