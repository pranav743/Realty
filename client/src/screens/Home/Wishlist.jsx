import React from "react";

// importing icons
import { MdDelete } from "react-icons/md";
import { Tooltip, HStack, VStack } from "@chakra-ui/react";

// importing other components
import LocationCards from "./LocationCards";

const Wishlist = ({ data, layout }) => {
  return (
    <div
      className={`${
        layout === "grid" ? "flex gap-4 flex-wrap justify-start" : ""
      } p-4`}
    >
      {/* {JSON.stringify(data.data.properties)} */}
      {data.data.properties.map((property, index) => {
        return (
          <span
            onClick={() => {
              window.location.href = `/property/${property._id}`;
            }}
            className="relative"
          >
            <MdDelete
              className="text-red-500 text-2xl absolute top-4 right-4 cursor-pointer"
              onClick={(e) => {
                alert("Tu kya delete karega re");
                e.stopPropagation();
              }}
            />

            <LocationCards
              layout={layout}
              key={index}
              id={property._id}
              title={property.title}
              price={property.price}
              state={property.state}
              image={property.image}
            />
          </span>
        );
      })}
    </div>
  );
};

export default Wishlist;
