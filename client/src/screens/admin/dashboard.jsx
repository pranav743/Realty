import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, SimpleGrid, useSafeLayoutEffect } from "@chakra-ui/react";
import { getUserDetails } from "../../Global/authUtils";
import { Navigate, useNavigate } from "react-router-dom";
import { url } from "../../Global/URL";
import ExportToExcelButton from "./Export";

import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";

const Dashboard = () => {
  const [user, setUser] = useState("");
  const [properties, setProperties] = useState([]);
  const [excelData, setExcelData] = useState(false);
  const navigate = useNavigate();

  const getProperties = async (city) => {
    try {
      const resp = await axios.get(url + "/properties/all" + `?city=${city}`);
      setProperties(resp.data.data);
      const data = resp.data.data;
      console.log(data);
      var arr = [];
      for (let i = 0; i < data.length; i++) {
        var obj = {
          name: data[i].title,
          city: data[i].city,
          state: data[i].state,
          area: data[i].area,
          price_ETH: data[i].price,
          price_RS: Number(data[i].price) * 194000,
        };
        arr.push(obj);
      }
      console.log(arr);
      setExcelData(arr);
    } catch (error) {
      console.log(error);
    }
  };

  const getData = async () => {
    try {
      const data = await getUserDetails();
      setUser(data);
      getProperties(data.city);
    } catch (error) {
      navigate("/login");
    }
    if (!localStorage.getItem("RSaccessToken")) {
      navigate("/login");
    }
  };

  useEffect(() => {
    // getProperties(user.city);
  }, [user]);

  useEffect(() => {
    getData();
  }, []);

  const handleClick = (propertyId) => {
    navigate(`/property/owners/${propertyId}`);
  };

  return (
    <>
      <ExportToExcelButton excelData={excelData} department={"Real-Estate"} />
      <TableContainer className="mx-10 text-white text-md">
        <Table variant="simple">
          <Thead>
            <Tr className="text-xl">
              <Th>Title</Th>
              <Th>City</Th>
              <Th>State</Th>
              <Th>Location</Th>
              <Th>Area</Th>
              <Th>Price</Th>
              <Th>Owner</Th>
            </Tr>
          </Thead>
          <Tbody>
            {properties &&
              properties.map((prop, index) => {
                return (
                  <Tr
                    className="cursor-pointer"
                    onClick={() => {
                      handleClick(prop.propertyID);
                    }}
                  >
                    <Td>{prop.title}</Td>
                    <Td>{prop.city}</Td>
                    <Td>{prop.state}</Td>
                    <Td className="flex flex-col gap-2">
                      <div>Latitude : {prop.location.coordinates[1]}</div>
                      <div>Longitude: {prop.location.coordinates[0]}</div>
                    </Td>
                    <Td>{prop.area} Sq. ft</Td>
                    <Td>{prop.price}</Td>
                    <Td>Dhruv</Td>
                  </Tr>
                );
              })}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
};

export default Dashboard;
