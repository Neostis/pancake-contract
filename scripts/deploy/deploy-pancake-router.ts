import { ethers } from "hardhat";

import { PancakeRouter__factory } from "../../typechain/factories/PancakeRouter__factory";

export async function deployPancakeRouter(factory: string, weth: string) {
  const [owner] = await ethers.getSigners();
  const PancakeRouter = (await ethers.getContractFactory("PancakeRouter")) as PancakeRouter__factory;

  const pancakeRouter = await PancakeRouter.deploy(factory, weth);

  await pancakeRouter.deployTransaction.wait();
  
  console.log("PancakeRouter at: ", pancakeRouter.address);
  return pancakeRouter.address;
}
