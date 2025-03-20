import { createContext, useEffect, useState } from "react";

// Create Context
const chatContext = createContext();

// Provider Component
export const ChatIdProvider = ({ children }) => {
  const [chatId, setChatId] = useState(null);
 
  return (
    <chatContext.Provider value={{ chatId,setChatId }}>
      {children}
    </chatContext.Provider>
  );
};
export {chatContext}