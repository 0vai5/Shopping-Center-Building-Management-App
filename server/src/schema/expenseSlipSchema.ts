import { z } from "zod";
import mongoose from "mongoose";

const expenseSlipSchema = z.object({
  month: z.string().min(1, "Month is required"),
  status: z.enum(["paid", "pending", "overdue"]),
  expense_id: z.union([
    z.string().min(1, "Expense ID is required"),
    z.instanceof(mongoose.Types.ObjectId)
  ]),
});

export default expenseSlipSchema;