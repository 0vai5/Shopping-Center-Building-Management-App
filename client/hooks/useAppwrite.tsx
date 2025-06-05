import React from "react";
import { ID, account, client, config, databases } from "../lib/appwrite";
import { useGlobalContext } from "@/context/GlobalContext";
import { Query } from "react-native-appwrite";

const useAppwrite = () => {
  const loginUser = async (email: string, password: string) => {
    try {
      const response = await account.createEmailPasswordSession(
        email,
        password
      );

      console.log("Login successful:", response);

      return response;
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  const getCurrentUser = async () => {
    try {
      const user = await account.get();

      console.log("Current user:", user);

      return user;
    } catch (error) {
      console.error("Failed to get current user:", error);
      throw error;
    }
  };

  const logoutUser = async () => {
    try {
      const response = await account.deleteSession("current");

      console.log("Logout successful:", response);
      return response;
    } catch (error) {
      console.error("Logout failed:", error);
      throw error;
    }
  };

  const getExpenses = async () => {
    try {
      const response = await databases.listDocuments(
        config.databaseId!,
        config.expenseCollectionID!,
        [Query.equal("thisMonth", false)]
      );

      return response.documents;
    } catch (error: any) {
      console.error("Error fetching expenses:", error.message);
      throw new Error(error.message || "Failed to fetch expenses");
    }
  };

  return {
    loginUser,
    getCurrentUser,
    logoutUser,
    getExpenses
  };
};

export default useAppwrite;
