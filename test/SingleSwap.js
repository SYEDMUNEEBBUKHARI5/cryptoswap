const {expect} = require("chai");
const {ethers} = require("hardhat");

const DAI = "";
const WETH9 = "";
const USDC = "";

describe("SingleSwapToken",()=>{
    let singleSwapToken;
    let accounts;
    let weth;
    let dai;
    let usdc;

    before(async ()=>{
        accounts = await ethers.getSigners(1)
        const SingleSwapToken = await ethers.getContractFactory("SingleSwapToken");
        singleSwapToken = await SingleSwapToken.deploy();

        await singleSwapToken.deployed();
        weth = await ethers.getContractAt("IWETH", WETH9);
        // dai = await ethers.getContractAt("IERC20", DAI);
        usdc = await ethers.getContractAt("IERC20", USDC);

        // console.log('weth', weth);
        // console.log('dai', dai);
        // console.log('usdc', usdc);
        // console.log('accounts', accounts);
        // console.log('singleSwapToken', singleSwapToken);



    });

    it("swapExactInputSingle", async ()=>{
        const amountIn = 10n ** 18n;

        //Deposit WETH
        await weth.deposit({value: amountIn});
        await weth.approve(singleSwapToken.address, amountIn);

        //swap
        await singleSwapToken.swapExactInputSingle(amountIn);
        // console.log("Balance Of", await dai.balanceOf(accounts[0].address))
        // console.log('weth', weth);
        // console.log('dai', dai);
        // console.log('usdc', usdc);
        // console.log('accounts', accounts);
        // console.log('singleSwapToken', singleSwapToken);
    })
})
