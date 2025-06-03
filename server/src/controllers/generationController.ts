import MaintenanceSlip from "../models/maintenanceSlip.model";
import ExpenseSlip from "../models/expenseSlip.model";
import Expense from "../models/expense.model";
import flat from "../models/flats.model";
import { Request, Response } from "express";
import ApiResponse from "../utils/ApiResponse";
import CustomError from "../utils/CustomError";
import getMonth from "../utils/getMonth";
import Misc from "../models/misc.model";
import validateSchema from "../utils/schemaValidator";
import expenseSchema from "../schema/expenseSchema";

const month = getMonth("current");
const previousMonth = getMonth("previous");

const generationController = {
  async generateMaintenanceSlipsAndExpenseSlips(req: Request, res: Response) {
    try {
      // Maintenance Slips Generation
      const flats = await flat.find();

      if (!flats || flats.length === 0) {
        throw new CustomError("No flats found", 404);
      }

      const maintenanceSlipsOfPreviousMonth = await MaintenanceSlip.find({
        month: previousMonth,
        status: "pending",
      });

      const miscDoc = await Misc.findOne();
      if (!miscDoc) {
        throw new CustomError("Misc document not found", 500);
      }

      for (const flatData of flats) {
        const updatedMisc = await Misc.findByIdAndUpdate(
          miscDoc._id,
          { $inc: { slip_number: 1 } },
          { new: true }
        );
        const slipNumberToUse = updatedMisc?.slip_number || 1;
        const existingSlipOfPreviousMonth =
          maintenanceSlipsOfPreviousMonth.find(
            (slip) => slip.flat_id.toString() === flatData._id.toString()
          );

        const currentMonthMaintenanceSlip = await MaintenanceSlip.findOne({
          flat_id: flatData._id,
          month,
        });

        if (currentMonthMaintenanceSlip) {
          continue;
        }

        if (!existingSlipOfPreviousMonth) {
          await MaintenanceSlip.create({
            flat_id: flatData._id,
            slip_number: slipNumberToUse,
            month,
            status: "pending",
          });
        } else {
          // Only update dues for previous month, do not add previous month to new slip
          let dues = JSON.parse(flatData.dues || "[]");
          dues.push({
            month: previousMonth,
            maintenance: 300,
          });

          await flat.findByIdAndUpdate(flatData._id, {
            dues: JSON.stringify(dues),
          });

          await MaintenanceSlip.create({
            flat_id: flatData._id,
            slip_number: slipNumberToUse,
            month,
            status: "pending",
          });
        }
      }

      // Generate expense slips for this month (once, not per flat)
      const expenses = await Expense.find({
        this_month: false,
      });
      for (const expense of expenses) {
        await ExpenseSlip.create({
          expense_id: expense._id,
          month,
          status: "pending",
        });
      }

      const expenseSlips = await ExpenseSlip.find({
        month,
      }).populate("expense_id");

      const maintenanceSlips = await MaintenanceSlip.find({
        month,
      }).populate("flat_id");

      return res.status(200).json(
        new ApiResponse(
          200,
          "Maintenance slips and expense slips generated successfully",
          {
            maintenanceSlips,
            expenseSlips,
          }
        )
      );
    } catch (error: any) {
      return res
        .status(error.statusCode || 500)
        .json(new ApiResponse(error.statusCode || 500, error.message));
    }
  },
};

export default generationController;
