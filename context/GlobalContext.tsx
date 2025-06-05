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

const GlobalProvider: React.FC<GlobalContextProviderProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [user, setUser] = useState<any>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [statusUpdate, setStatusUpdate] = useState<boolean>(false);
  const { getCurrentUser } = useAppwrite();

  useEffect(() => {
    const checkAuthStatus = async () => {
      setIsLoading(true);
      try {
        const response = await getCurrentUser().then((res) => res);

        if (response) {
          setUser(response);
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
          setUser(null);
        }
      } catch (error) {
        console.error("Auth check error:", error);
        setIsLoggedIn(false);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthStatus();
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
