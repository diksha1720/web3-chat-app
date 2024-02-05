import React , {useState, useEffect} from 'react'
import { useRouter } from 'next/navigation';

import {checkIfWalletConnected , connectWallet  , connectingWithContract } from '../utils/apiFeature'

export const ChatAppContext = React.createContext("");

export const ChatAppProvider = ({children}) =>{
    const title = "hey welcome to blockchain chat app"
    const [account , setAccount] = useState("");
    const [userName , setUserName] = useState("");
    const [friendsList , setFriendsList] = useState([]);
    const [friendMsg , setFriendMsg] = useState([]);
    const [loading , setLoading] = useState(false);
    const [userLists , setUserLists] = useState([]);
    const [error , setError] = useState("");

    const [currentUserName , setCurrentUserName] = useState("")
    const [currentUserAddress , setCurrentUserAddress] = useState("")

    const router = useRouter();

    const fetchData = async()=>{
        try{
            const contract = await connectingWithContract();
            const connectAccount = await connectWallet();
            setAccount(connectAccount)
            console.log("connectAccount", connectAccount)
            const userName = await contract.getUserName(connectAccount)
            setUserName(userName)
            const friendList = await contract.getMyFriendsList()
            setFriendsList(friendList)
            let userList = await contract.getAllAppUsers()
            console.log("userList", userList[0].accountAddress)
            console.log("userList", userList[0].name)
            setUserLists(userList)

        }
        catch(error){
            console.log("Please install and connect your wallet")
            setError("Please install and connect your wallet")
        }
    }

    useEffect(() =>{
        fetchData()
    } , [])

    const readMessage = async(friendAddress) =>{
        try{
            const contract = await connectingWithContract();
            const read = await await contract.readMessage(friendAddress);
            setFriendMsg(read)
        }
        catch(err){
            console.log("Currently you have no message!!!")
            setError("Currently you have no message!!!")
        }
    }

    const createAccount  = async({name , accountAddress}) =>{
        try{
            // if(name || accountAddress) {
            //     console.log("Name and AccountAddress, cannot be empty")
                // return setError("Name and AccountAddress, cannot be empty");}
            const contract = await connectingWithContract()
            const getCreatedUser = await contract.createAccount(name)
            setLoading(true)
            await getCreatedUser.wait()
            setLoading(false)
            window.location.reload()
        }
        catch(error){
            console.log("Error while creating your account. Please reload browser")

            setError("Error while creating your account. Please reload browser ")
        }
    }

    const addFriends = async()=>{
        try{
            if(name || accountAddress) {
                console.log("Please provide data")
                return setError("Please provide data")
            }
            const contract =await connectingWithContract();
            const addMyFriend = await contract.addFriend(accountAddress, name);
            setLoading(true)
            await addMyFriend.wait();
            setLoading(false)
            router.push("/");
            window.location.reload();
        }
        catch(err){
            console.log("Something went wrong while adding friends, try again later")
            setError("Something went wrong while adding friends, try again later")
        }
    }

    const sendMessage = async({msg, address})=>{
        try{
            const contract = await connectingWithContract();
            const addMessage = await contract.sendMessage(address , msg);
            setLoading(true)
            await addMessage.wait();
            setLoading(false)
            window.location.reload();
        }
        catch(err){
            console.log("Please reload and try again")
            setError("Please reload and try again")
        }
    }

    const readUser = async(userAddress) =>{
        const contract = await connectingWithContract();
        const userName = await contract.getUserName(userAddress);
        setCurrentUserName(userName)
        setCurrentUserAddress(userAddress)

    }

    return (
        <ChatAppContext.Provider value = {
             {readMessage , 
             createAccount , 
             addFriends ,
              sendMessage , 
              readUser , 
              connectWallet,
              checkIfWalletConnected,
              account ,
              userName, 
              friendsList, 
              friendMsg, 
              loading,
              userLists, 
              error, 
              currentUserName,
              currentUserAddress
              } }>
            {children}
        </ChatAppContext.Provider>
    )
}
 
