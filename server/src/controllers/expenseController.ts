import Expense from "../models/expense.model";
import expenseSchema from "../schema/expenseSchema";
import validateSchema from "../utils/schemaValidator";
import CustomError from "../utils/CustomError";
import ApiResponse from "../utils/ApiResponse";
import { Request, Response } from "express";

// TODO: Generating a Expense Slip when expense is thisMonth ?

const expenseController = {
  async createExpense(req: Request, res: Response) {
    try {
      const { success, data, error } = validateSchema(expenseSchema, req.body);

      if (!success) {
        throw new CustomError(error.message, 400);
      }

      const existingExpense = await Expense.findOne({
        expense_name: data.expense_name,
      });

      if (existingExpense) {
        throw new CustomError("Expense with this name already exists", 400);
      }

      const expense = await Expense.create(data);

      return res
        .status(201)
        .json(new ApiResponse(201, "Expense Created Successfully", expense));
    } catch (error: any) {
      return res
        .status(error.statusCode || 500)
        .json(new ApiResponse(error.statusCode, error.message));
    }
  },
  async getExpenses(req: Request, res: Response) {
    try {
      const expense = await Expense.find();

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
};

export default expenseController;
