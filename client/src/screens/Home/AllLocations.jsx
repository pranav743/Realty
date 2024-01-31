import React from "react";
import LocationCards from "./LocationCards";
import { Link } from "react-router-dom";

const AllLocations = ({ data }) => {
  return (
    <div className="flex gap-4 flex-wrap p-4">
      {data.map((location, index) => {
        return (
          <Link to={`/property/${location._id}`}>
            <LocationCards
              key={index}
              id={location._id}
              title={location.title}
              price={location.price}
              state={location.state}
            />
          </Link>
        );
      })}
    </div>
  );
};

export default AllLocations;
