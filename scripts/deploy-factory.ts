// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers } from "hardhat";
import { PancakeERC20 } from "../typechain/PancakeERC20";

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');
  const [owner] = await ethers.getSigners();
  // We get the contract to deploy
  
  const PancakeFactory = (await ethers.getContractFactory("PancakeFactory")) ;
  
  const pancakeFactory = await PancakeFactory.deploy(owner.address);
  // const PancakeFactory = await ethers.getContractFactory("PancakeFactory");
  // const pancakeFactory = await PancakeFactory.deploy();

  // await pancakeFactory.deployed();

  // console.log("Greeter deployed to:", pancakeFactory.address);



  
    await pancakeFactory.deployTransaction.wait();
    console.log("INIT_CODE_PAIR_HASH:", await pancakeFactory.INIT_CODE_PAIR_HASH());
    console.log("PancakeFactory at: ", pancakeFactory.address);
    return pancakeFactory.address;

//   console.log(await pancakeERC20.name());
//   console.log(await pancakeERC20.symbol());



//   pancakeERC20._mint(0x000001,100);
//   console.log(pancakeERC20.balanceOf(0x000001))
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
