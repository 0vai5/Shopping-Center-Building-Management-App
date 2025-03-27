import react from "react";
import { database, account, client, config } from "../lib/appwrite";
import { Query } from "react-native-appwrite";

const useAppwrite = () => {
  // User
  const loginUser = async (
    email: string,
    password: string
  ) => {
    try {
      const response = await account.createEmailPasswordSession(
        email,
        password
      );
      return response;
    } catch (error) {
      console.error(error);
    }
  };
  const logoutUser = async () => {
    try {
      const response = await account.deleteSession("current");
      return response;
    } catch (error) {
      console.log(error);
    }
  };
  const getCurrentUser = async () => {
    try {
        const currentAccount = await account.get();
        if(!currentAccount) throw Error;

        const currentUser = await database.listDocuments(
            config.database!,
            config.usersCollection!,
            [Query.equal("accountId", currentAccount.$id)]
        );

        if (!currentUser) throw Error;

        return currentUser.documents[0];
    } catch (error) {
        console.error(error);
    }
  };

  // Flats
  const createFlat = async (data: any) => {};
  const getFlats = async () => {};

  // Expenses
  const createExpense = async (data: any) => {};
  const getExpenses = async () => {};

  // ExpenseSlips
  const createExpenseSlip = async (data: any) => {};
  const getExpenseSlips = async () => {};

  // MaintenanceSlips
  const createMaintenanceSlips = async (data: any) => {};
  const getMaintenancesSlips = async () => {};

  // Stats
  const getMonthlyStats = async () => {};

  // Summary

  return {
    loginUser,
    logoutUser,
    getCurrentUser,
    createFlat,
    getFlats,
    createExpense,
    getExpenses,
    createExpenseSlip,
    getExpenseSlips,
    createMaintenanceSlips,
    getMaintenancesSlips,
    getMonthlyStats,
  };
};

export default useAppwrite;
