import { useState, createContext } from 'react';

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(null); // stores user details
  const [chatHistory, setChatHistory] = useState([]); // stores past chats

  return (
    <UserContext.Provider value={{ userInfo, setUserInfo, chatHistory, setChatHistory }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
