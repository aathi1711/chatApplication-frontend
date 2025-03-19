import { useContext, useState } from "react";
import axios from "axios";
import { Search, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { userContext } from "../context/userContext";

const SearchFriends = ({ onStartChat, onClose }) => {
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()
  const {setUser}= useContext(userContext)
  const apiUrl = import.meta.env.VITE_API_URL;
  const handleSearch = async () => {
    if (!query.trim()) return;
    setLoading(true);
    try {
      const { data } = await axios.get(`${apiUrl}/search?query=${query}`, {
        headers: { Authorization: `${localStorage.getItem("token")}` },
      });
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
    setLoading(false);
  };
  const chatNavigate = (user)=>{
    if(window.innerWidth<=768){
      setUser(user)
      navigate('/chatWindow')
    }else{
      setUser(user)
    }
  }
  return (
    <div className="w-full h-full ">
      {/* Header */}
      <div className="flex items-center gap-3 p-4 bg-violet-800 text-white">
        <button onClick={()=>navigate('/')}>
          <ArrowLeft size={24} />
        </button>
        <h2 className="text-lg font-semibold">Chat App</h2>
      </div>

      {/* Search Bar */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Search friends..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full p-2 text-gray-200 border-gray-500 border bg-violet-900 rounded focus:outline-none"
          />
          <button
            onClick={handleSearch}
            disabled={loading}
            className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400"
          >
            <Search size={18} />
          </button>
        </div>
      </div>

      {/* Search Results */}
      <div className="max-h-60 overflow-y-auto p-4">
        {users.length === 0 && query && !loading && (
          <p className="text-center text-gray-500">No users found</p>
        )}
        {users.map((user) => (
          <div
            key={user._id}
            className="flex items-center gap-3 p-2 hover:bg-violet-800 rounded cursor-pointer"
            onClick={()=>chatNavigate(user)}
          >
            <img
              src={user.profilePic || "/default-avatar.png"}
              alt={user.name}
              className="w-10 h-10 rounded-full"
            />
            <p className="text-gray-200 font-semibold" >{user.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchFriends;
