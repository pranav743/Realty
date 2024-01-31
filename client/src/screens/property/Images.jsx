// import { useStatStyles } from "@chakra-ui/react";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const Images = ({ images }) => {
  // Create an array with a single element
  const imageArray = [images];
  const [imageNumber, setImageNumber] = useState();

  return (
    <div>
      <h1 className="text-3xl font-bold text-white mt-4 p-4">
        Property Images{" "}
        <Link to="">
          <button className="text-sm ml-4 border-2 border-solid border-white p-2 rounded-xl">
            View 3D Model
          </button>
        </Link>
      </h1>
      <div className="images px-4 h-[220px]">
        {/* Use map function with the array */}
        {imageArray.map((image, index) => (
          <div
            className={`${
              imageNumber === index
                ? "fixed h-screen w-screen top-0 left-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)]"
                : ""
            }`}
            onClick={() => setImageNumber(null)}
          >
            <img
              key={index}
              src={image}
              alt="Image not loaded"
              className={`text-white h-[200px] rounded-md cursor-pointer ${
                imageNumber === index && "scale-[2]"
              }`}
              onClick={(e) => {
                setImageNumber(index);
                e.stopPropagation();
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Images;