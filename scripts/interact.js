require("dotenv").config();
const { ethers } = require("hardhat");

const API_KEY = process.env.ALCHEMY_API_KEY; //get from alchemy
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS; //deployed contract address
const PRIVATE_KEY = process.env.PRIVATE_KEY; //metamask

const contract = require("../artifacts/contracts/HelloWorld.sol/HelloWorld.json");

// provider - Alchemy
const alchemyProvider = new ethers.providers.AlchemyProvider(
  (network = "goerli"),
  API_KEY
);

// signer - you
const signer = new ethers.Wallet(PRIVATE_KEY, alchemyProvider);

// contract instance
const helloWorldContract = new ethers.Contract(
  CONTRACT_ADDRESS,
  contract.abi,
  signer
);

async function runcontract() {
  const message = await helloWorldContract.message();
  console.log("the message is --- ", message);

  const tx = await helloWorldContract.update("Good Bye, World!");
  await tx.wait();

  const nmessage = await helloWorldContract.message();
  console.log("the new message is " + nmessage);
}

runcontract()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
