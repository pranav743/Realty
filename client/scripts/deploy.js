const hre = require("hardhat");

async function main() {
  const Tracking = await hre.ethers.getContractFactory("Realty");
  const contract = await Tracking.deploy();

  // Wait for the contract deployment to be completed
  await contract.waitForDeployment();

  console.log("ADDRESS OF CONTRACT:", contract.target);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
