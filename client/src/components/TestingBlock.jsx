import React,{useState,useEffect} from 'react'
import { ethers } from 'ethers';
import abi from './Test.json'

const TestingBlock = () => {
        
    //BLOCKCHAIN CONNECTION HERE
          const [state,setState]=useState({
            provider:null,
            signer:null,
            contract:null,
          })  
        
          useEffect(()=>{
             const connectWallet=async()=>{
                const contractAddress = "0xbb0be3A9f4612E5942cE28DD6a49d9E8B6708fB5";
                const contractAbi=abi.abi;
                try{
                   const {ethereum}=window;
                   if(ethereum){
                        const account = await ethereum.request({method:"eth_requestAccounts"})
                   }else{
                       console.log("no metamask")
                   }
                   const provider= new ethers.providers.Web3Provider(ethereum);
                   const signer=provider.getSigner();
                   const contract=new ethers.Contract(contractAddress,contractAbi,signer);
                   setState({provider,signer,contract})
                }catch(error){
                   console.log(error)
                } 
            };
            connectWallet();
          },[]);
    
          const {contract} =state;
          console.log(contract)
          
        //BLCOKCHAIN CONNECTION ENDS HERE    
        

        const add_data = async ()=>{
            const transaction = await contract.addData(1,'Pranav');
            await transaction.wait();
            console.log(transaction);
          } ;

          const seedata = async()=>{
            const transaction = await contract.retrieveAllData();
            console.log(transaction);
          }

  return (
    <div>
       
       <div onClick={add_data} className='bg-green-500 p-2 rounded-[8px] font-bold text-white'>ADD DATA</div>
       <div onClick={seedata} className='bg-red-500 p-2 rounded-[8px] font-bold text-white'>SEEDATA</div>
    </div>
  )
}

export default AddBatch