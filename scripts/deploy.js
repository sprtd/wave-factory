// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const { parseEther } = require("@ethersproject/units");
const { ethers } = require("ethers");
const hre = require("hardhat");

async function main() {
  const WavePortal = await hre.ethers.getContractFactory('WavePortal');

  
  const waveContract = await WavePortal.deploy({ value: parseEther('0.01')})

  await waveContract.deployed()

  console.log('wave portal deployed to: ', waveContract.address)

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
