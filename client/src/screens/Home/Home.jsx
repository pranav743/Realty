import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";

// importing components
import Promotion from "./Promotion";
import HomeSubMenu from "./HomeSubMenu";
import PropertyFilter from "./PropertyFilter";
import AllLocations from "./AllLocations";
import Wishlist from "./Wishlist";
import { ethers } from "ethers";
import abi from "../Realty.json";

// Requesting
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { url } from "../../Global/URL";
import { getUserDetails } from "../../Global/authUtils";
import Loader from "../../components/Loader";

const Home = () => {
  const [wishListData, setWishListData] = useState();
  const [tokenURIs,settokenURIs]=useState();

  //BLOCKCHAIN CALL STARTS

  //blockchain call starts

  const [st, setst] = useState({
    provider: null,
    signer: null,
    contract: null,
  });

  useEffect(() => {
    const connectWallet = async () => {
      const contractAddress = "0xbB63f7054DA6eAeD619f5EaFb0A6d3d22837c9A2";
      const contractAbi = abi.abi;
      console.log(contractAbi);
      try {
        const { ethereum } = window;
        if (ethereum) {
          const account = await ethereum.request({method: "eth_requestAccounts",});
        } else {
          console.log("no metamask");
        }

        const provider = new ethers.providers.Web3Provider(ethereum);

        console.log(provider);

        const signer = provider.getSigner();

        console.log("signer",signer);

        const contract = new ethers.Contract(contractAddress,contractAbi,signer);
        
        console.log("contract",contract);

        setst({ provider, signer, contract });
      } catch (error) {
        console.log(error);
      }
    };

    const Loaderdata = async()=>{
        const { contract } = st;
        console.log("contract",st);    
        try {
          const response = await contract.allProperties();
          settokenURIs(response);
          alert(tokenURIs);
        } catch (error) {
          console.error("Error fetching batch details:", error);
        }
    }
    connectWallet();
    Loaderdata();
  }, []);

  
  // const MintProperty = async () => {

  // };

  //blockchain call ends

  //BLOCKCHAIN CALL ENDS

  const [user, setUser] = useState(false);
  const [layout, setLayout] = useState("grid");
  const [page, setPage] = useState("cites");
  const navigate = useNavigate();

  // Search functionality
  const [searchQuery, setSearchQuery] = useState("");

  const { isError, isLoading, data } = useQuery({
    queryKey: ["/properties/all"],
    retryDelay: 10000,
    queryFn: async () => {
      const temp = await axios
        .get(url + `/properties/all`)
        .then((response) => response.data.data);
      // console.log(temp);
      return temp;
    },
  });

  const getData = async () => {
    try {
      const data = await getUserDetails();
      console.log(data);
      setUser(data);
      const w = await axios.post(url + "/get-properties-by-ids", {
        propertyIds: data.wishList,
      });
      // console.log(w);
      setWishListData(w);
    } catch (error) {
      console.log(error);
      // navigate("/login");
    }
    if (!localStorage.getItem("RSaccessToken")) {
      navigate("/login");
    }
  };
  useEffect(() => {
    getData();
  }, []);

  if (isLoading) {
    return <Loader />;
  }
  if (isError) {
    return <h1>Something Wen't Wrong :(</h1>;
  }

  const filteredAllData = data.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const filteredWishlistData =
    wishListData &&
    wishListData.data.properties.filter((item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

  return (
    <div>
      <Promotion />
      <HomeSubMenu setPage={setPage} />
      <PropertyFilter
        setLayout={setLayout}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      {page === "cites" &&
        (isLoading ? (
          <Loader />
        ) : (
          <AllLocations data={filteredAllData} layout={layout} />
        ))}
      {page === "wishlist" &&
        (isLoading ? (
          <Loader />
        ) : (
          <Wishlist data={filteredWishlistData} layout={layout} />
        ))}
    </div>
  );
};

export default Home;
