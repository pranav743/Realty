import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { Menu, Button, MenuButton, MenuList, Center, Avatar, MenuItem, MenuDivider } from "@chakra-ui/react";
import { getUserDetails, logout } from "../Global/authUtils";
import { useTheme } from "@chakra-ui/react";

const NavBar = () => {
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState();
  const {colors} = useTheme();

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
      className={`${location.pathname === "/login" || location.pathname === "/new-profile"
        ? "hidden"
        : ""
        } h-[80px] text-white box-border p-2 px-8 flex justify-between items-center`}
    >
      <div className="left flex justify-start items-center">
        <ul className="flex justify-start items-center gap-5">
          <li className="text-2xl font-bold border-solid border-r-2 border-white pr-4">
            Real-T
          </li>
          <li>Buy</li>
          <li>Rent</li>
        </ul>
      </div>
      <div className="middle relative">
        <FaSearch className="absolute top-3 right-3" />
        <input
          type="search"
          className=" p-2 rounded-xl w-[300px] bg-[transparent] border-2 border-solid border-white max-sm:w-[40px]"
          placeholder="Search"
        />
      </div>
      <div className="right">
        <ul className="flex justify-start items-center gap-3">
          { !isLoggedIn ?
          <Link to="/login">
            <li className="rounded-xl font-bold border-2 border-solid border-white p-2">
              Login
            </li>
          </Link> :
          (<Menu>
            <MenuButton
              as={Button}
              rounded={'full'}
              variant={'link'}
              cursor={'pointer'}
              minW={0}>
              <Avatar
                size={'sm'}
                src={user && user.profilePicture}
              />
            </MenuButton>
            <MenuList alignItems={'center'}>
              <br />
              <Center>
                <Avatar
                  size={'2xl'}
                  src={user && user.profilePicture}
                />
              </Center>
              <br />
              <Center>
                <p>{user && user.name}</p>
              </Center>
              <br />
              <MenuDivider />
              <MenuItem>Your Details</MenuItem>
              <MenuItem onClick={()=> logout()}>Logout</MenuItem>
            </MenuList>
          </Menu>)
}
          <li>Connect</li>
        </ul>
      </div>
    </div>
  );
};

export default NavBar;
