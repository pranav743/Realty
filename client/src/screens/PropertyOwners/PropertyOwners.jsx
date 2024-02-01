import React from "react";
import { useParams } from "react-router-dom";

const PropertyOwners = () => {
  const { id } = useParams();
  console.log(id);
  return <div>PropertyOwners </div>;
};

export default PropertyOwners;
