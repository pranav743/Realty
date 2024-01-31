import React, { useState, useEffect } from "react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import { getUserDetails } from "../../Global/authUtils";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { url } from "../../Global/URL";

import LocationCards from "../Home/LocationCards";

const ListProperties = () => {
  const [user, setUser] = useState("");
  const [propertiesOwned, setPropertiesOwned] = useState([]);

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

  useEffect(() => {
    getProperties(user._id);
  }, [user]);

  const getProperties = async () => {
    try {
      if (user) {
        const resp = await axios.get(
          url + "/userProperties" + `?userID=${user._id}`
        );
        setPropertiesOwned(resp.data.properties);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Tabs isFitted variant="enclosed" className="text-white m-4">
      <TabList mb="1em">
        <Tab>Minted Properties</Tab>
        <Tab>Listed Properties</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <div className="flex flex-wrap gap-10">
            {propertiesOwned.map((prop, index) => {
              return (
                <span
                  onClick={() => {
                    window.location.href = `/property/${prop._id}`;
                  }}
                >
                  <LocationCards
                    key={index}
                    id={prop._id}
                    title={prop.title}
                    price={prop.price}
                    state={prop.state}
                    image={prop.image}
                    layout="grid"
                  />
                </span>
              );
            })}
          </div>
        </TabPanel>
        <TabPanel>
          <p>Listed Properties!</p>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default ListProperties;
