import React from "react";
import LocationCards from "./LocationCards";
import { Link } from "react-router-dom";

const AllLocations = ({ data, layout }) => {
  return (
    <div
      className={`${
        layout === "grid" ? "flex gap-4 flex-wrap justify-center" : ""
      } p-4`}
    >
      {data.map((location, index) => {
        return (
          <span
            onClick={() => {
              window.location.href = `/property/${location._id}`;
            }}
          >
            <LocationCards
              layout={layout}
              key={index}
              id={location._id}
              title={location.title}
              price={location.price}
              state={location.state}
              image={location.image}
            />
          </span>
        );
      })}
    </div>
  );
};

export default AllLocations;
