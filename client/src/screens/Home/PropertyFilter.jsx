import React, { useState } from "react";
import { IoFilter } from "react-icons/io5";
import { FaSearch } from "react-icons/fa";
import { FaList } from "react-icons/fa";
import { CiGrid41 } from "react-icons/ci";
import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
  Button,
  useStatStyles,
  background,
} from "@chakra-ui/react";

const PropertyFilter = () => {
  const filterOptions = [
    "Price Low to High",
    "Price High to Low",
    "Recently Listed",
    "Best Offer",
    "Highest Last Sale",
    "Recenlty Sold",
  ];
  const [filter, setFilter] = useState("Price High to Low");
  const [view, setView] = useState("grid");

  return (
    <div className="p-4 text-white text-xl flex justify-between items-center">
      <div className="flex justify-center items-center gap-3">
        <div className="filter-btn p-2 bg-gray-400 w-fit rounded-md">
          <IoFilter className="" />
        </div>
        <div className="middle relative w-fit">
          <FaSearch className="absolute top-3 right-3" />
          <input
            type="search"
            className=" p-2 rounded-xl w-[500px] bg-[transparent] border-2 border-solid border-white max-sm:w-[40px]"
            placeholder="Search"
          />
        </div>
        <div className="price-filter">
          <Menu>
            <MenuButton
              as={Button}
              rightIcon={<ChevronDownIcon />}
              background={"transparent"}
              color={"white"}
              border={"2px solid white"}
              borderRadius={8}
              p={5}
              minWidth={"215px"}
              _hover={{ background: "transparent" }}
            >
              {filter}
            </MenuButton>
            <MenuList>
              {filterOptions.map((filter, index) => {
                return (
                  <MenuItem
                    key={index}
                    color={"black"}
                    onClick={() => setFilter(filter)}
                  >
                    {filter}
                  </MenuItem>
                );
              })}
            </MenuList>
          </Menu>
        </div>
      </div>

      <div className="layout flex gap-3 justify-center items-center">
        <div
          className={`p-2 cursor-pointer ${
            view === "list" ? "bg-gray-400 text-white" : "text-gray-400"
          } rounded-md`}
          onClick={() => setView("list")}
        >
          <FaList className={``} />
        </div>
        <div
          className={`p-2 cursor-pointer ${
            view === "grid" ? "bg-gray-400 text-white" : "text-gray-400"
          } rounded-md`}
          onClick={() => setView("grid")}
        >
          <CiGrid41 className={``} />
        </div>
      </div>
    </div>
  );
};

export default PropertyFilter;
