import React from "react";

const LocationCards = () => {
  return (
    <div className="h-[300px] w-[220px] rounded-xl flex flex-col justify-start p-2 gap-2 bg-gray-800">
      <div className="image h-[70%] w-full rounded-xl bg-black"></div>
      <div className="details text-white">
        <h1>Property Name</h1>
        <h1>Property Price</h1>
        <p className="text-gray-400">Last sale: 0.18WETH</p>
      </div>
    </div>
  );
};

export default LocationCards;
