import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import {
  Menu,
  Button,
  MenuButton,
  MenuList,
  Center,
  Avatar,
  MenuItem,
  MenuDivider,
} from "@chakra-ui/react";
import { getUserDetails, logout } from "../Global/authUtils";
import { useTheme } from "@chakra-ui/react";

const NavBar = () => {
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState();
  const { colors } = useTheme();

  const getData = async () => {
    if (localStorage.getItem("RSaccessToken")) {
      setIsLoggedIn(true);
      const user = await getUserDetails();
      setUser(user);
      console.log(user);
      return true;
    }
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <div
      className={`${
        location.pathname === "/login" || location.pathname === "/new-profile"
          ? "hidden"
          : ""
      } h-[80px] text-white box-border p-2 px-8 bg-black flex justify-between items-center`}
    >
      <div className="left flex justify-start items-center">
        <ul className="flex justify-start items-center gap-10">
          <Link to="/">
            <li className="text-2xl font-bold border-solid border-r-2 border-white pr-4">
              Real-Ty
            </li>
          </Link>
          <li>Buy</li>
          <Link to="/chatbot">
            <li>Chat</li>
          </Link>
          {isLoggedIn && (
            <li
              style={{ cursor: "pointer" }}
              onClick={() => (window.location.href = "/mint-property")}
            >
              List Property
            </li>
          )}
        </ul>
      </div>

      <div className="right">
        <ul className="flex justify-start items-center gap-3">
          {!isLoggedIn ? (
            <Link to="/login">
              <li className="rounded-xl font-bold border-2 border-solid border-white p-2">
                Login
              </li>
            </Link>
          ) : (
            <Menu>
              <MenuButton
                as={Button}
                rounded={"full"}
                variant={"link"}
                cursor={"pointer"}
                minW={0}
              >
                <Avatar size={"sm"} src={user && user.profilePicture} />
              </MenuButton>
              <MenuList alignItems={"center"}>
                <br />
                <Center>
                  <Avatar size={"2xl"} src={user && user.profilePicture} />
                </Center>
                <br />
                <Center>
                  <p className="text-black font-bold text-xl">
                    {user && user.name}
                  </p>
                </Center>
                <br />
                <MenuDivider />
                <Link to="/profile">
                  <MenuItem color={"black"}>Your Details</MenuItem>
                </Link>
                <Link to="/listed-properties">
                  <MenuItem color={"black"}>My Properties</MenuItem>
                </Link>
                <MenuItem onClick={() => logout()} color={"black"}>
                  Logout
                </MenuItem>
              </MenuList>
            </Menu>
          )}
          <li>Connect</li>
        </ul>
      </div>
    </div>
  );
};

export default NavBar;
