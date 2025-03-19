import { createContext, useEffect, useState } from "react";

// Create Context
const userContext = createContext();

// Provider Component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState( null);
   useEffect(() => {
     if (user) {
         localStorage.setItem("user", JSON.stringify(user));
     } else {
         localStorage.removeItem("user"); // Clear if null
     }
 }, [user]);
  return (
    <userContext.Provider value={{ user,setUser }}>
      {children}
    </userContext.Provider>
  );
};

export {userContext}