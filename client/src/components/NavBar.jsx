import React from "react";
import { FaSearch } from "react-icons/fa";

const NavBar = () => {
  return (
    <div className="h-[80px] text-white box-border p-2 px-8 flex justify-between items-center">
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
          className=" p-2 rounded-xl w-[300px] bg-[transparent] border-2 border-solid border-white"
          placeholder="Search"
        />
      </div>
      <div className="right">
        <ul className="flex justify-start items-center gap-3">
          <li className="rounded-xl font-bold border-2 border-solid border-white p-2">
            Login
          </li>
          <li>Connect</li>
        </ul>
      </div>
    </div>
  );
};

export default NavBar;
