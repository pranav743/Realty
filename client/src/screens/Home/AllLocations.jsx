import React from "react";
import LocationCards from "./LocationCards";

const AllLocations = () => {
  return (
    <div className="flex gap-4 flex-wrap p-4">
      <LocationCards />
      <LocationCards />
      <LocationCards />
      <LocationCards />
    </div>
  );
};

export default AllLocations;
