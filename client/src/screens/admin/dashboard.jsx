import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, SimpleGrid, useSafeLayoutEffect } from "@chakra-ui/react";
import { getUserDetails } from "../../Global/authUtils";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [user, setUser] = useState("");
  const navigate = useNavigate();

  const getData = async () => {
    try {
      const data = await getUserDetails();
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
  return (
    <div>
      <SimpleGrid columns={[1, 2]} height={"100%"}>
        <Box height="100%"></Box>
        <Box height="100%"></Box>
      </SimpleGrid>
    </div>
  );
};

export default Dashboard;
