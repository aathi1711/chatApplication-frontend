import { createContext, useEffect, useState } from "react";

// Create Context
const profileContext = createContext();

// Provider Component
export const ProfileProvider = ({ children }) => {
  const [profile, setProfile] = useState(JSON.parse(localStorage.getItem("profile")) || null);
    useEffect(() => {
      if (profile) {
          localStorage.setItem("profile", JSON.stringify(profile));
      } else {
          localStorage.removeItem("profile"); // Clear if null
      }
  }, [profile]);
  return (
    <profileContext.Provider value={{ profile,setProfile }}>
      {children}
    </profileContext.Provider>
  );
};
export {profileContext}