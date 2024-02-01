import React, { useState, useEffect } from "react";
import { Tabs, TabList, TabPanels, Tab, TabPanel, useToast } from "@chakra-ui/react";
import { getUserDetails } from "../../Global/authUtils";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { url } from "../../Global/URL";
import { ethers } from "ethers";
import abi from "../Realty.json";
import showToast from "../../Global/Toast";
import LocationCards from "../Home/LocationCards";

const propertyIDs = (urls) => {
  const propertyIDArray = [];

  urls.forEach((url) => {
    const lastEqualIndex = url.lastIndexOf('=');
    if (lastEqualIndex !== -1) {
      const propertyID = url.slice(lastEqualIndex + 1);
      propertyIDArray.push(propertyID);
    }
  });

  return propertyIDArray;
};


const ListProperties = () => {

   //BLOCKCHAIN CALL STARTS

  //blockchain call starts

  const [tokenURIs,settokenURIs]=useState();
  const [tokenURIs2,settokenURIs2]=useState();
  const [account,setaccount]=useState();
  const [isSubmitted, setIsSubmitted] = useState();
  const [minted, setMinted] = useState([]);
  const [Listed, setListed] = useState([]);
  const toast = useToast();
  //BLOCKCHAIN CALL STARTS

  //blockchain call starts

  const [st, setst] = useState({
    provider: null,
    signer: null,
    contract: null,
  });

  const connectWallet = async () => {
    const contractAddress = "0x26377ca3adfe77b4c8BCe8E673eAB44cd8295877";
    const contractAbi = abi.abi;
    console.log(contractAbi);
    var accounts = null;
    try {
      const { ethereum } = window;
      if (ethereum) {
        accounts = await ethereum.request({method: "eth_requestAccounts",});
        console.log(accounts);
        setaccount(accounts[0]);
      } else {
        console.log("No metamask");
        alert("NO METAMASK !")
      }

      const provider = new ethers.providers.Web3Provider(ethereum);

      console.log(provider);

      const signer = provider.getSigner();

      console.log("signer",signer);

      const contract = new ethers.Contract(contractAddress,contractAbi,signer);
      
      console.log("contract",contract);

      setst({ provider, signer, contract });
      mintedProperties(accounts[0], contract);
      allPropertiesOwned(accounts[0],contract);
    } catch (error) {
      console.log(error);
    }
  };

  const mintedProperties = async(address, contract)=>{
    
      console.log("contract",st);    
      try {
        const response = await contract.mintedPropertiesByOwner(address);
        console.log("RESPONSE", response);
        settokenURIs(response);
        const array = propertyIDs(response);
        const res = await axios.post(url + "/get-properties-by-productID", {propertyIds: array});
        setMinted(res.data.properties);
        console.log("Minted Properties :", res);
      } catch (error) {
        console.error("Error fetching batch details:", error);
      }
  }

  const allPropertiesOwned = async(address, contract)=>{
    
    console.log("contract",st);    
    try {
      const response = await contract.allPropertiesOwnedBy(address);
      console.log("RESPONSE", response);
      settokenURIs2(response);
      const array = propertyIDs(response);
      const res = await axios.post(url + "/get-properties-by-productID", {propertyIds: array});
      setListed(res.data.properties);
      console.log("AllPropertiesOwned :", res);
    } catch (error) {
      console.error("Error fetching batch details:", error);
    }
}

  useEffect(() => {
    
    connectWallet();
    console.log("USEEFFECT FINISHED");
  }, []);

  const ListProperty = async (propertyID)=>{
    
      setIsSubmitted(true);

      const { contract } = st;
      console.log("contract", st);
    
      try {
        const ListProp = await contract.List_Property(propertyID);
        console.log(ListProp);
        showToast(toast, 'success','success', `Property Listed !`);
      } catch (error) {
        console.error("Error fetching batch details:", error);
      }
      setIsSubmitted(false);
  
  };
  


  //blockchain call ends

  //BLOCKCHAIN CALL ENDS

  const [user, setUser] = useState("");
  const [propertiesOwned, setPropertiesOwned] = useState([]);

  const navigate = useNavigate();

  const getData = async () => {
    try {
      const data = await getUserDetails();
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

  useEffect(() => {
    getProperties(user._id);
  }, [user]);

  const getProperties = async () => {
    try {
      if (user) {
        const resp = await axios.get(
          url + "/userProperties" + `?userID=${user._id}`
        );
        setPropertiesOwned(resp.data.properties);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Tabs isFitted variant="enclosed" className="text-white m-4">
      <TabList mb="1em">
        <Tab>Minted Properties</Tab>
        <Tab>PastProperties Properties</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <div className="flex flex-wrap gap-10">
            {/* {minted && JSON.stringify(minted)} */}
            {minted.map((prop, index) => {
              return (
                <div>
                <span
                  onClick={() => {
                    window.location.href = `/property/${prop._id}`;
                  }}
                >
                  <LocationCards
                    key={index}
                    id={prop._id}
                    title={prop.title}
                    price={prop.price}
                    state={prop.state}
                    image={prop.image}
                    layout="grid"
                  />
                </span>
                <button className="bg-blue-400 p-2 mt-2 rounded-md text-white hover:bg-white hover:text-black w-full font-bold" 
                onClick={()=>{
                  showToast(toast, 'Info', 'info', "Listing Property...")
                  ListProperty(prop.propertyID)}}>List Property</button>
                </div>
              );
            })}
          </div>
        </TabPanel>
        <TabPanel>
        <div className="flex flex-wrap gap-10">
            {/* {minted && JSON.stringify(minted)} */}
            {Listed.map((prop, index) => {
              return (
                <div>
                <span
                  onClick={() => {
                    window.location.href = `/property/${prop._id}`;
                  }}
                >
                  <LocationCards
                    key={index}
                    id={prop._id}
                    title={prop.title}
                    price={prop.price}
                    state={prop.state}
                    image={prop.image}
                    layout="grid"
                  />
                </span>
                <button className="bg-blue-400 p-2 mt-2 rounded-md text-white hover:bg-white hover:text-black w-full font-bold" 
                onClick={()=>{
                  showToast(toast, 'Info', 'info', "Listing Property...")
                  ListProperty(prop.propertyID)}}>List Property</button>
                </div>
              );
            })}
          </div>        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default ListProperties;
