import React from "react";

const LocationCards = ({ title, price, state }) => {
  return (
    <div className="cursor-pointer hover:bg-gray-500 h-[300px] w-[220px] rounded-xl flex flex-col justify-start p-2 gap-2 bg-gray-800">
      <div className="image h-[70%] w-full rounded-xl bg-black"></div>
      <div className="details text-white">
        <h1>{title}</h1>
        <h1 className="text-gray-400">{price}</h1>
        <p className="text-gray-400">{state}</p>
      </div>
    </div>
  );
};

export default LocationCards;
