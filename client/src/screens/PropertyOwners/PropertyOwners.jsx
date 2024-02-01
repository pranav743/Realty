import React,{useEffect,useState} from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { ethers } from "ethers";
import abi from "../Realty.json";

const PropertyOwners = () => {

  const [tokenURIs,settokenURIs]=useState();
  const { id } = useParams();
  const[owners, setOwners] = useState()

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
      Loaderdata(contract,id);
    } catch (error) {
      console.log(error);
    }
  };

  const Loaderdata = async(contract,id)=>{

      console.log("contract",st);    
      try {
        const response = await contract.pastOwners(id);
        setOwners(response);
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

  

  //blockchain call ends

  //BLOCKCHAIN CALL ENDS

  console.log(id);
  return (
    <div>
      <section class="flex min-h-screen justify-center text-white pt-20">
        <div class="w-80">
          <ul>
            {owners && owners.map((owner, index) =>{
             
              return (  <li class="relative flex items-baseline gap-6 pb-5" key={index}>
              <div class="before:absolute before:left-[5.5px] before:h-full before:w-[1px] before:bg-gray-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="12"
                  class="bi bi-circle-fill fill-gray-400"
                  viewBox="0 0 16 16"
                >
                  <circle cx="8" cy="8" r="8" />
                </svg>
              </div>
              <div>
                
                <p class="text-sm">{index+10}-02-2024</p>
                <p class="mt-2 text-sm">
                  {owner}
                </p>
              </div>
            </li>)
            })}
            <p style={{marginTop: '20px'}}>Owners</p>
          
           
          </ul>
        </div>
      </section>{" "}
    </div>
  );
};

export default PropertyOwners;
