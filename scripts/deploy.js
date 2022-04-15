//implement ethers from hardhat
const{ethers} = require("hardhat");

async function main(){
     /*
  A ContractFactory in ethers.js is an abstraction used to deploy new smart contracts,
  so NestcoinContract here is a factory for instances of our Nestcoin contract.
  */
 console.log("deploying NESTDRIVE contract.......")
    const NestdriveContract = await ethers.getContractFactory("NestDrive");

    // here we deploy the contract
    const deployedNestDriveContract = await NestdriveContract.deploy();

    // Wait for it to finish deploying
  await deployedNestDriveContract.deployed();

  // print the address of the deployed contract
  console.log(
    "\n 🏵 NESTDRIVE Contract Address:",
    deployedNestDriveContract.address
  );


  
}
// Call the main function and catch if there is any error
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
