import ChatWindow from "./chatWindow";
import { Outlet } from "react-router-dom";

const Home = () => {
    return (
    <div className="flex h-screen">
        <div className="md:w-2/4 w-full bg-violet-600 ">
           <Outlet/>
      </div>
      {/* Chat Window (Shows only when chat is selected) */}
      <div className={` w-full hidden md:block `}>
        <ChatWindow/>
      </div>  
    </div>
  );
};

export default Home;
