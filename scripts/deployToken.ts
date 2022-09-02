import { PancakePair } from "./../typechain/PancakePair.d";
import { PancakePair__factory } from "./../typechain/factories/PancakePair__factory";
import { PancakeRouter__factory } from "./../typechain/factories/PancakeRouter__factory";
import { PancakeRouter } from "./../typechain/PancakeRouter.d";
import { PancakeFactory__factory } from "./../typechain/factories/PancakeFactory__factory";
import hre from "hardhat";
import { ethers } from "ethers";

import { Token__factory } from "./../typechain/factories/Token__factory";
import { deployPancakeFactory } from "./deploy/deploy-pancake-factory";
import { deployPancakeRouter } from "./deploy/deploy-pancake-router";
import { deployToken } from "./deploy/deploy-token";
import { PancakeFactory, Token } from "../typechain";

const { formatEther, parseEther } = ethers.utils;

async function main() {
  const [owner] = await hre.ethers.getSigners();

  // const AC = await deployToken("A Coin", "AC");
  // const BC = await deployToken("B Coin", "BC");
  // const CC = await deployToken("C Coin", "CC");
  // const DC = await deployToken("D Coin", "DC");
  const EC = await deployToken("E Coin", "EC");


  // const contractAc = Token__factory.connect(AC, owner) as Token;
  // const contractBc = Token__factory.connect(BC, owner) as Token;
  // const contractCc = Token__factory.connect(CC, owner) as Token;
  const contractEc = Token__factory.connect(EC, owner) as Token;

  // await contractAc.mint(owner.address, parseEther("2000"));
  /* Connecting to the contract and casting it to the type `Token` */
  // await contractBc.mint(owner.address, parseEther("2000"));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
