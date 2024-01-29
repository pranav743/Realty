import React, { useState, Suspense, useRef } from "react";
import GoogleButton from "react-google-button";
import { Center, SimpleGrid, Box, VStack, Divider } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { url } from "../../Global/URL";
import showToast from "../../Global/Toast";
import { useToast, useTheme } from "@chakra-ui/react";
import { Canvas, useFrame } from 'react-three-fiber';
import Model from "./Model";
import { OrbitControls } from '@react-three/drei';


const Login = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const [isChecked, setIsChecked] = useState(false);
  const { colors } = useTheme();

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const googleAuth = () => {
    if (isChecked) {
      window.location.href = url + "/login";
    } else {
      showToast(toast, "", "info", "Please Accept Terms and Conditions !");
      console.log("Please accept the terms and conditions.");
    }
  };

  const hexToRgb = (hex) => {
    const bigint = parseInt(hex.slice(1), 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return `${r}, ${g}, ${b}`;
  };


  return (
    <SimpleGrid columns={[1, 2]} height={'100%'}>
      <Box height='100%'>
        <Center h={'100%'} >
        <Canvas>
            <Suspense fallback={null}>
              <OrbitControls enableZoom={false} />
              <ambientLight intensity={1} />
              <pointLight intensity={3} position={[3, 2, 2]} color="#f46e68" />
              <pointLight intensity={3} position={[-3, 2, -1]} color="#f65164" />
              <Model/>
            </Suspense>
          </Canvas>
        </Center>
      </Box>
      <Box height='100%'>
        <Center h={'100%'} >
          <Box bg={'dark.500'} h={'500px'} w={'350px'} p={5} style={{ borderRadius: '15px', boxShadow: `inset 0 4px 25px rgba(${hexToRgb(colors.brand.cyan)}, 0.3)` }}>
            <VStack>
              <h3 style={{ color: colors.brand.blue, fontSize: '22px', paddingTop: '20px' }}>
                Sign in to Continue
              </h3>
              <Box height={'230px'} w={'100%'}>
                <Center color={'brand.green'} h={'100%'}>
                  Logo Here
                </Center>
              </Box>
              <GoogleButton onClick={googleAuth} style={{ borderRadius: '18px', backgroundColor: 'white', color: 'black', paddingRight: '10px', paddingLeft: '10px' }} className="mt-6 mx-auto" />

              <div className="flex items-center justify-center mt-4">
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={handleCheckboxChange}
                  className="mr-2 cursor-pointer"
                />
                <p className="text-sm text-gray-500">
                  I agree to the{' '}
                  <span className="text-blue-500 cursor-pointer">Terms and Conditions</span>
                </p>
              </div>
            </VStack>
          </Box>
        </Center>
      </Box>
    </SimpleGrid>
  );
};

export default Login;


{/* <GoogleButton onClick={googleAuth} style={{ borderRadius: '20px', backgroundColor: 'white', color: 'black', paddingRight: '10px', paddingLeft: '10px' }} className="mt-6 mx-auto" />
        <div className="flex items-center justify-center mt-4">
          <input
            type="checkbox"
            checked={isChecked}
            onChange={handleCheckboxChange}
            className="mr-2 cursor-pointer"
          />
          <p className="text-sm text-gray-500">
            I agree to the{' '}
            <span className="text-blue-500 cursor-pointer">Terms and Conditions</span>
          </p>
        </div> */}