//import externnal
import React,{useState, useEffect, useContext} from 'react'
import Image from 'next/image';
import Link from 'next/link';

//import internal
import Style from "./Navbar.module.css";
import images from "../../assets";
import {Model, TokenList} from "../index";

const Navbar=() =>{
    const menuItems =[
        {
            name:"Swap",
            Link:"/"
        },
        {
            name:"Tokens",
            Link:"/"
        },
        {
            name:"Pools",
            Link:"/"
        }
    ];
    const [openModel, setOpenModel] = useState(false);
    const [openTokenModal, setOpenTokenModal] = useState(false);
    const [account, setaccount] = useState(false);

    return (
        <div className={Style.Navbar}>
            <div className={Style.Navbar_modal}>
                <div className={Style.Navbar_modal_left}>
                    {/* DEX Icon */}
                    <div className={Style.Navbar_modal_left_img}>
                        <Image src={images.cryptoswap}  alt="logo" width={50} height={50} />
                    </div>
                    {/* Menu Items */}
                    <div className={Style.Navbar_modal_left_menu}>
                        {
                            menuItems.map((el, i)=>(
                                <Link key={i + 1} href = {{pathname: `${el.name}`, query: `${el.link}`}}>
                                    <p className={Style.Navbar_modal_left_menu_item}>{el.name}</p>
                                </Link>
                            ))
                        }
                    </div>
                </div>
                {/* Middle Items*/ }
                <div className={Style.Navbar_modal_middle}>
                   <div className={Style.Navbar_modal_middle_search}>
                        <div className={Style.Navbar_modal_middle_search_img}>
                            <Image src={images.search} alt="search" width={20} height={20} />
                        </div>
                        {/* Input Section */}
                        <input type="text" placeholder="Search Tokens" />
                   </div>
                </div>
                {/* Right Section */}
                <div className={Style.Navbar_modal_right}>
                    <div className={Style.Navbar_modal_right_modal}>
                        <div className={Style.Navbar_modal_right_modal_img}>
                            <Image src={images.ether} alt="Network" height={30} width={30} />
                        </div>
                        <p>Network Name</p>
                    </div>
                    {
                        account ? (
                            <button onClick={()=>setOpenModel(true)}>Connect</button>
                        )
                        :
                        (
                            <button onClick={()=>setOpenTokenModal(true)}>0x2342re234234guyg67ggyug</button>
                        )
                    }
                    {
                        openModel && (
                            <Model setOpenModel={setOpenModel} connectWallet="Connect" />
                        )
                    }
                </div>
            </div>
            {/* TokenList which user have in his wallet */}
            {
                openTokenModal && (
                    <TokenList  tokenDate="hey" setOpenTokenModal={setOpenTokenModal} />
                )
            }
        </div>
    )
}

export default Navbar
