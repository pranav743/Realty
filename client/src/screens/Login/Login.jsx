import React, { useState } from "react";
import GoogleButton from "react-google-button";
import { Center, Square, Circle, Box, Divider } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { url } from "../../Global/URL";
import showToast from "../../Global/Toast";
import { useToast } from "@chakra-ui/react";

const Login = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const [isChecked, setIsChecked] = useState(false);

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

  return (
    <div className="flex-col items-center justify-center mx-auto">
      <div className="mt-10 p-6 bg-white rounded-md shadow-lg w-80 sm:w-96 mx-auto text-center" style={{marginTop: '18vh'}}>
        <h2 className="text-4xl font-extrabold text-gray-800">Welcome to <span style={{ color: 'red' }}>Rakt</span> Sahay!</h2>
        <Divider mt={10}/>
        <p className="text-lg text-gray-600 mt-2">
          Sign in to your account to continue.
        </p>
        <div style={{height: '50px'}}></div>
        <GoogleButton onClick={googleAuth} style={{ borderRadius: '20px', backgroundColor: 'white', color: 'black', paddingRight: '10px', paddingLeft: '10px' }} className="mt-6 mx-auto" />
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
        
      </div>
    </div>
  );
};

export default Login;
