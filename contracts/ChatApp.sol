
//SPDX-License-Identifier : UNLICENSED

pragma solidity >= 0.7.0 <0.9.0;

contract ChatApp {
   
   struct User {
    string name;
    Friend[] friendsList;
   }

   struct Friend{
    address userAddress;
    string name ;
   }

   struct Message {
        address sender;
        uint256 timestamp; 
        string message;
   }

   struct AllUserStruct{
    string name;
    address accountAddress;
   }

   AllUserStruct[] allUsers;

   mapping(address =>   User) allUsersList;
   mapping(bytes32 => Message[]) allMessages;

    function chechUserExists(address _userAddress) public view returns(bool){
        return bytes(allUsersList[_userAddress].name).length > 0;
    }

    function createAccount(string calldata _name) external{
        require(chechUserExists(msg.sender) == false, "User Already Exists");
        require(bytes(_name).length>0 , "Username can't be empty");

        allUsersList[msg.sender].name = _name;
        allUsers.push(AllUserStruct(_name ,msg.sender));
    }


    function getUserName(address _userAddress) external view returns(string memory){
        require(chechUserExists(_userAddress), "User is not registered");
        return allUsersList[_userAddress].name;
    }

    function _checkUserAlreadyFriends(address _userAddress, address _friendAddress) internal view returns(bool){
        if(allUsersList[_userAddress].friendsList.length > allUsersList[_friendAddress].friendsList.length){
            address _temp = _userAddress;
            _userAddress = _friendAddress;
            _friendAddress = _temp;
        }
        for(uint256 i=0;i< allUsersList[_userAddress].friendsList.length ; i++){
            if(allUsersList[_userAddress].friendsList[i].userAddress == _friendAddress) return true;
        }
        return false;
    }

    function _addFriend(address _userAddress , address _friendAddress , string memory _name ) internal {
        Friend memory _newFriend = Friend(_friendAddress , _name);
        allUsersList[_userAddress].friendsList.push(_newFriend);
    }

    function addFriend(address _friendAddress , string calldata _friendName) external {
        require(chechUserExists(msg.sender), "Create an account first");
        require(chechUserExists(_friendAddress), "User not registered");
        require(msg.sender != _friendAddress ,  "User can't add themselves as friends");
        require(_checkUserAlreadyFriends(msg.sender, _friendAddress) == false ,"User already a friend");

        _addFriend(msg.sender, _friendAddress , _friendName);
        _addFriend( _friendAddress , msg.sender, _friendName);

    }

    function sendMessage(address _friendAddress  , string calldata _msg) external{
        require(chechUserExists(msg.sender), "Create an account first");
        require(chechUserExists(_friendAddress), "User not registered");
        require(_checkUserAlreadyFriends(msg.sender, _friendAddress), "You are not friends with the user");

        bytes32 _chatCode = _getChatCode(msg.sender , _friendAddress);
        Message memory _newMsg = Message(msg.sender ,  block.timestamp , _msg);
        allMessages[_chatCode].push(_newMsg);
    }

    function getMyFriendsList() external view returns(Friend[] memory){
        return allUsersList[msg.sender].friendsList;
    }

    function readMessage(address _friendAddress) external view returns(Message[] memory){
        bytes32 _chatCode = _getChatCode(msg.sender, _friendAddress);
        return allMessages[_chatCode];
    }

    function _getChatCode(address _userAddress1 , address _userAddress2) internal pure returns(bytes32){
        if(_userAddress1 < _userAddress2){
            return keccak256(abi.encodePacked(_userAddress1, _userAddress2));
        }
        return keccak256(abi.encodePacked(_userAddress2, _userAddress1));
    }

    function getAllAppUsers() public view returns(AllUserStruct[] memory){
        return allUsers;
    }

}