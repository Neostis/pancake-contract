import { expect } from "chai";
import { ethers } from "hardhat";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { PancakeFactory__factory } from "../typechain/factories/PancakeFactory__factory";
import { PancakeRouter__factory } from "../typechain/factories/PancakeRouter__factory";
import { Token__factory } from "../typechain";
import { PancakeRouter } from "../typechain";
import { PancakeFactory } from "../typechain";
import { PancakePair__factory } from "../typechain/factories/PancakePair__factory"
import { PancakePair } from "../typechain";


describe("Greeter", function () {
  let owner: SignerWithAddress;
  let wallet1: SignerWithAddress;
  let PancakeFactory: PancakeFactory__factory;
  let pancakeFactory: any;
  let tokenWETH: any;
  let PancakeRouter: PancakeRouter__factory;
  let pancakeRouter: any;
  let pancakePair : PancakePair__factory;
  let tokenUSDC: any;
  let tokenBUSD: any;

  let tokenAA: any;
  let tokenBB: any;

  let tokenCC: any;
  let tokenDD: any;
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


    console.log("ADD LP");

    describe("AddLiquidity1", function () {
      it("Should AddLiquidity with tokenA and TokenB", async function () {
        console.log("---------------------------------");

        const TokenUSDC = (await ethers.getContractFactory("Token")) as Token__factory;
        tokenUSDC = await TokenUSDC.deploy("USD Coin", "USDC");
        const TokenBUSD = (await ethers.getContractFactory("Token")) as Token__factory;
        tokenBUSD = await TokenBUSD.deploy("Binance USD", "BUSD");
    
        await tokenUSDC.connect(owner).mint(owner.address, ethers.utils.parseEther("10000"));
        await tokenUSDC.connect(owner).approve(pancakeRouter.address, ethers.utils.parseEther("10000"));
    
        await tokenBUSD.connect(owner).mint(owner.address, ethers.utils.parseEther("10000"));
        await tokenBUSD.connect(owner).approve(pancakeRouter.address, ethers.utils.parseEther("10000"));
    
        const contractFactory = PancakeFactory__factory.connect(pancakeFactory.address, owner) as PancakeFactory;
        const contractRouter = PancakeRouter__factory.connect(pancakeRouter.address, owner) as PancakeRouter;
        await contractRouter.addLiquidity(
          tokenUSDC.address,
          tokenBUSD.address,
          ethers.utils.parseEther("5000"),
          ethers.utils.parseEther("5000"),
          0,
          0,
          owner.address,
          100000000000
        );

        const getPairAdd = await contractFactory.getPair(tokenUSDC.address, tokenBUSD.address);
        // console.log("getPairAdd1", await contractFactory.getPair(tokenUSDC.address, tokenBUSD.address));
        // console.log("getPairAdd2", getPairAdd);

        // console.log("getAllPairAdd",await contractFactory.allPairs(0));
        expect(await contractFactory.allPairs(0)).to.equal(await contractFactory.getPair(tokenUSDC.address, tokenBUSD.address));

        const contractPair = PancakePair__factory.connect(getPairAdd, owner) as PancakePair;

          console.log(await contractPair.getReserves())
      });
    });

    describe("AddLiquidity2", function () {
      it("Should AddLiquidity with tokenAA and TokenBB", async function () {
        console.log("---------------------------------");

        const TokenAA = (await ethers.getContractFactory("Token")) as Token__factory;
        tokenAA = await TokenAA.deploy("A Coin", "AA");
        const TokenBB = (await ethers.getContractFactory("Token")) as Token__factory;
        tokenBB = await TokenBB.deploy("B Coin", "BB");
    
        await tokenAA.connect(owner).mint(owner.address, ethers.utils.parseEther("1000"));
        await tokenAA.connect(owner).approve(pancakeRouter.address, ethers.utils.parseEther("1000"));
    
        await tokenBB.connect(owner).mint(owner.address, ethers.utils.parseEther("1000"));
        await tokenBB.connect(owner).approve(pancakeRouter.address, ethers.utils.parseEther("1000"));
    
        const contractRouter = PancakeRouter__factory.connect(pancakeRouter.address, owner) as PancakeRouter;
        await contractRouter.addLiquidity(
          tokenAA.address,
          tokenBB.address,
          ethers.utils.parseEther("2000"),
          ethers.utils.parseEther("2000"),
          0,
          0,
          owner.address,
          100000000000
        );


      });
    });
        // // await pancakeFactory.connect(owner).createPair(tokenUSDC.address, tokenBUSD.address);
        // // const tokenA = await PancakeFactory.attach(tokenUSDC.address);
        // // const tokenB = await PancakeFactory.attach();
        // await pancakeRouter
        //   .connect(owner)
        //   .addLiquidity(
        //     tokenUSDC.address,
        //     tokenBUSD.address,
        //     ethers.utils.parseEther("10000"),
        //     ethers.utils.parseEther("10000"),
        //     0,
        //     0,
        //     owner.address,
        //     100000000000
        //   );
        // // await pancakeRouterAdd.addLiquidity(tokenUSDC.address, tokenBUSD.address, ethers.utils.parseEther("10000"), ethers.utils.parseEther("10000"),0,0, owner.address,100000000000)

        // console.log(pancakeFactory.getPair(tokenUSDC.address, tokenBUSD.address));

  });
  it("Should Add", async function () {


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
