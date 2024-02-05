import React, {useEffect, useState, useContext} from 'react'
import Style from './Navbar.module.css'
import Image from 'next/image';
import Link from 'next/link';
import { ChatAppContext } from '@/Context/ChatAppContext';
import {Modal , Error} from '../index'
import images from "../../assets"


const Navbar = () => {
  const menuItems =[
    {
      menu : "All User", 
      link :"alluser"
    },
    {
      menu : "CHAT", 
      link :"/"
    }, 
    {
      menu : "CONTACT", 
      link :"/"
    },
    {
      menu : "SETTING", 
      link :"/"
    }, 
    {
      menu : "FAQS", 
      link :"/"
    },
    {
      menu : "TERMS OF USE", 
      link :"/"
    }
  ]

  const [active , setActive] = useState(2)
  const [open , setOpen] = useState(false)
  const [openModel, setOpenModel] = useState(false)

  const {account , userName , connectWallet, error , createAccount} = useContext(ChatAppContext)
  return (
   <div className={Style.Navbar}>
    <div className={Style.Navbar_box}>
    <div className={Style.Navbar_box_left}>
      <Image src = {images.logo} alt="logo" width={50} height={50}/>
      </div>
      <div className={Style.Navbar_box_right}>
        {/* //DESKTOP */}
      <div className={Style.Navbar_box_right_menu}>
        {menuItems.map((el, i)=>(
          <div 
          onClick={()=>{setActive(i+1)}}
          key={i+1}
          className = {`${Style.Navbar_box_right_menu_items} ${active == i+1 ? Style.active_btn : " "}`}>
            <Link className={Style.Navbar_box_right_menu_items_link}
            href = {el.link}
            >
              {el.menu}
            </Link>
          
          </div>
        ))}
        
        </div>
        {/* //MOBILE */}
        {open && (      <div className={Style.mobile_menu}>
        {menuItems.map((el, i)=>(
          <div 
          onClick={()=>{setActive(i+1)}}
          key={i+1}
          className = {`${Style.mobile_menu_items} ${active == i+1 ? Style.active_btn : " "}`}>
            <Link className={Style.mobile_menu_items_link}
            href = {el.link}
            >
              {el.menu}
            </Link>
          
          </div>
        ))}
        <p className={Style.mobile_menu_btn}>
          <Image src ={images.close} alt ="close" width ={50} height ={50} onClick={()=>setOpen(false)}/>
        </p>
        
        </div>)}

        {/* //CONNECT WALLET */}
        <div className={Style.Navbar_box_right_connect}>
          {account == "" ? (
            <button onClick={()=>connectWallet()}>{""} <span>Connect Wallet</span></button>
          ) : (
            <button onClick={() => setOpenModel(true)}>
              {""}
              <Image src = {userName ? images.accountName : images.create2}
              alt = "Account image"
              width = {20}
              height = {20}
              />
              {''}
              <small>{userName || "Create Account"}</small>
            </button>
          )}
        </div>
        <div className={Style.Navbar_box_right_open} 
        onClick ={()=>setOpen(true)}
        >
        <Image src = {images.open}
              alt = "open"
              width = {30}
              height = {30}
              />
        </div>
        </div>
    </div>
    {/* MODEL COMPONENT */}
    {openModel &&(
      <div className={Style.modalBox}>
      <Modal
      openBox={setOpenModel}
      title = "WELCOME TO"
      head = "CHAT BUDDY"
      info ='Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate cumque minima in perspiciatis consequuntur dignissimos delectus cupiditate iste eius, porro deleniti aliquam assumenda officia dolores reiciendis! Et voluptates nobis nam.' 
      smallInfo="Kindly select your name .."
      image={images.hero}
      functionName ={createAccount}
      addrress={account}
      />
      </div>
    )}
    {error == "" ? "" : <Error error={error} />}
    </div>
  )
}

export default Navbar