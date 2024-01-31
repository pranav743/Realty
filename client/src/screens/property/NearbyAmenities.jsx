import React, { useEffect, useState } from "react";
import axios from "axios";
import { json } from "react-router";
import { useToast, useTheme } from "@chakra-ui/react";

const NearbyAmenities = ({ latitude, longitude }) => {
  const [amenities, setAmenities] = useState();
  const { colors } = useTheme();

  const hexToRgb = (hex) => {
    const bigint = parseInt(hex.slice(1), 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return `${r}, ${g}, ${b}`;
  };

  // amenities && console.log(amenities);

  const getAmenities = async (latitude, longitude) => {
    const apiUrl = "https://places.googleapis.com/v1/places:searchNearby";
    const apiKey = "AIzaSyCBsEwnTS9s-IvZmvirO4t9OIT9VEs4UAU";

    const requestData = {
      includedTypes: [
        "airport",
        "bus_stop",
        "restaurant",
        "gym",
        "hospital",
        "school",
      ],
      rankPreference: "DISTANCE",
      locationRestriction: {
        circle: {
          center: {
            latitude: latitude,
            longitude: longitude,
          },
          radius: 500.0,
        },
      },
    };

    const headers = {
      "Content-Type": "application/json",
      "X-Goog-Api-Key": "AIzaSyCBsEwnTS9s-IvZmvirO4t9OIT9VEs4UAU",
      "X-Goog-FieldMask":
        "places.displayName,places.primaryType,places.location",
    };

    try {
      const response = await axios.post(apiUrl, requestData, { headers });
      const places = response.data;
      setAmenities(places);
      // console.log(places);
      // console.log(response);
    } catch (error) {
      console.error("Error fetching amenities:", error);
    }
  };

  useEffect(() => {
    getAmenities(latitude, longitude);
  }, [latitude, longitude]); // Make sure to include latitude and longitude as dependencies

  // useEffect(() => {
  //   console.log(amenities);
  // }, [amenities]); // Log amenities whenever it changes

  function calculateDistance(coord1, coord2) {
    const [lat1, lon1] = coord1;
    const [lat2, lon2] = coord2;

    const earthRadius = 6371; // Earth radius in kilometers

    const degToRad = (deg) => deg * (Math.PI / 180);

    const dLat = degToRad(lat2 - lat1);
    const dLon = degToRad(lon2 - lon1);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(degToRad(lat1)) *
        Math.cos(degToRad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = earthRadius * c; // Distance in kilometers

    return distance.toFixed(3);
  }

  return (
    <div className="p-4 pl-8 pb-8 flex justify-start items-center gap-4 overflow-x-auto">
      {amenities &&
        amenities.places.map((place, index) => {
          return (
            <div
              key={index}
              className="h-[100px] min-w-fit rounded-xl p-4 text-center bg-black flex flex-col justify-between"
              style={{
                borderRadius: "15px",
                boxShadow: `0 0px 5px rgba(${hexToRgb(
                  colors.brand.cyan
                )}, 0.3)`,
              }}
            >
              <h2 className="text-white text-xl font-bold">
                {place.displayName.text}
              </h2>
              <p className="text-gray-400">
                {calculateDistance(
                  [latitude, longitude],
                  [place.location.latitude, place.location.longitude]
                )}
                km
              </p>
            </div>
          );
        })}
    </div>
  );
};

export default NearbyAmenities;
