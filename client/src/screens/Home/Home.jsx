import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";

// importing components
import Promotion from "./Promotion";
import HomeSubMenu from "./HomeSubMenu";
import PropertyFilter from "./PropertyFilter";
import AllLocations from "./AllLocations";

// Requesting
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { url } from "../../Global/URL";
import { getUserDetails } from "../../Global/authUtils";
import Loader from "../../components/Loader";

const Home = () => {
   
  const [blockdata,setblockdata]=useState();

  //BLOCKCHAIN CALL STARTS

  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null,
  });



  useEffect(() => {
    const connectWallet = async () => {
      const contractAddress = "0xc0be1A1d46A7740d9F31F9EFD19d5E45CDb0c2F6";
      const contractAbi = abi.abi; 
      try {
        const { ethereum } = window;
        if (ethereum) {
          const account = await ethereum.request({ method: "eth_requestAccounts" });
        } else {
          console.log("no metamask");
        }
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(contractAddress, contractAbi, signer);
        setState({ provider, signer, contract });
      } catch (error) {
        console.log(error);
      }
    };
     
    const getblockdata = async()=>{
      try {
        const Bdata = await contract.allListedProperties();
        setblockdata(Bdata)
        alert("DATA IS Coming");
      } catch (error) {
        console.error("Error fetching batch details:", error);
      }
    }
    
    getblockdata();
    connectWallet();
  }, []);



  //BLOCKCHAIN CALL ENDS
  const [user, setUser] = useState(false);
  const navigate = useNavigate();

  const { isError, isLoading, data } = useQuery({
    queryKey: ['/properties/all'],
    retryDelay: 10000,
    queryFn: async () => {
      const temp = await axios
        .get(url + `/properties/all`)
        .then((response) => response.data.data);
      console.log(temp);
      return temp;
    },
  });

  const getData = async () => {
    try {
      const data = await getUserDetails();
      console.log(data);
      setUser(data);
    } catch (error) {
      navigate("/login");
    }
    if (!localStorage.getItem("RSaccessToken")) {
      navigate("/login");
    }
  };
  useEffect(() => {
    getData();
  }, []);

  if (isLoading) {
    return (
      <Loader/>
    )
  }
  if (isError) {
    return (
      <h1>Something Wen't Wrong :(</h1>
    )
  }
  return (
    <div>
      <Promotion />
      <HomeSubMenu />
      <PropertyFilter setLayout={setLayout} />
      <AllLocations data={data} layout={layout} />
    </div>
  );
};

export default Home;
