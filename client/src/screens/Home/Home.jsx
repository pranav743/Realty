import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { getUserDetails } from "../../Global/authUtils";

const Home = () => {
  const [user, setUser] = useState(false);
  const navigate = useNavigate();

  const getData = async () => {
    try {
      const data = await getUserDetails();
      console.log(data);
      setUser(data);
    } catch (error) {
      navigate('/login');
    }
    if (!localStorage.getItem("RSaccessToken")){
      navigate('/login');
    }
  }
  useEffect(() => {
    // getData();
  }, []);
  return (
    <div>HOME</div>
  );
};

export default Home;
