import hre, { ethers } from "hardhat";

import { Token__factory } from "../../typechain";

export async function deployToken(name: string, symbol: string) {
  const Token = (await ethers.getContractFactory("Token")) as Token__factory;

  const token = await Token.deploy(name, symbol);

  await token.deployTransaction.wait();

  console.log(`Deployed ${symbol} at: `, token.address);
  return token.address;
}
