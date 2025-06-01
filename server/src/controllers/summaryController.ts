import MaintenanceSlip from "../models/maintenanceSlip.model";
import ExpenseSlip from "../models/expenseSlip.model";
import { Request, Response } from "express";
import ApiResponse from "../utils/ApiResponse";
import getMonth from "../utils/getMonth";

const currentMonth = getMonth("current");

const summaryController = {
  async getSummary(req: Request, res: Response) {
    try {
      const { toDate, fromDate } = req.body;

      // To and from dates are isoDateStrings

      if (!toDate || !fromDate) {
        return res
          .status(400)
          .json(new ApiResponse(400, "Both toDate and fromDate are required"));
      }

      const maintenanceSlips = await MaintenanceSlip.aggregate([
        {
          $match: {
            month: currentMonth,
            status: "pending",
            updated_at: {
              $gte: new Date(fromDate),
              $lte: new Date(toDate),
            },
          },
        },
        {
          $lookup: {
            from: "flats",
            localField: "flat_id",
            foreignField: "_id",
            as: "flat",
          },
        },
        {
          $unwind: "$flat",
        },
        {
          $addFields: {
            debit: {
              $multiply: ["$flat.rooms", "$flat.maintenance"],
            },
            credit: 0,
          },
        },
        {
          $project: {
            flat_id: 1,
            slip_number: 1,
            month: 1,
            flat_number: "$flat.flat_number",
            rooms: "$flat.rooms",
            maintenance: "$flat.maintenance",
            dues: "$flat.dues",
            debit: 1,
            credit: 1,
            status: 1,
            updated_at: 1,
          },
        },
      ]);

      const debitAmount = maintenanceSlips.reduce((acc: number, slip: any) => {
          const due = JSON.parse(slip.dues);
        if (due && due.length > 0) {
          const dueAmount = due.reduce(
            (sum: number, item: any) =>
              sum + (slip.rooms * item.maintenance),
            0
          );

          const slipAmount = slip.rooms * slip.maintenance;
          return acc + dueAmount + slipAmount;
        }
      }, 0);

      const expenseSlips = await ExpenseSlip.aggregate([
        {
          $match: {
            month: currentMonth,
            status: "pending",
            updated_at: {
              $gte: new Date(fromDate),
              $lte: new Date(toDate),
            },
          },
        },
        {
          $lookup: {
            from: "expenses",
            localField: "expense_id",
            foreignField: "_id",
            as: "expense",
          },
        },
        {
          $unwind: "$expense",
        },
        {
          $addFields: {
            debit: 0,
            credit: "$expense.amount",
          },
        },
        {
          $project: {
            expense_id: 1,
            month: 1,
            status: 1,
            updated_at: 1,
            debit: 1,
            credit: 1,
            payee: "$expense.payee",
            name: "$expense.expense_name",
          },
        },
      ]);

      const creditAmount = expenseSlips.reduce((acc: number, slip: any) => {
        return acc + slip.expense.amount;
      }, 0);

      const totalAmount = debitAmount - creditAmount;

      return res
        .status(200)
        .json(new ApiResponse(200, "Summary fetched Successfully", {
            debit: maintenanceSlips,
            credit: expenseSlips,
            total: totalAmount,
        }));
    } catch (error: any) {
      return res
        .status(error.statusCode || 500)
        .json(new ApiResponse(error.statusCode || 500, error.message));
    }
  },
};

export default summaryController;
