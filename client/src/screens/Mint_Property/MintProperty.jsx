import React,{useEffect,useState} from 'react'
//Page TO MINTPROPERTY
import { ethers } from 'ethers';
import abi from '../Realty.json'


const MintProperty = () => {

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
        connectWallet();
      }, []);
    
      const { contract } = state;

      const MintProperty = async (tokenURI,propertyID) => {
        try {
          const batchDetails = await contract.mintNFT(tokenURI,propertyID);
          alert("PROPERTY MINTED");
        } catch (error) {
          console.error("Error fetching batch details:", error);
        }
      };
  
  
    return (
    
        //TOKENURI IS THE LINK OF THE DATA
        //PROPERTYID IS THE UNIQUES KEY TO THE PROPERY
        
    <div onClick={MintProperty(tokenURI,propertyID)}>MintProperty</div>
  )
}

export default MintProperty