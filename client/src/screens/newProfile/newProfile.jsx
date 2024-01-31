import React from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { bloodgroup, places } from "./data";
import { url } from "../../Global/URL";
import {
  Center,
  SimpleGrid,
  Box,
  VStack,
  Divider,
  Button,
  Select,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@chakra-ui/react";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Text,
} from "@chakra-ui/react";

const NewProfile = () => {
  const { colors } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const encodedUserInfo = queryParams.get("userInfo");
  const userInfo = JSON.parse(decodeURIComponent(encodedUserInfo));
  const name = userInfo.name;
  const email = userInfo.email;
  const profilePicture = userInfo.profilePicture;
  const sub_id = userInfo.sub_id;
  // const [name, setName] = useState("");
  // const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [address, setAddress] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [idCardNumber, setIdCardNumber] = useState("");
  const [birthDate, setBirthDate] = useState("");

  const [file, setFile] = useState();

  const details = {
    name: name,
    email: email,
    contact_no: number,
    address: address,
    state: state,
    city: city,
    bloodType: bloodGroup,
    idCardNumber: idCardNumber,
    dob: birthDate,
    profilePicture,
    sub_id,
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFile(file);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      console.log(file);
      setIdCardNumber(reader.result);
    };
  };

  const createUser = async () => {
    try {
      let Userdetails = {
        name: name,
        email: email,
        contact_no: number,
        address: address,
        state: state,
        city: city,
        bloodType: bloodGroup,
        idCardNumber: idCardNumber,
      };
      console.log(Userdetails);
      const res = await axios.post(url + "/register-user", Userdetails);
      console.log(res.data);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SimpleGrid columns={[1, 2]} height={"100%"}>
      <Box height="100%">
        <Center h={"100%"}></Center>
      </Box>
      <Box height="100%">
        <Center h={"100%"}>
          <Box
            bg={"dark.500"}
            h={"aotu"}
            w={"70%"}
            maxW={"450px"}
            minW={"350px"}
            p={5}
            style={{ borderRadius: "15px" }}
          >
            <VStack>
              <Text
                bgGradient="linear(to-l, #22c0ff, #7033ff)"
                bgClip="text"
                fontSize="2xl"
                fontWeight="bold"
              >
                Welcome, {name}
              </Text>
              <FormControl isRequired color="white">
                <FormLabel>Mobile Number</FormLabel>
                <Input
                  mb={5}
                  placeholder="Enter contact number"
                  value={details.contact_no}
                  onChange={(e) => setNumber(e.target.value)}
                  type="tel"
                />
                <FormLabel>Email address</FormLabel>
                <Input
                  type="email"
                  placeholder="Enter your Email ID"
                  value={details.email}
                  mb={5}
                />
                <SimpleGrid columns={[1, 2]} height={"100%"} gap={3}>
                  {/* <FormLabel>State</FormLabel> */}
                  <Select
                    placeholder="Select State"
                    mb={5}
                    onChange={(e) => setState(e.target.value)}
                  >
                    <option value="" className="text-black">
                      State
                    </option>
                    {places.map((place, index) => (
                      <option
                        key={index}
                        value={place.state}
                        className="text-black"
                      >
                        {place.state}
                      </option>
                    ))}
                  </Select>
                  {/* <FormLabel>City</FormLabel> */}
                  <Select
                    mb={5}
                    placeholder="Select country"
                    onChange={(e) => setCity(e.target.value)}
                  >
                    <option value="" className="text-black">
                      City
                    </option>
                    {state !== "" &&
                      places
                        .find((entry) => entry.state === state)
                        .cities.map((city, index) => {
                          return (
                            <option
                              key={index}
                              value={city}
                              className="text-black"
                            >
                              {city}
                            </option>
                          );
                        })}
                  </Select>
                </SimpleGrid>
                <FormLabel>Enter Birthdate</FormLabel>
                <Input
                  mb={5}
                  placeholder="Select Date and Time"
                  size="md"
                  type="date"
                  value={details.dob}
                  onChange={(e) => setBirthDate(e.target.value)}
                />
                <FormLabel>Address</FormLabel>
                <Input
                  placeholder="Address"
                  value={details.address}
                  onChange={(e) => setAddress(e.target.value)}
                  type="text"
                  mb={5}
                />
                <label
                  htmlFor="aadhar-card"
                  className={`border rounded-md flex items-center justify-center gap-4 cursor-pointer ${
                    file ? "border-green-500" : "border-white"
                  }`}
                >
                  <span className="text-xl px-4 py-2 text-center">
                    {file ? "Change" : "Upload"} Image
                  </span>
                </label>
                <Input
                  placeholder="Aadhar card"
                  name="aadhar_image"
                  onChange={handleImageChange}
                  type="file"
                  id="aadhar-card"
                  hidden
                />
                {file && (
                  <div className="mt-2 p-2 text-lg text-center max-w-max self-center">
                    {file && (
                      <div className="flex gap-2 items-center text-xl">
                        <img
                          src="/images/tick.svg"
                          alt=""
                          srcset=""
                          className="pt-1"
                        />
                        Image Uploaded
                      </div>
                    )}
                  </div>
                )}
              </FormControl>
              <Button onClick={createUser} bg={"brand.pink"} w={"100%"} mt={5}>
                Continue
              </Button>
            </VStack>
          </Box>
        </Center>
      </Box>
    </SimpleGrid>
  );
};

export default NewProfile;
