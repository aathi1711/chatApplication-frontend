import { useContext} from "react";
import axios from "axios";
import { LogOut, ArrowLeft, Camera } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { profileContext } from "../context/profileContext";
import UpdateTriggerContext from "../context/updateTrigger";

const Profile = () => {
  const {profile} = useContext(profileContext)
  const navigate = useNavigate()
  const apiUrl = import.meta.env.VITE_API_URL;
  const {updateTrigger,setUpdateTrigger} = useContext(UpdateTriggerContext)
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    try {
       await axios.post(`${apiUrl}/set-profile`, formData, {
        headers: { Authorization: `${localStorage.getItem("token")}` },
      });
      setUpdateTrigger(updateTrigger+1)
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };
  const logout = ()=>{
    localStorage.removeItem('token')
    navigate('/login')
  }
  return (
    <div className="w-full h-full font-poppins p-6">
      {/* Header */}
      <div className="flex items-center text-white gap-3 mb-6">
        <button onClick={()=>navigate('/')}>
          <ArrowLeft size={24} />
        </button>
        <h2 className="text-lg font-semibold">Profile</h2>
      </div>

      {/* Profile Picture */}
      <div className="relative w-24 h-24 mx-auto mb-4">
        <img src={profile.profilePic ? profile.profilePic : 'https://cdn-icons-png.flaticon.com/128/847/847969.png' } alt="Profile" className="w-full h-full object-cover rounded-full border" />
        <label className="absolute bottom-1 right-1 bg-blue-600 text-white p-1 rounded-full cursor-pointer">
          <Camera size={16} />
          <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
        </label>
      </div>
      {/* User Details */}
      <div className="text-center">
        <p className="text-gray-100 text-2xl font-kanit mb-2">{profile?.name}</p>
        <p className="text-gray-200">{profile?.email}</p>
      </div>

      {/* Logout Button */}
      <button
        onClick={logout}
        className="mt-6 w-full p-3 bg-violet-800 text-white rounded hover:bg-violet-900 flex items-center justify-center gap-2"
      >
        <LogOut size={18} /> Logout
      </button>
    </div>
  );
};

export default Profile;
