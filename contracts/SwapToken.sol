// SPDX-License-Identifier: GPL-2.0-or-Later
pragma solidity >=0.7.0 <0.9.0;
pragma abicoder v2;

import "@uniswap/v3-periphery/contracts/libraries/TransferHelper.sol";
import "@uniswap/v3-periphery/contracts/interfaces/ISwapRouter.sol";

contract SingleSwapToken {
    ISwapRouter public constant swapRouter = ISwapRouter("paste address");
    address public constant DAI = "paste address";
    address public constant WETH9 = "paste address";
    address public constant USDC = "paste address";

    event LogInfo(uint256 value);

    function swapExactInputSingle(uint256 amountIn) external returns (uint256) {
        // Transfer WETH to this contract
        TransferHelper.safeTransferFrom(WETH9, msg.sender, address(this), amountIn);
        // Approve the router to spend WETH
        TransferHelper.safeApprove(WETH9, address(swapRouter), amountIn);

        // Define swap parameters
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

        // Execute swap
        uint256 amountOut = swapRouter.exactInputSingle(params);
        emit LogInfo(amountOut);
        return amountOut;
    }

    
       function swapExactOutputSingle(uint256 amountOut, uint256 amountInMaximum) external returns (uint256) {
        // Transfer WETH to this contract
        TransferHelper.safeTransferFrom(WETH9, msg.sender, address(this), amountInMaximum);
        // Approve the router to spend WETH
        TransferHelper.safeApprove(WETH9, address(swapRouter), amountInMaximum);

        // Define swap parameters
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

        // Execute swap
        uint256 amountIn = swapRouter.exactOutputSingle(params);

        // Handle any excess WETH
        if (amountIn < amountInMaximum) {
            TransferHelper.safeApprove(WETH9, address(swapRouter), 0);
            TransferHelper.safeTransfer(WETH9, msg.sender, amountInMaximum - amountIn);
        }
        return amountIn;
    }
}
