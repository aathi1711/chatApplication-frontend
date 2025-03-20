import { createContext, useEffect, useState } from "react";

// Create Context
const userContext = createContext();

// Provider Component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState( null);
  return (
    <userContext.Provider value={{ user,setUser }}>
      {children}
    </userContext.Provider>
  );
};

export {userContext}