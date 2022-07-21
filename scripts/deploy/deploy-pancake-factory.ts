import { ethers } from "hardhat";

import { PancakeFactory__factory } from "../../typechain/factories/PancakeFactory__factory";

export async function deployPancakeFactory() {
  const [owner] = await ethers.getSigners();
  const PancakeFactory = (await ethers.getContractFactory("PancakeFactory")) as PancakeFactory__factory;

  const pancakeFactory = await PancakeFactory.deploy(owner.address);

  await pancakeFactory.deployTransaction.wait();
  console.log("INIT_CODE_PAIR_HASH:", await pancakeFactory.INIT_CODE_PAIR_HASH());
  console.log("PancakeFactory at: ", pancakeFactory.address);
  return pancakeFactory.address;
}
