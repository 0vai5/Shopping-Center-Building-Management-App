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


      return response;
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  const getCurrentUser = async () => {
    try {
      const user = await account.get();


      return user;
    } catch (error) {
      console.error("Failed to get current user:", error);
      throw error;
    }
  };

  const logoutUser = async () => {
    try {
      const response = await account.deleteSession("current");

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
        expenseObj.amount = Number(expense.amount);
      }

      const response = await databases.createDocument(
        config.databaseId!,
        config.expenseCollectionID!,
        ID.unique(),
        expense
      );


      const expenseSlipCreation = await databases.createDocument(
        config.databaseId!,
        config.expenseSlipCollectionID!,
        ID.unique(),
        {
          expense: response.$id,
          month: getMonth("current"),
          status: "pending",
          amount: expense.amount || null,
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
        rooms: Number(flat.rooms),
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


      const slipNumber = await databases.getDocument(
        config.databaseId!,
        config.miscID!,
        "1"
      );

      const slipNumberUpdated = await databases.updateDocument(
        config.databaseId!,
        config.miscID!,
        "1",
        {
          slipNumber: slipNumber.slipNumber + 1,
        }
      );

      const maintenanceSlipData = {
        month: getMonth("current"),
        flat: response.$id,
        status: "pending",
        slipNumber: slipNumber.slipNumber,
      };

      const maintenanceSlip = await databases.createDocument(
        config.databaseId!,
        config.maintenanceID!,
        ID.unique(),
        maintenanceSlipData
      );


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

  const getExpenseSlips = async () => {
    try {
      const response = await databases.listDocuments(
        config.databaseId!,
        config.expenseSlipCollectionID!,
        [Query.equal("month", getMonth("current"))]
      );

      return response.documents;
    } catch (error: any) {
      console.error("Error fetching expense slips:", error.message);
      throw new Error(error.message || "Failed to fetch expense slips");
    }
  };

  const getMaintenanceSlips = async () => {
    try {
      const response = await databases.listDocuments(
        config.databaseId!,
        config.maintenanceID!,
        [Query.equal("month", getMonth("current"))]
      );

      return response.documents;
    } catch (error: any) {
      console.error("Error fetching maintenance slips:", error.message);
      throw new Error(error.message || "Failed to fetch maintenance slips");
    }
  };

  const updateMaintenanceSlip = async (slipId: string, status: string) => {
    try {
      const response = await databases.updateDocument(
        config.databaseId!,
        config.maintenanceID!,
        slipId,
        { status }
      );


      return response;
    } catch (error: any) {
      console.error("Error updating maintenance slip:", error.message);
      throw new Error(error.message || "Failed to update maintenance slip");
    }
  }

  const updateExpenseSlip = async (slipId: string, status: string, amount?: number) => {
    try {
      const updateData: any = { status };
      if (amount !== undefined) {
        updateData.amount = Number(amount);
      }

      const response = await databases.updateDocument(
        config.databaseId!,
        config.expenseSlipCollectionID!,
        slipId,
        updateData
      );


      return response;
    } catch (error: any) {
      console.error("Error updating expense slip:", error.message);
      throw new Error(error.message || "Failed to update expense slip");
    }
  }

  const generateExpenseSlips = async () => {
    try {
      const expenses = await getExpenses();
      const currentMonth = getMonth("current");

      if (!expenses || expenses.length === 0) {
        throw new Error("No expenses found to generate slips for the current month");
        return;
      }

      for (const expense of expenses) {
        // Check if an expense slip already exists for this expense and current month
        const existingSlips = await databases.listDocuments(
          config.databaseId!,
          config.expenseSlipCollectionID!,
          [
            Query.equal("expense", expense.$id),
            Query.equal("month", currentMonth),
          ]
        );

        if (existingSlips.total > 0) {
          continue;
        }

        const expenseSlipData = {
          month: currentMonth,
          expense: expense.$id,
          status: "pending",
          amount: expense.amount || null,
        };

        const expenseSlip = await databases.createDocument(
          config.databaseId!,
          config.expenseSlipCollectionID!,
          ID.unique(),
          expenseSlipData
        );

      }

      return { message: "Expense slips generated successfully" };

    } catch (error: any) {
      console.error("Error generating expense slips:", error.message);
      throw new Error(error.message || "Failed to generate expense slips");
    }
  };


  const generateMaintenanceSlips = async () => {
    try {
      const flats = await getFlats();
      const currentMonth = getMonth("current");
      const previousMonth = getMonth("previous");

      if (!flats || flats.length === 0) {
        throw new Error("No flats found to generate maintenance slips for the current month");
        return;
      }

      const previousMonthSlips = await databases.listDocuments(
        config.databaseId!,
        config.maintenanceID!,
        [
          Query.equal("month", previousMonth),
          Query.equal("status", "pending"),
        ]
      );

      for (const flat of flats) {

        const previousMonthSlipOfFlat = previousMonthSlips.documents.find(
          (slip: any) => slip.flat?.$id === flat.$id
        );

        if (previousMonthSlipOfFlat) {
          const dues = JSON.parse(flat.dues || "[]");
          const newDue = {
            month: previousMonth,
            maintenance: flat.maintenance
          };

          await databases.updateDocument(
            config.databaseId!,
            config.flatsCollectionID!,
            flat.$id,
            {
              dues: JSON.stringify([...dues, newDue]),
            }
          );
        }

        const existingSlipOfCurrentMonth = await databases.listDocuments(
          config.databaseId!,
          config.maintenanceID!,
          [
            Query.equal("month", currentMonth),
            Query.equal("flat", flat.$id),
          ]
        );

        if (existingSlipOfCurrentMonth.total > 0) {
          continue;
        }

        const slipNumberDoc = await databases.getDocument(
          config.databaseId!,
          config.miscID!,
          "1"
        );

        const slipNumber = slipNumberDoc.slipNumber + 1;
        const maintenanceSlipData = {
          month: currentMonth,
          flat: flat.$id,
          status: "pending",
          slipNumber,
        };

        try {
          const maintenanceSlip = await databases.createDocument(
            config.databaseId!,
            config.maintenanceID!,
            ID.unique(),
            maintenanceSlipData
          );

        } catch (err: any) {
          continue;
        }

        await databases.updateDocument(
          config.databaseId!,
          config.miscID!,
          "1",
          { slipNumber }
        );
      }

      return { message: "Maintenance slips generated successfully" };

    } catch (error: any) {
      console.error("❌ Error generating maintenance slips:", error.message);
      throw new Error(error.message || "Failed to generate maintenance slips");
    }
  };

  const getStats = async () => {
    try {
      const expenseSlips = await getExpenseSlips();
      const maintenanceSlips = await getMaintenanceSlips();
      const paidMaintenanceSlips = maintenanceSlips.filter((slip: any) => slip.status === "paid");
      const paidExpenseSlips = expenseSlips.filter((slip: any) => slip.status === "paid");


      const expensePercentage = expenseSlips.length > 0 ? (paidExpenseSlips.length / expenseSlips.length) * 100 : 0;
      const maintenancePercentage = maintenanceSlips.length > 0 ? (paidMaintenanceSlips.length / maintenanceSlips.length) * 100 : 0;


      const paidMaintenanceSlipsTotal = paidMaintenanceSlips.reduce((total: number, slip: any) => {
        const dues = JSON.parse(slip.flat.dues || "[]");
        if (!dues || dues.length === 0) {
          return total + slip.flat.maintenance;
        }
        const totalDues = dues.reduce((sum: number, due: any) => sum + (due.maintenance || 0), 0);

        return total + (totalDues + slip.flat.maintenance)

      }, 0);


      return {
        expensePercentage: expensePercentage.toFixed(0),
        maintenancePercentage: maintenancePercentage.toFixed(0),
        totalMaintenanceReceived: paidMaintenanceSlipsTotal
      }



    } catch (error: any) {
      console.error("Error fetching stats:", error.message);
      throw new Error(error.message || "Failed to fetch stats");
    }
  }

 const getSummary = async (fromDate: string, toDate: string) => {
  try {
    
    const expenseSlips = await databases.listDocuments(
      config.databaseId!,
      config.expenseSlipCollectionID!,
      [
        Query.greaterThanEqual("$updatedAt", fromDate),
        Query.lessThanEqual("$updatedAt", toDate),
        Query.equal("status", "paid"),
      ]
    );

    const maintenanceSlips = await databases.listDocuments(
      config.databaseId!,
      config.maintenanceID!,
      [
        Query.greaterThanEqual("$updatedAt", fromDate),
        Query.lessThanEqual("$updatedAt", toDate),
        Query.equal("status", "paid"),
      ]
    );

    const updatedExpenseSlips = expenseSlips.documents.map((slip: any) => {
      const amount = slip.amount || 0;
      return {
        title: `Paid to ${slip.expense?.expenseName ?? "Unknown"}`,
        amount,
        debit: amount,
        credit: "-"
      };
    });

    const updatedMaintenanceSlips = maintenanceSlips.documents.map((slip: any) => {
      const dues = JSON.parse(slip.flat?.dues || "[]");
      const additionalDues = dues.reduce((sum: number, due: any) => sum + (due.maintenance || 0), 0);
      const base = slip.flat?.maintenance || 0;
      const totalAmount = base + additionalDues;

      return {
        title: `Received from Flat ${slip.flat?.flatNumber ?? "Unknown"}`,
        amount: totalAmount,
        credit: totalAmount,
        debit: "-"
      };
    });

    const totalCredits = updatedMaintenanceSlips.reduce((sum: number, slip) => sum + (slip.amount || 0), 0);
    const totalDebits = updatedExpenseSlips.reduce((sum: number, slip) => sum + (slip.amount || 0), 0);

    const total = totalCredits - totalDebits;

    return {
      summary: [...updatedExpenseSlips, ...updatedMaintenanceSlips],
      total: total || 0
    };
  } catch (error: any) {
    console.error("Error fetching summary:", error.message);
    throw new Error(error.message || "Failed to fetch summary");
  }
};



  return {
    loginUser,
    getCurrentUser,
    logoutUser,
    getExpenses,
    createExpense,
    getFlats,
    createFlat,
    getExpenseSlips,
    getMaintenanceSlips,
    updateExpenseSlip,
    updateMaintenanceSlip,
    generateExpenseSlips,
    generateMaintenanceSlips,
    getStats,
    getSummary
  };
};

export default useAppwrite;
