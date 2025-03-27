import { GlobalContextProviderProps, GlobalContextType } from "@/types";
import React, { createContext, useEffect, useState, useContext } from "react";

export const GlobalContext = createContext<GlobalContextType | null>(null);

export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("useGlobalContext must be used within a GlobalProvider");
  }
  return context;
};

// TODO: Fix the types after appwrite integration

const GlobalProvider: React.FC<GlobalContextProviderProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [user, setUser] = useState<any>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

//   TODO: The user will be updated after calling getCurrentUser() method from appwrite hook

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      const mockUser = {
        id: 1,
        name: "John Doe",
      };
      setUser(mockUser);
      setIsLoggedIn(true);
      setIsLoading(false);
    }, 1000);
  }, []);

  return (
    <GlobalContext.Provider
      value={{ isLoading, setIsLoading, user, setUser, isLoggedIn, setIsLoggedIn }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;