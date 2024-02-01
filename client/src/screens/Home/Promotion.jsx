import React from "react";

const Promotion = () => {
  return (
    <div className=" from-purple-500 to-pink-500 h-[375px] relative box-border flex items-end justify-between bg-[url('../public/images/city.jpg')] bg-cover bg-no-repeat">
      <div className="left p-4 text-3xl text-white font-bold">
        Properties Sahi <br /> Milegi Yahi
      </div>
      <div className="right">
        <ul className="text-center text-md text-white flex justify-center items-center gap-5 p-4">
          <li>
            <span className="font-bold text-xl">1000</span>
            <br />
            Total Volume
          </li>
          <li>
            <span className="font-bold text-xl">1000</span>
            <br />
            Floor Price
          </li>
          <li>
            <span className="font-bold text-xl">1000</span>
            <br />
            Listed
          </li>
          <li>
            <span className="font-bold text-xl">1000</span>
            <br />
            Unique User
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Promotion;
