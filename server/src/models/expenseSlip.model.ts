import mongoose, { Schema, Document } from "mongoose";

export interface IExpenseSlip extends Document {
  month: string;
  status: "paid" | "pending" | "overdue";
  expense_id: string;
}

const expenseSlipSchema = new Schema<IExpenseSlip>(
  {
    month: { type: String, required: true },
    status: {
      type: String,
      enum: ["paid", "pending", "overdue"],
      required: true,
    },
    expense_id: { type: String, required: true },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

const ExpenseSlip = mongoose.model<IExpenseSlip>("ExpenseSlip", expenseSlipSchema);
export default ExpenseSlip;
