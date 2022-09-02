import { expect } from "chai";
import { ethers } from "hardhat";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { PancakeFactory__factory } from "../typechain/factories/PancakeFactory__factory";
import { PancakeRouter__factory } from "../typechain/factories/PancakeRouter__factory";
import { Token__factory } from "../typechain";
import { PancakeRouter } from "../typechain";
import { PancakeFactory } from "../typechain";
import { PancakePair__factory } from "../typechain/factories/PancakePair__factory";
import { PancakePair } from "../typechain";
import { BigNumber } from "ethers";
import { GetARGsTypeFromFactory } from "../typechain/common";

describe("AddLiquidity", function () {
  let owner: SignerWithAddress;
  let wallet1: SignerWithAddress;
  let PancakeFactory: PancakeFactory__factory;
  let pancakeFactory: any;
  let tokenWETH: any;
  let PancakeRouter: PancakeRouter__factory;
  let pancakeRouter: any;
  let tokenA, tokenB, tokenC, tokenD: any;
  beforeEach(async function () {
    [owner, wallet1] = await ethers.getSigners();
    console.log("owner Address:", owner.address);

    PancakeFactory = (await ethers.getContractFactory("PancakeFactory")) as PancakeFactory__factory;
    pancakeFactory = await PancakeFactory.deploy(owner.address);
    await pancakeFactory.deployed();
    console.log("PancakeFactory");
    console.log("pancakeFactory Address:", pancakeFactory.address);
    console.log("feeToSetter address:", await pancakeFactory.feeToSetter());
    console.log("pancakeFactory INIT_CODE_PAIR_HASH:", await pancakeFactory.INIT_CODE_PAIR_HASH());

    console.log("---------------------------------");

    const TokenWETH = (await ethers.getContractFactory("Token")) as Token__factory;
    tokenWETH = await TokenWETH.deploy("Wrapped Ether", "WETH");

    PancakeRouter = (await ethers.getContractFactory("PancakeRouter")) as PancakeRouter__factory;
    pancakeRouter = await PancakeRouter.deploy(pancakeFactory.address, tokenWETH.address);
    await pancakeRouter.deployed();

    console.log("pancakeRouter factory:", await pancakeRouter.factory());
    console.log("pancakeRouter WETH:", await pancakeRouter.WETH());

    const TokenA = (await ethers.getContractFactory("Token")) as Token__factory;
    tokenA = await TokenA.deploy("A Coin", "AC");

    const TokenB = (await ethers.getContractFactory("Token")) as Token__factory;
    tokenB = await TokenB.deploy("B Coin", "BC");

    const TokenC = (await ethers.getContractFactory("Token")) as Token__factory;
    tokenC = await TokenC.deploy("C Coin", "CC");

    const TokenD = (await ethers.getContractFactory("Token")) as Token__factory;
    tokenD = await TokenD.deploy("D Coin", "DC");

    // await tokenA.connect(owner).mint(owner.address, ethers.utils.parseEther("10000"));
    // await tokenA.connect(owner).approve(pancakeRouter.address, ethers.utils.parseEther("10000"));
    // await tokenB.connect(owner).mint(owner.address, ethers.utils.parseEther("10000"));
    // await tokenB.connect(owner).approve(pancakeRouter.address, ethers.utils.parseEther("10000"));

    describe("swapExactTokensForTokens Test 1", function () {
      // it("Should SWap with TokenA and TokenB", async function () {
      //   console.log("---------------------------------");
      //   const contractRouter = PancakeRouter__factory.connect(pancakeRouter.address, owner) as PancakeRouter;
      //   const contractFactory = PancakeFactory__factory.connect(pancakeFactory.address, owner) as PancakeFactory;
      //   await contractRouter.addLiquidity(
      //     TokenA.address,
      //     TokenB.address,
      //     ethers.utils.parseEther("300"),
      //     ethers.utils.parseEther("100"),
      //     0,
      //     0,
      //     owner.address,
      //     100000000000
      //   );
      //   await TokenA.connect(owner).approve(pancakeRouter.address, ethers.utils.parseEther("600"));
      //   await TokenB.connect(owner).approve(pancakeRouter.address, ethers.utils.parseEther("600"));
      //   await contractRouter.swapExactTokensForTokens(
      //     ethers.utils.parseEther("600"),
      //     ethers.utils.parseEther("0"),
      //     [TokenB.address, TokenA.address],
      //     owner.address,
      //     100000000000
      //   );
      //   // const getPairAdd = await contractFactory.getPair(TokenA.address, TokenB.address);
      //   // expect(await contractFactory.allPairs(0)).to.equal(
      //   //   await contractFactory.getPair(TokenA.address, TokenB.address)
      //   // );
      //   // const contractPair = PancakePair__factory.connect(getPairAdd, owner) as PancakePair;
      //   // const opReserves = await contractPair.getReserves();
      //   // console.log(ethers.utils.formatEther(opReserves._reserve0));
      //   // console.log(ethers.utils.formatEther(opReserves._reserve1));
      //   // console.log(ethers.utils.formatEther(await contractPair.balanceOf(owner.address)));
      // });
    });

    // describe("swapTokensForExactTokens Test 2", function () {
    //   it("Should SWap with TokenA and TokenB", async function () {
    //     console.log("---------------------------------");

    //     const contractRouter = PancakeRouter__factory.connect(pancakeRouter.address, owner) as PancakeRouter;
    //     const contractFactory = PancakeFactory__factory.connect(pancakeFactory.address, owner) as PancakeFactory;
    //     await contractRouter.addLiquidity(
    //       TokenA.address,
    //       TokenB.address,
    //       ethers.utils.parseEther("500"),
    //       ethers.utils.parseEther("500"),
    //       0,
    //       0,
    //       owner.address,
    //       100000000000
    //     );
    //     DataTransfer;

    //     // await TokenA.connect(owner).approve(pancakeRouter.address, ethers.utils.parseEther("600"));
    //     // await TokenB.connect(owner).approve(pancakeRouter.address, ethers.utils.parseEther("600"));

    //     // await contractRouter.swapExactTokensForTokens(
    //     //   ethers.utils.parseEther("200"),
    //     //   0,
    //     //   [TokenB.address, TokenA.address],
    //     //   owner.address,
    //     //   100000000000
    //     // );
    //   });
    // });
  });

  it("Should ", async function () {
    // const Greeter = await ethers.getContractFactory("Greeter");
    // const greeter = await Greeter.deploy("Hello, world!");
    // await greeter.deployed();
    // expect(await greeter.greet()).to.equal("Hello, world!");
    // const setGreetingTx = await greeter.setGreeting("Hola, mundo!");
    // // wait until the transaction is mined
    // await setGreetingTx.wait();
    // expect(await greeter.greet()).to.equal("Hola, mundo!");
  });
});
