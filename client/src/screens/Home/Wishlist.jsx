import React from 'react'

// importing icons
import { MdDelete } from "react-icons/md";

// importing other components
import LocationCards from './LocationCards'

const Wishlist = ({data,layout}) => {
  return (
    <div className={`${
        layout === "grid" ? "flex gap-4 flex-wrap justify-start" : ""
      } p-4`}>
      {/* {JSON.stringify(data.data.properties)} */}
      {data.data.properties.map((property,index)=>{
        return <span
        onClick={() => {
          window.location.href = `/property/${property._id}`;
        }}
      >
        <MdDelete />
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
      })}
    </div>
  )
}

export default Wishlist
