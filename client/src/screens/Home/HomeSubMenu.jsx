import { useState } from "react";
import React from "react";

const HomeSubMenu = () => {
  const [tab, setTab] = useState("items");
  return (
    <div className="bg-black flex items-center jutify-start p-4">
      <ul className="text-gray-400 flex justify-start text-xl font-bold gap-5">
        <li
          onClick={() => setTab("items")}
          className={`p-2 rounded-xl cursor-pointer ${
            tab === "items" && "bg-gray-400 text-white"
          }`}
        >
          Items
        </li>
        <li
          onClick={() => setTab("analytics")}
          className={`p-2 rounded-xl cursor-pointer ${
            tab === "analytics" && "bg-gray-400 text-white"
          }`}
        >
          Analytics
        </li>
        <li
          onClick={() => setTab("activity")}
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
