import { LogOut, Settings, User } from "lucide-react";
import { useState } from "react";

const Sidebar = () => {
  const [user] = useState({
    name: "John Doe",
    profilePic: null,
  });

  return (
    <div className="h-full w-full flex flex-col items-center bg-gradient-to-b from-violet-900 to-blue-900 text-white p-4">
      {/* User Profile */}
      <div className="flex flex-col items-center">
        <img
          src={user.profilePic}
          alt="Profile"
          className="w-16 h-16 rounded-full border-2 border-gray-400"
        />
        <h2 className="mt-2 text-lg font-semibold">{user.name}</h2>
      </div>

      {/* Menu Options */}
      <div className="mt-6 w-full">
        <button className="w-full flex items-center gap-3 p-3 hover:bg-violet-800  rounded-md">
          <User className="text-xl" />
          Profile
        </button>

        <button className="w-full flex items-center gap-3 p-3 hover:bg-violet-800 rounded-md mt-auto">
          <LogOut className="text-xl" />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
