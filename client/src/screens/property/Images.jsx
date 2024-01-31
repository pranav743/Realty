// import { useStatStyles } from "@chakra-ui/react";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const Images = ({ images }) => {
  // Create an array with a single element
  const imageArray = [images];
  const [imageNumber, setImageNumber] = useState();

  return (
    <div>
      <div className="images px-8 h-[220px]">
        {/* Use map function with the array */}
        {imageArray.map((image, index) => (
          <div
            className={`${
              imageNumber === index
                ? "fixed h-screen w-screen top-0 left-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] z-10"
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
