import React from "react";

const Promotion = () => {
  return (
    <div className="h-[375px] relative box-border flex items-end justify-between bg-[url('../public/images/city.jpg')] bg-cover bg-no-repeat overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
      <div className="left p-4 text-3xl text-white font-bold relative z-10">
        Properties Sahi <br /> Milegi Yahi
      </div>
      <div className="right relative z-10">
        <ul className="text-center text-md text-white flex justify-center items-center gap-5 p-4">
          <li>
            <span className="font-bold text-xl">1000</span>
            <br />
            Total Volume
          </li>
          <li>
            <span className="font-bold text-xl">0.235</span>
            <br />
            Floor Price
          </li>
          <li>
            <span className="font-bold text-xl">500+</span>
            <br />
            Listed
          </li>
          <li>
            <span className="font-bold text-xl">5000+</span>
            <br />
            Unique User
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Promotion;
