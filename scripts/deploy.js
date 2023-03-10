const { ethers } = require("hardhat");

async function main() {
  const helloWorld = await ethers.getContractFactory("HelloWorld");
  const hw = await helloWorld.deploy("Hello world bingo!");
  console.log("Contract Deployed to:", hw.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
