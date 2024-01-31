import { useState } from "react";
import React from "react";

const HomeSubMenu = ({ setPage }) => {
  const [tab, setTab] = useState("cites");
  return (
    <div className="bg-black flex items-center jutify-start p-4">
      <ul className="text-gray-400 flex justify-start text-xl font-bold gap-5">
        <li
          onClick={() => {
            setTab("cites");
            setPage("cites");
          }}
          className={`p-2 rounded-xl cursor-pointer ${
            tab === "cites" && "bg-gray-400 text-white"
          }`}
        >
          Items
        </li>
        <li
          onClick={() => {
            setTab("post");
            setPage("post");
          }}
          className={`p-2 rounded-xl cursor-pointer ${
            tab === "post" && "bg-gray-400 text-white"
          }`}
        >
          Post Property
        </li>
        <li
          onClick={() => {
            setTab("activity");
            setPage("activity");
          }}
          className={`p-2 rounded-xl cursor-pointer ${
            tab === "activity" && "bg-gray-400 text-white"
          }`}
        >
          Activity
        </li>
      </ul>
    </div>
  );
};

export default HomeSubMenu;
