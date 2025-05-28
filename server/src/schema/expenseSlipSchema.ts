import { z } from "zod";

const expenseSlipSchema = z.object({
  month: z.string().min(1, "Month is required"),
  status: z.enum(["paid", "pending", "overdue"]),
  expense_id: z.string().min(1, "Expense ID is required"),
});

export default expenseSlipSchema;
