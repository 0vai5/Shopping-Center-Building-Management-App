import React from "react";
import { ID, account, client, config, databases } from "../lib/appwrite";
import { useGlobalContext } from "@/context/GlobalContext";
import { Query } from "react-native-appwrite";
import { expense, flat } from "@/types";
import getMonth from "../utils/getMonth";

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

  const createExpense = async (expense: any) => {
    try {
      const expenseObj: expense = {
        thisMonth: expense.thisMonth,
        variable: expense.variable,
        payee: expense.payee,
        expenseName: expense.expenseName,
      };

      if (expense.amount) {
        expenseObj.amount = parseInt(expense.amount);
      }

      const response = await databases.createDocument(
        config.databaseId!,
        config.expenseCollectionID!,
        ID.unique(),
        expense
      );

      console.log("Expense created successfully:", response);

      const expenseSlipCreation = await databases.createDocument(
        config.databaseId!,
        config.expenseSlipCollectionID!,
        ID.unique(),
        {
          expense: response.$id,
          month: getMonth("current"),
          status: "pending",
        }
      );

      return {
        expenseSlip: expenseSlipCreation,
        expense: response,
        message: "Expense created successfully",
      };
    } catch (error: any) {
      console.error("Error creating expense:", error.message);
      throw new Error(error.message || "Failed to create expense");
    }
  };

  const getFlats = async () => {
    try {
      const response = await databases.listDocuments(
        config.databaseId!,
        config.flatsCollectionID!
      );

      return response.documents;
    } catch (error: any) {
      console.error("Error fetching flats:", error.message);
      throw new Error(error.message || "Failed to fetch flats");
    }
  };

  const createFlat = async (flat: any) => {
    try {
      if (!flat.flatNumber || !flat.ownerName || !flat.rooms) {
        throw new Error("All Fields are required");
      }

      const flatObj: flat = {
        flatNumber: flat.flatNumber,
        ownerName: flat.ownerName,
        maintenance: Number(flat.rooms) * 400,
        rooms: flat.rooms,
      };

      if (flat.ownerPhone) {
        flatObj.ownerPhone = flat.ownerPhone;
      }

      const response = await databases.createDocument(
        config.databaseId!,
        config.flatsCollectionID!,
        ID.unique(),
        flatObj
      );

      console.log("Flat created successfully:", response);

      const maintenanceSlipData = {
        month: getMonth("current"),
        flat: response.$id,
        status: "pending",
      };

      const maintenanceSlip = await databases.createDocument(
        config.databaseId!,
        config.maintenanceID!,
        ID.unique(),
        maintenanceSlipData
      );

      console.log("Maintenance slip created successfully:", maintenanceSlip);

      return {
        flat: response,
        maintenanceSlip: maintenanceSlip,
        message: "Flat created successfully",
      };
    } catch (error: any) {
      console.error("Error creating flat:", error.message);
      throw new Error(error.message || "Failed to create flat");
    }
  };

  return {
    loginUser,
    getCurrentUser,
    logoutUser,
    getExpenses,
    createExpense,
    getFlats,
    createFlat
  };
};

export default useAppwrite;
