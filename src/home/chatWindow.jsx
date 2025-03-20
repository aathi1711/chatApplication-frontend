import { useState, useEffect, useRef, useContext } from "react";
import { ArrowLeft,  Send } from "lucide-react";
import { userContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import { profileContext } from "../context/profileContext";
import axios from "axios";
import { chatContext } from "../context/chatContext";
const apiUrl = import.meta.env.VITE_API_URL;
const socket = io(apiUrl,{withCredentials:true});
const ChatWindow = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading,setLoading] = useState(false)
  const messagesEndRef = useRef(null);
  const {user,setUser} = useContext(userContext)
  const currentTime = new Date().toISOString();
  const {profile} = useContext(profileContext)
  const {chatId} = useContext(chatContext)
  const navigate = useNavigate()
  const fetchMessages = async () => {
  setLoading(true)
  try {
    const response = await axios.get(`${apiUrl}/message/${chatId}`,{
     headers: { Authorization: `${localStorage.getItem("token")}` },
   }); 
   const data = await response.data
    setMessages(data);
  } catch (error) {
    console.error("Error fetching messages:", error);
  }finally{
    setLoading(false)
  }
};
 useEffect(() => {
  if(user){
    console.log('component mount')
    fetchMessages();
  }
 }, [user]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView();
  }, [messages]);
  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true, 
    });
  };
  // Handle message send
  const sendMessage = async() => {
    const messageData = {
      sender: profile?._id,
      receiver: user?._id,
      chatId,
      content: newMessage,
      createdAt:currentTime
    };

    socket.emit("sendMessage", messageData);
    setMessages((prev) => [...prev, messageData]);
    setNewMessage("");
    try {
      await  axios.post(`${apiUrl}/send`,messageData, {
        headers: { Authorization: `${localStorage.getItem("token")}` },
      })
    } catch (error) {
      console.log('error occured',error)
    }
  };
  useEffect(() => { 
     socket.on("receiveMessage", (newMessage) => {
       if (newMessage.chatId == chatId) {
         setMessages((prev) => [...prev, newMessage]);
       }
     });
    
   }, [socket]);

  if (!user) return <div className="hidden md:flex w-full flex-col items-center justify-center h-screen bg-gradient-to-b from-violet-600 to-blue-800 p-4">
    <img src="https://cdn-icons-png.flaticon.com/128/3845/3845696.png"/>
     <h1 className="text-4xl text-white font-bold">Start chat with your Friends</h1>
  </div>;

  return (
    <div className="flex flex-col h-full  text-white">
      {/* Header */}
      <div className="flex items-center gap-4 p-3  bg-violet-500 ">
        <button className="md:hidden" onClick={() => navigate('/')}>
          <ArrowLeft className="text-2xl" />
        </button>
        <img src={user?.profilePic} alt="Profile" className="w-10 h-10 rounded-full" />
        <h2 className="text-lg font-semibold text-white font-kanit">{user.name}</h2>
      </div>
      {/* Messages */}
      <div className="flex-1 overflow-y-auto bg-gray-200 font-poppins p-4">
        {loading && <div className=" flex justify-center text-blue-500 font-semibold  w-full">
          <p className="bg-white rounded p-1 w-fit italic">Loading...</p></div>}
        {messages.map((msg, index) => (
          <div key={index} className={`flex ${msg.sender == profile._id ? "justify-end" : "justify-start"}  mb-3`}>
            <div className={`p-3 rounded-lg max-w-xs ${msg.sender === profile._id ? "bg-white text-black" : "bg-violet-400"}`}>
              <p className="text-sm">{msg.content}</p>
              <span className="text-xs text-gray-300">{formatTime(msg.createdAt)}</span>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      {/* Message Input */}
      <div className="p-3 bg-gray-200 flex items-center font-poppins gap-2">
        <input
          type="text"
          className="flex-1 p-2 rounded-lg bg-gray-300 text-black outline-none"
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
       {newMessage && <button onClick={sendMessage} className="p-2 rounded-full bg-violet-500">
          <Send className="text-xl text-white" />
        </button>}
      </div>
    </div>
  );
};

export default ChatWindow;
