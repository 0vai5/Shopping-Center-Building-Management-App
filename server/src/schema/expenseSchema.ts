import { z } from "zod";

const expenseSchema = z.object({
  payee: z.string().min(3, "Payee is required"),
  amount: z.number().optional(),
  expense_name: z.string().min(3, "Expense name is required"),
  this_month: z.boolean(),
  variable: z.boolean(),
});

export default expenseSchema;
