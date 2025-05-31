import { Router } from "express";
import expenseController from "../controllers/expenseController";
import asyncHandler from "../utils/asyncHandler";

const ExpenseRoutes = Router();

console.log("Expense Routes Loaded");

ExpenseRoutes.post("/create-expense", asyncHandler(expenseController.createExpense));
ExpenseRoutes.get("/expenses", asyncHandler(expenseController.getExpenses));

export default ExpenseRoutes;