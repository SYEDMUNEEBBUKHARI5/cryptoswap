const { expect } = require("chai");
const { ethers } = require("hardhat");

const DAI = "paste address";
const WETH9 = "paste address";
const USDC = "paste address";

describe("SingleSwapToken", () => {
    let singleSwapToken;
    let accounts;
    let weth;
    let dai;
    let usdc;

    before(async () => {
        accounts = await ethers.getSigners();
        const SingleSwapToken = await ethers.getContractFactory("SingleSwapToken");
        singleSwapToken = await SingleSwapToken.deploy();
        await singleSwapToken.deployed();

        weth = await ethers.getContractAt("IWETH", WETH9);
        dai = await ethers.getContractAt("IERC20", DAI);
        usdc = await ethers.getContractAt("IERC20", USDC);
    });

    it("swapExactInputSingle", async () => {
        // 1 WETH
        const amountIn = ethers.utils.parseUnits("1", 18); 

        await weth.deposit({ value: amountIn });
        await weth.approve(singleSwapToken.address, amountIn);

        // Check the balances before token swap
        console.log("DAI Balance Before Swap:", (await dai.balanceOf(accounts[0].address)).toString());

        // Swap
        await singleSwapToken.swapExactInputSingle(amountIn);

        // Check the balances after tokenswap
        console.log("DAI Balance After Swap:", (await dai.balanceOf(accounts[0].address)).toString());
    });

    //we specify what amount of tokens we need as output on this basis it decides input
    it.only("swapExactOutputSingle", async () => {
        const wethAmounInMax = 10n ** 18n;
        const daiAmountOut = 100n * 10n ** 18n;

        await weth.deposit({value: wethAmounInMax});
        await weth.approve(singleSwapToken.address, wethAmounInMax);

        await singleSwapToken.swapExactOutputSingle(daiAmountOut, wethAmounInMax);

        console.log("address=>", accounts[0].address);
        console.log("Dai Balance=>", (await dai.balanceOf(accounts[0].address)).toString());

    });
});
