import Expense from "../models/expense.model";
import expenseSchema from "../schema/expenseSchema";
import validateSchema from "../utils/schemaValidator";
import CustomError from "../utils/CustomError";
import ApiResponse from "../utils/ApiResponse";
import { Request, Response } from "express";
import expenseSlipSchema from "../schema/expenseSlipSchema";
import ExpenseSlip from "../models/expenseSlip.model";

const month = new Date().toLocaleString("default", { month: "long" });
const year = new Date().getFullYear();

const expenseController = {
  async createExpense(req: Request, res: Response) {
    try {
      const { success, data, error } = validateSchema(expenseSchema, req.body);

      if (!success) {
        throw new CustomError(error.message, 400);
      }

      const expense = await Expense.create(data);

      const expenseData = {
        month: `${month} ${year}`,
        status: "pending",
        expense_id: expense._id,
      };

      const {
        success: slipSuccess,
        data: slipData,
        error: slipError,
      } = validateSchema(expenseSlipSchema, expenseData);

      if (!slipSuccess) {
        throw new CustomError(slipError.message, 400);
      }

      const expenseSlip = await ExpenseSlip.create(slipData);

      return res.status(201).json(
        new ApiResponse(201, "Expense Created Successfully", {
          expense,
          expenseSlip,
        })
      );
    } catch (error: any) {
      return res
        .status(error.statusCode || 500)
        .json(new ApiResponse(error.statusCode, error.message));
    }
  },
  async getExpenses(req: Request, res: Response) {
    try {
      const expense = await Expense.find({this_month: false});

      if (expense.length <= 0) {
        throw new CustomError("No Expenses Exists", 404);
      }

      return res
        .status(200)
        .json(new ApiResponse(200, "Successfully Retrieved Expenses", expense));
    } catch (error: any) {
      return res
        .status(error.statusCode || 500)
        .json(new ApiResponse(error.statusCode, error.message));
    }
  },
  async deleteExpense(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const expense = await Expense.findByIdAndDelete(id);

      if(!expense) {
        throw new CustomError("Expense not found", 404);
      }

      return res
        .status(200)
        .json(new ApiResponse(200, "Expense Deleted Successfully", expense));
    } catch (error: any) {
      return res
        .status(error.statusCode || 500)
        .json(new ApiResponse(error.statusCode, error.message));
    }
  },
};

export default expenseController;
