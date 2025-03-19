import { useState, useEffect, useRef, useContext } from "react";
import { ArrowLeft,  Send } from "lucide-react";
import { userContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import { profileContext } from "../context/profileContext";
import axios from "axios";
import { chatContext } from "../context/chatContext";
const apiUrl = import.meta.env.VITE_API_URL;
const socket = io(apiUrl);
const ChatWindow = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef(null);
 const {user,setUser} = useContext(userContext)
 const {profile} = useContext(profileContext)
 const {chatId} = useContext(chatContext)
 const navigate = useNavigate()
 const fetchMessages = async () => {
  try {
    const response = await axios.get(`${apiUrl}/message/${chatId}`,{
     headers: { Authorization: `${localStorage.getItem("token")}` },
   }); 
   const data = await response.data
    setMessages(data);
  } catch (error) {
    console.error("Error fetching messages:", error);
  }
};
 useEffect(() => {
     fetchMessages();
     console.log('component mount')
 }, [chatId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView();
  }, [messages]);
   
  // Handle message send
  const sendMessage = async() => {
    const messageData = {
      sender: profile?._id,
      receiver: user?._id,
      chatId,
      content: newMessage,
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
    <div className="flex flex-col h-full bg-gray-900 text-white">
      {/* Header */}
      <div className="flex items-center gap-4 p-3 bg-violet-950">
        <button className="md:hidden" onClick={() => navigate('/')}>
          <ArrowLeft className="text-2xl" />
        </button>
        <img src={user?.profilePic} alt="Profile" className="w-10 h-10 rounded-full" />
        <h2 className="text-lg font-semibold">{user.name}</h2>
      </div>
      {/* Messages */}
      <div className="flex-1 overflow-y-auto bg-gradient-to-b from-violet-600 to-blue-800 p-4">
        {messages.map((msg, index) => (
          <div key={index} className={`flex ${msg.sender == profile._id ? "justify-end" : "justify-start"} mb-3`}>
            <div className={`p-3 rounded-lg max-w-xs ${msg.sender === profile._id ? "bg-pink-700" : "bg-blue-500"}`}>
              <p className="text-sm">{msg.content}</p>
              <span className="text-xs text-gray-300">{msg.time}</span>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      {/* Message Input */}
      <div className="p-3 bg-blue-950 flex items-center gap-2">
        <input
          type="text"
          className="flex-1 p-2 rounded-lg bg-blue-900 text-white outline-none"
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
       {newMessage && <button onClick={sendMessage} className="p-2 rounded-full bg-blue-500">
          <Send className="text-xl text-white" />
        </button>}
      </div>
    </div>
  );
};

export default ChatWindow;
