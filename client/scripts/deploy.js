const hre=require("hardhat");

async function main(){
  const Tracking =await hre.ethers.getContractFactory("Test");
  const contract =await Tracking.deploy();

  await contract.deployed();
  console.log("ADDRESS OF CONTRACT:",contract.address)
}

main().catch((error)=>{
  console.error(error);
  process.exitCode=1;
})