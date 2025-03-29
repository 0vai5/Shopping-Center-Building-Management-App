import useAppwrite from "@/hooks/useAppwrite";
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
  const [statusUpdate, setStatusUpdate] = useState<boolean>(false);
  const { getCurrentUser } = useAppwrite();

  //   TODO: The user will be updated after calling getCurrentUser() method from appwrite hook

  useEffect(() => {
    setIsLoading(true);
    const response = getCurrentUser()
      .then((res) => {
        if (res) {
          setIsLoggedIn(true);
          setUser(res);
        } else {
          setIsLoggedIn(false);
          setUser(null);
        }
      })
      .catch((error) => {
        console.error(error);
      });

    setIsLoading(false);
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        isLoading,
        setIsLoading,
        user,
        setUser,
        isLoggedIn,
        setIsLoggedIn,
        statusUpdate,
        setStatusUpdate,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
