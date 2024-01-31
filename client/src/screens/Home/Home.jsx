import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { getUserDetails } from "../../Global/authUtils";

// importing components
import Promotion from "./Promotion";
import HomeSubMenu from "./HomeSubMenu";
import PropertyFilter from "./PropertyFilter";

const Home = () => {
  const [user, setUser] = useState(false);
  const navigate = useNavigate();

  const getData = async () => {
    try {
      const data = await getUserDetails();
      console.log(data);
      setUser(data);
    } catch (error) {
      navigate("/login");
    }
    if (!localStorage.getItem("RSaccessToken")) {
      navigate("/login");
    }
  };
  useEffect(() => {
    // getData();
  }, []);
  return (
    <div>
      <Promotion />
      <HomeSubMenu />
      <PropertyFilter />
    </div>
  );
};

export default Home;
