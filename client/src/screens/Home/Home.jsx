import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";

// importing components
import Promotion from "./Promotion";
import HomeSubMenu from "./HomeSubMenu";
import PropertyFilter from "./PropertyFilter";
import AllLocations from "./AllLocations";

// Requesting
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { url } from "../../Global/URL";
import { getUserDetails } from "../../Global/authUtils";
import Loader from "../../components/Loader";

const Home = () => {
  const [user, setUser] = useState(false);
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const { isError, isLoading, data } = useQuery({
    queryKey: ["/properties/all"],
    retryDelay: 10000,
    queryFn: async () => {
      const temp = await axios
        .get(url + `/properties/all`)
        .then((response) => response.data.data);
      console.log(temp);
      return temp;
    },
  });

  const getData = () => {
    if (localStorage.getItem("RSaccessToken")) {
      setIsLoggedIn(true);
      return true;
    }
  };
  useEffect(() => {
    getData();
  }, []);

  if (isLoading) {
    return <Loader />;
  }
  if (isError) {
    return <h1>Something Went Wrong :(</h1>;
  }
  return (
    <div>
      <Promotion />
      <HomeSubMenu />
      <PropertyFilter />
      <AllLocations data={data} />
    </div>
  );
};

export default Home;
