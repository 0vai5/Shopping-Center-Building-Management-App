import mongoose, { Schema, Document } from "mongoose";

export interface IExpense extends Document {
  payee: string;
  amount?: number;
  expense_name: string;
  this_month: boolean;
  variable: boolean;
}

const expenseSchema = new Schema<IExpense>(
  {
    payee: { type: String, required: true },
    amount: { type: Number, required: false },
    expense_name: { type: String, required: true },
    this_month: { type: Boolean, required: true },
    variable: { type: Boolean, required: true },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

const Expense = mongoose.model<IExpense>("Expense", expenseSchema);
export default Expense;
