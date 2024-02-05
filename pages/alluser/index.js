import React, {useState, useEffect, useContext} from 'react'

import { UserCard } from '@/components/index'
import Style from './alluser.module.css'
import { ChatAppContext } from '../../Context/ChatAppContext'

const allUsers = () => {

    const {userLists, addFriends} = useContext(ChatAppContext)


  return (
    <div>
        <div className={Style.alluser_info}>
            <h1>Find Yor Friends</h1>

        </div>
        <div className={Style.alluser}>
            {/* {userLists.map((el, i)=>(
                <UserCard key={i+1} el ={el} i={i} addFriends={addFriends}/>
            ))} */}
        </div>
    </div>
  )
}

export default allUsers