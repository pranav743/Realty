import { VStack, Text, SimpleGrid, Box } from "@chakra-ui/layout";
import { FormControl } from "@chakra-ui/form-control";
import { FormLabel, Input, Textarea, Select, Button } from "@chakra-ui/react";
import React, { useState } from "react";

import axios from "axios";

import { places } from "../newProfile/data";

import { url } from "../../Global/URL";

const PropertyListing = () => {
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
  const [image, setImage] = useState("");

  const details = {
    title: title,
    description: description,
    price: price,
    city: city,
    state: state,
    location: {
      coordinates: [Number(longitude), Number(latitude)],
    },
    bedrooms: bedroom,
    bathrooms: bathroom,
    area: area,
    image: image,
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImage(reader.result);
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(details);
    try {
      const res = await axios.post(url + "/list", details);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <VStack mx={200}>
      <Text
        bgGradient="linear(to-l, #22c0ff, #7033ff)"
        bgClip="text"
        fontSize="4xl"
        fontWeight="500"
        mt={2}
      >
        List Property
      </Text>

      <FormControl isRequired color="white">
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
          className="border rounded-md flex items-center justify-center gap-4 cursor-pointer"
        >
          <span className="text-xl px-4 py-2 text-center">Upload Image</span>
        </label>
        <Input
          placeholder="Property Image"
          name="property_image"
          onChange={handleImageChange}
          type="file"
          id="property_image"
          hidden
        />

        <Button bg={"brand.pink"} w={"100%"} my={5} onClick={handleSubmit}>
          List Property
        </Button>
      </FormControl>
    </VStack>
  );
};

export default PropertyListing;
