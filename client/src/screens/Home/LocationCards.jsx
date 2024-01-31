import React from "react";

const LocationCards = ({ title, price, state, image, layout }) => {
  return (
    <div
      className={`cursor-pointer hover:bg-gray-500 ${
        layout === "grid"
          ? "h-[300px] w-[220px] rounded-xl flex flex-col justify-start"
          : "h-[150px] w-full rounded-xl flex mb-4"
      } p-2 gap-2 bg-gray-800`}
    >
      <img
        src={image}
        className={`${
          layout === "grid"
            ? "h-[70%] w-full rounded-xl"
            : "h-full w-30% rounded-xl mr-4"
        }`}
        alt="No image avaliable"
        srcset=""
      />
      <div className="details text-white">
        <h1 className={`${layout === "list" && "text-2xl font-bold"}`}>
          {title}
        </h1>
        <h1 className="text-gray-400">{price}</h1>
        <p className="text-gray-400">{state}</p>
      </div>
    </div>
  );
};

export default LocationCards;
