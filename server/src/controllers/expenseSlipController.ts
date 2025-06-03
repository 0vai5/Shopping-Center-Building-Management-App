import expenseSlipSchema from "../schema/expenseSlipSchema";
import ExpenseSlip from "../models/expenseSlip.model";
import validateSchema from "../utils/schemaValidator";
import { Request, Response } from "express";
import CustomError from "../utils/CustomError";
import ApiResponse from "../utils/ApiResponse";
import getMonth from "../utils/getMonth";

const month = getMonth("current");

const expenseSlipController = {
  async updateExpenseSlipStatus(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { status } = req.body;

      const expenseSlip = await ExpenseSlip.findByIdAndUpdate(
        id,
        {
          status,
        },
        {
          new: true,
        }
      );

      if (!expenseSlip) {
        throw new CustomError("Expense slip not found", 404);
      }

      return res
        .status(200)
        .json(
          new ApiResponse(
            200,
            "Expense slip status updated successfully",
            expenseSlip
          )
        );
    } catch (error: any) {
      return res
        .status(error.statusCode || 500)
        .json(new ApiResponse(error.statusCode || 500, error.message));
    }
  },
  async getExpenseSlips(req: Request, res: Response) {
    try {
      const expenseSlips = await ExpenseSlip.aggregate([
        {
          $match: {
            month,
          }
        },
        {
          $lookup: {
            from : "expenses",
            localField: "expense_id",
            foreignField: "_id",
            as: "expense"
          }
        },
        {
          $unwind: "$expense"
        },
        {
          $project: {
            _id: 1,
            month: 1,
            status: 1,
            payee: "$expense.payee",
            amount: "$expense.amount",
            variable: "$expense.variable",
            this_month: "$expense.this_month",
            name: "$expense.expense_name",
          }
        }
      ]);

      if (!expenseSlips || expenseSlips.length === 0) {
        throw new CustomError("No expense slips found for this month", 404);
      }

      return res
        .status(200)
        .json(
          new ApiResponse(
            200,
            "Expense slips fetched successfully",
            expenseSlips
          )
        );
    } catch (error: any) {
      return res
        .status(error.statusCode || 500)
        .json(new ApiResponse(error.statusCode || 500, error.message));
    }
  },
};

export default expenseSlipController;
