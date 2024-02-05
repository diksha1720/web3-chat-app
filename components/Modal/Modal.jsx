import React, { useState, useContext } from "react";
import Image from "next/image";

import Style from "./Modal.module.css";
import images from "../../assets";
import { ChatAppContext } from "@/Context/ChatAppContext";
import { Loader } from "../index";

const Modal = ({openBox, title, head, info, smallInfo, image, functionName }) => {
    const [name, setName] = useState("");
    const [accountAddress, setAccountAddress] = useState("");

    const { loading , account} = useContext(ChatAppContext);

    return (
        <div className={Style.Modal}>
            <div className={Style.Modal_box}>
                <div className={Style.Modal_box_left}>
                    <Image src={image} alt="buddy" width={700} height={700} />
                </div>
                <div className={Style.Modal_box_right}>
                    <h1>
                        {title}
                        <span>{head}</span>
                    </h1>
                    <p>{info}</p>
                    <small>{smallInfo}</small>
                    {
                        loading == true ? (<Loader/>) : (  <div className={Style.Modal_box_right_name}>
                            <div className={Style.Modal_box_right_name_info}>
                                <Image src={images.username} alt="user" width={30} height={30} />
                                <input type="text" placeholder="your name" onChange={(e) => setName(e.target.value)} />
                            </div>
                            <div className={Style.Modal_box_right_name_info}>
                                <Image src={images.account} alt="user" width={30} height={30} />
                                <input type="text" placeholder={account || "Enter address.."} value={account} onChange={(e) => setAccountAddress(e.target.value)} />
                            </div>
                            <div className={Style.Modal_box_right_name_btn}>
                              <button onClick={()=> functionName({name , accountAddress})}>
                                {""}
                                <Image src={images.send} alt="send" width={30} height={30}/>
                                {""}
                                Submit
                              </button>
    
                              <button onClick={()=> openBox(false)}>
                                {""}
                                <Image src={images.close} alt="send" width={30} height={30}/>
                                {""}
                                Cancel
                              </button>
                            </div>
                        </div>)
                    }
                  
                </div>
            </div>
        </div>
    );
};

export default Modal;
