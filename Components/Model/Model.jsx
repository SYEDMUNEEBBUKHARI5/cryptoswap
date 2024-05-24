import React,{useState, useEffect} from 'react'
import Image from 'next/image';
import Style from "./Model.module.css";
import images from "../../assets/index";

const Model=({setOpenModel, connectWallet}) =>{
    //USESTATE
    const walletMenu = ["MetaMask","Coinbase","Wallet","walletConnect"];
    return (
        <div className={Style.Model}>
            <div className={Style.Model_box}>
                <div className={Style.Model_box_heading}>
                    <p>Connect a Wallet!</p>
                    <div className={Style.Model_box_heading_img}>
                        <Image  src={images.close} alt="logo" width={50} height={50} onClick={()=>setOpenModel(false)}/>
                    </div>
                </div>
                <div className={Style.Model_box_wallet}>
                    {walletMenu.map((el, i)=>(
                    <p key={i + 1} onClick={()=>connectWallet()}>
                        {el}
                    </p>))}
                </div>
                <p className={Style.Model_box_para}>
                    By connecting a wallet, you agree to cryptoswap Labs <br /> Terms and consent to its privacy policy
                </p>
            </div>
        </div>
    )
}

export default Model
