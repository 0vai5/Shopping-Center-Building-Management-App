import react from "react";
import { database, account, client, config, ID } from "../lib/appwrite";
import { Query } from "react-native-appwrite";

const useAppwrite = () => {
  // User
  const loginUser = async (email: string, password: string) => {
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
      if (!currentAccount) throw Error;

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
  const createFlat = async (data: any) => {
    try {
      const { flatNumber, rooms, ownerName, ownerNo } = data;

      if (!flatNumber || !rooms || !ownerName || !ownerNo) {
        throw Error("All Fields are Required!");
      }

      const flat = await database.listDocuments(
        config.database!,
        config.flatsCollection!,
        [Query.equal("flatNumber", [flatNumber])]
      );

      if (flat.total > 0) {
        throw Error("The Flat with the same name Exists");
      }

      const response = await database.createDocument(
        config.database!,
        config.flatsCollection!,
        ID.unique(),
        {
          flatNumber: flatNumber.trim(),
          rooms: parseInt(rooms),
          ownerName: ownerName.trim(),
          ownerNo: ownerNo.trim(),
        }
      );

      if (!response) throw Error("Error Creating Flat");

      const maintenanceSlipObj = {
        flatNumber,
        rooms: parseInt(rooms),
        ownerName,
        ownerNo,
        flatId: response.$id,
      };

      const expenseSlip = await createMaintenanceSlip(maintenanceSlipObj);

      return response;
    } catch (error) {
      console.error(error);
    }
  };
  const getFlats = async () => {
    try {
      const response = await database.listDocuments(
        config.database!,
        config.flatsCollection!
      );

      // TODO: Fix the order by flats

      if (!response) throw Error;

      return response.documents;
    } catch (error) {
      console.error(error);
    }
  };

  // Expenses
  const createExpense = async (data: any) => {
    try {
      const { expense: expenseName, name, amount, variable, thisMonth } = data;

      if (
        !expenseName ||
        !name ||
        thisMonth === undefined ||
        variable === undefined
      ) {
        throw Error("All Fields Are Required");
      }

      const expenseObj: {
        expense: string;
        name: string;
        variable: boolean;
        thisMonth: boolean;
        amount?: number;
      } = {
        expense: expenseName.trim(),
        name: name.trim(),
        variable,
        thisMonth,
      };

      if (amount) {
        expenseObj.amount = parseInt(amount);
      }

      if (thisMonth === true) {
        const expense = await createExpenseSlip(expenseObj);
        return expense;
      }

      const expense = await database.listDocuments(
        config.database!,
        config.expensesCollection!,
        [Query.equal("expense", [expenseName])]
      );

      if (expense.total > 0) {
        throw Error("Expenses with the same name exist");
      }

      const response = await database.createDocument(
        config.database!,
        config.expensesCollection!,
        ID.unique(),
        expenseObj
      );

      const newExpense = await createExpenseSlip({
        ...expenseObj,
        expenseId: response.$id,
      });

      if (!response) {
        throw Error("Error Creating Expense");
      }

      return newExpense;
    } catch (error: any) {
      console.log("error", error.message);
    }
  };
  const getExpenses = async () => {
    try {
      const response = await database.listDocuments(
        config.database!,
        config.expensesCollection!,
        [Query.equal("thisMonth", [false])]
      );

      return response.documents;
    } catch (error: any) {
      console.log("error", error.message);
    }
  };

  // ExpenseSlips
  const createExpenseSlip = async (data: any) => {
    try {
      const month = new Date().toLocaleString("default", { month: "long" });
      const year = new Date().getFullYear();

      const expense = await database.listDocuments(
        config.database!,
        config.expenseSlipsCollection!,
        [
          Query.and([
            Query.equal("expense", [data.expense]),
            Query.equal("month", [`${month} ${year}`]),
          ]),
        ]
      );

      if (expense.total > 0) {
        throw Error("The Expense with this name already exists");
      }

      const expenseSlipObj = {
        ...data,
        status: "pending",
        month: `${month} ${year}`,
      };

      const expenseSlip = await database.createDocument(
        config.database!,
        config.expenseSlipsCollection!,
        ID.unique(),
        expenseSlipObj
      );

      if (!expenseSlip) {
        throw Error("Error Creating Expense");
      }

      return expenseSlip;
    } catch (error: any) {
      console.log(error.message);
    }
  };
  const getExpenseSlips = async () => {
    try {
      const response = await database.listDocuments(
        config.database!,
        config.expenseSlipsCollection!,
        [Query.equal("status", ["pending"])]
      );

      if (!response) {
        throw Error("Error Fetching Slips");
      }

      return response.documents;
    } catch (error: any) {
      console.log(error.message);
    }
  };
  const updateExpenseSlip = async (id: string) => {};

  // MaintenanceSlips
  const createMaintenanceSlip = async (data: any) => {
    try {
      const month = new Date().toLocaleString("default", { month: "long" });
      const year = new Date().getFullYear();

      const slipNoDoc = await database.listDocuments(
        config.database!,
        config.miscCollection!
      );

      const maintenanceSlips = await database.listDocuments(
        config.database!,
        config.maintenanceCollection!,
        [
          Query.and([
            Query.equal("flatNumber", [data.flatNumber]),
            Query.equal("month", [`${month} ${year}`]),
          ]),
        ]
      );

      if (maintenanceSlips.total > 0) {
        throw Error("Maintenance Slip is already generated");
      }

      const newMaintenanceSlipObj = {
        ...data,
        status: "pending",
        maintenance: 300,
        month: `${month} ${year}`,
        slipNo: (1 + +slipNoDoc.documents[0].slipNo).toString(),
      };

      const newMaintenanceSlip = await database.createDocument(
        config.database!,
        config.maintenanceCollection!,
        ID.unique(),
        newMaintenanceSlipObj
      );

      await database.updateDocument(
        config.database!,
        config.miscCollection!,
        "67e6950a003480f071b4",
        {
          slipNo: (1 + +slipNoDoc.documents[0].slipNo).toString(),
        }
      );

      if (!newMaintenanceSlip) {
        throw Error("Error generating Maintenance slip");
      }

      return newMaintenanceSlip;
    } catch (error) {
      console.log(error);
    }
  };
  const getMaintenancesSlips = async () => {
    try {
      const response = await database.listDocuments(
        config.database!,
        config.maintenanceCollection!,
        [Query.equal("status", ["pending"])]
      );

      if (!response) {
        throw Error("Error Fetching Maintenance");
      }

      return response.documents;
    } catch (error) {
      console.log(error);
    }
  };
  const updateMaintenaceSlip = async (id: string) => {};

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
    createMaintenanceSlip,
    getMaintenancesSlips,
    getMonthlyStats,
    updateExpenseSlip,
    updateMaintenaceSlip,
  };
};

export default useAppwrite;
