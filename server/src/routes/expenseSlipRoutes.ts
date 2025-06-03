import {Router} from 'express';
import expenseSlipController from '../controllers/expenseSlipController';
import asyncHandler from '../utils/asyncHandler';

const ExpenseSlipRoutes = Router();

ExpenseSlipRoutes.post("/update-expense-status/:id", asyncHandler(expenseSlipController.updateExpenseSlipStatus));
ExpenseSlipRoutes.get("/get-expense-slips", asyncHandler(expenseSlipController.getExpenseSlips));

export default ExpenseSlipRoutes;