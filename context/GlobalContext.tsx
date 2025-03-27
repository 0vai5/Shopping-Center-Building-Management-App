import { GlobalContextProviderProps, GlobalContextType } from "@/types";
import React, { useState, useContext, createContext, useEffect } from "react";

const GlobalContext = createContext<GlobalContextType | null>(null);

export const useGlobalContext = () => {
    return useContext(GlobalContext);
}

const GlobalContextProvider: React.FC<GlobalContextProviderProps> = ({children}) => {

    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState<{ id: number; name: string } | null>(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // TODO: Implementing getCurrentUser() method and update with actual states


    useEffect(() => {
        setTimeout(() => {
            const mockUser = { id: 1, name: "John Doe" }; 
            setUser(mockUser);
            setIsLoggedIn(!!mockUser);
            setIsLoading(false);
        }, 1000); 
    }, []);

    return (
        <GlobalContext.Provider value={{
            isLoading,
            setIsLoading,
            user,
            setUser,
            isLoggedIn,
            setIsLoggedIn
        }}>
            {children}
        </GlobalContext.Provider>
    )
}

export default GlobalContextProvider;