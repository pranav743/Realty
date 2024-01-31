import React, { useState, useEffect } from "react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import { getUserDetails } from "../../Global/authUtils";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { url } from "../../Global/URL";
import { ethers } from "ethers";
import abi from "../Realty.json";




import LocationCards from "../Home/LocationCards";

const ListProperties = () => {

   //BLOCKCHAIN CALL STARTS

  //blockchain call starts

  const [tokenURIs,settokenURIs]=useState();
  const [account,setaccount]=useState();

  //BLOCKCHAIN CALL STARTS

  //blockchain call starts

  const [st, setst] = useState({
    provider: null,
    signer: null,
    contract: null,
  });

  const connectWallet = async () => {
    const contractAddress = "0xbB63f7054DA6eAeD619f5EaFb0A6d3d22837c9A2";
    const contractAbi = abi.abi;
    console.log(contractAbi);
    try {
      const { ethereum } = window;
      if (ethereum) {
        const accounts = await ethereum.request({method: "eth_requestAccounts",});
        setaccount(accounts[0]);
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
      mintedProperties(account[0]);
    } catch (error) {
      console.log(error);
    }
  };

  const mintedProperties = async(address)=>{

      console.log("contract",st);    
      try {
        const response = await contract.mintedPropertiesByOwner(address);
        console.log("RESPONSE", response);
        settokenURIs(response);
        // alert(tokenURIs);
      } catch (error) {
        console.error("Error fetching batch details:", error);
      }
  }

  useEffect(() => {
    
    connectWallet();
    console.log("USEEFFECT FINISHED");
  }, []);

  const ListProperties = async (propertyID)=>{
    
      setIsSubmitted(true);

      const { contract } = st;
      console.log("contract", st);
    
      try {
        const ListProp = await contract.List_Property(propertyID);
        showToast(toast, 'success','success', `NFT Minted !`);
        handleSubmit();
        showToast(toast, 'success','success', "Property Listed !");
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
        <Tab>Listed Properties</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <div className="flex flex-wrap gap-10">
            {propertiesOwned.map((prop, index) => {
              return (
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
              );
            })}
          </div>
        </TabPanel>
        <TabPanel>
          <p>Listed Properties!</p>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default ListProperties;
