import { useContext, useEffect, useState } from "react";
import { CheckCheck, Plus, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { profileContext } from "../context/profileContext";
import axios from "axios";
import { chatContext } from "../context/chatContext";
import { userContext } from "../context/userContext";

const ChatList = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate()
  const apiUrl = import.meta.env.VITE_API_URL;
  const [chats,setChats] = useState([])

  const {setChatId} = useContext(chatContext)
  const {setUser} = useContext(userContext)
  const {profile, setProfile} = useContext(profileContext)
  const fetchChats= async()=>{
    try {
      const response = await axios.get(`${apiUrl}/chats`, {
        headers: { Authorization: `${localStorage.getItem("token")}` },
      });
      const data = await response.data
      setChats(data)
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  }
  useEffect(()=>{
      fetchChats()
  },[])
  const filteredChats = chats.filter((chat) =>
    chat.oppositeUser.name.toLowerCase().includes(search.toLowerCase())
  );
  const fetchUserProfile= async()=>{
    try {
      const { data } = await axios.get(`${apiUrl}/profile`, {
        headers: { Authorization: `${localStorage.getItem("token")}` },
      });
      setProfile(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  }
  useEffect(()=>{
      fetchUserProfile()
  },[])
  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true, 
    });
  };
  const chatNavigate = (chatId,oppositeUser)=>{
    if(window.innerWidth<=768){
      setChatId(chatId)
      setUser(oppositeUser)
      navigate('/chatWindow')
    }else{
      setUser(oppositeUser)
      setChatId(chatId)
    }
  }
  return (
    <div className=" w-full text-white flex flex-col h-screen p-4">
      {/* 📌 Chat List Header */}
      <div className="flex items-center justify-between pb-4 border-b border-gray-700">
        <h1 className="text-xl font-bold">Chat App</h1>

        {/* 🖼️ Profile Image (Visible Only in Mobile View) */}
        <img
          src={profile ? profile.profilePic :'/profile.img'}
          alt="Profile"
          className="w-10 h-10 rounded-full object-cover cursor-pointer"
          onClick={()=>navigate('/profile')}
        />
      </div>

      {/* 🔍 Search Bar */}
      <div className="flex items-center bg-violet-900 px-3 py-2 rounded mt-4">
        <Search size={20} className="text-gray-400" />
        <input
          type="text"
          placeholder="Search chats..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="ml-2 bg-transparent outline-none text-white flex-1"
        />
      </div>

      {/* 📜 Chat List */}
      <div className="mt-4 flex-1 overflow-y-auto">
        {filteredChats.length > 0 ? (
          filteredChats.map((chat) => (
            <div
              key={chat._id}
              className="py-3 border-b border-gray-700 cursor-pointer rounded"
              onClick={()=>chatNavigate(chat._id,chat.oppositeUser)}
            >
              <div className="flex justify-between">
              <div className="flex gap-5">
                <img src={chat.oppositeUser.profilePic} className="w-10 h-10 rounded-full object-cover"/>
                <div>
                <h3 className="font-semibold">{chat.oppositeUser.name}</h3>
                <div className="flex gap-2 items-center">
                 {profile?._id == chat.lastMessage.sender && <CheckCheck size={20} className="opacity-70"/>}
                <p className=" text-gray-400">{chat.lastMessage.content}</p>
                </div>
                
                </div>
              </div>
              <div className="flex flex-col items-end gap-1">
                  <p className="text-sm">{formatTime(chat.lastMessage.createdAt)}</p>
                  {profile?._id == chat.lastMessage.receiver && !chat.lastMessage.isRead && <p className="text-sm rounded-md bg-sky-500 w-fit px-1">new</p>}
              </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center mt-4">No chats found</p>
        )}
      </div>
      <button
      onClick={()=>navigate('/search-friends')}
      className="fixed bottom-10  duration-200 right-5 md:bottom-8 md:left-8 w-fit bg-blue-500 hover:bg-blue-600 text-white p-4 rounded-full shadow-lg transition-all"
    >
      <Plus size={24} />
    </button>
    </div>
  );
};

export default ChatList;
