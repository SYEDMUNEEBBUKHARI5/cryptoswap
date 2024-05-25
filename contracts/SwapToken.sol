// SPDX-License-Identifier: GPL-2.0-or-Later
pragma solidity >=0.7.0 < 0.9.0;
pragma abicoder v2;

import "@uniswap/v3-periphery/contracts/libraries/TransferHelper.sol";
import "@uniswap/v3-periphery/contracts/interfaces/ISwapRouter.sol";


contract SingleSwapToken {
    ISwapRouter public constant swapRouter = ISwapRouter();
    address public constant DAI = ;
    address public constant WETH9 = ;
    address public constant USDC = ;
    event LogInfo(uint256 value);

    function swapExactInputSingle(uint amountIn) external returns(uint256){
        TransferHelper.safeTransferFrom(WETH9, msg.sender, address(this), amountIn);
        TransferHelper.safeApprove(WETH9, address(swapRouter), amountIn);

        
        ISwapRouter.ExactInputSingleParams memory params = ISwapRouter.ExactInputSingleParams({
            tokenIn: WETH9,
            tokenOut: DAI,
            fee: 3000,
            recipient: msg.sender,
            deadline: block.timestamp,
            amountIn: amountIn,
            amountOutMinimum: 0,
            sqrtPriceLimitX96: 0
        });
        //transfer
        uint256 amountOut = swapRouter.exactInputSingle(params);
        emit LogInfo(amountOut);
        return amountOut;
    }

    function swapExactOutputSingle(uint amountOut, uint amountInMaximum) external returns(uint amountIn){
           TransferHelper.safeTransferFrom(WETH9, msg.sender, address(this), amountInMaximum);
           TransferHelper.safeApprove(WETH9, address(this), amountInMaximum);
           ISwapRouter.ExactOutputSingleParams memory params = ISwapRouter.ExactOutputSingleParams({
             tokenIn: WETH9,
            tokenOut: DAI,
            fee: 3000,
            recipient: msg.sender,
            deadline: block.timestamp,
            amountOut: amountOut,
            amountInMaximum: amountInMaximum,
            sqrtPriceLimitX96: 0
           });

             amountIn = swapRouter.exactOutputSingle(params);

             if(amountIn < amountInMaximum)
             {
                TransferHelper.safeApprove(WETH9, address(swapRouter), 0);
                TransferHelper.safeTransfer(WETH9, msg.sender, amountInMaximum - amountIn);
             }
    }
}

