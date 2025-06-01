import MaintenanceSlip from "../models/maintenanceSlip.model";
import ExpenseSlip from "../models/expenseSlip.model";
import { Request, Response } from "express";
import ApiResponse from "../utils/ApiResponse";
import getMonth from "../utils/getMonth";

const currentMonth = getMonth("current");

const statsController = {
  async getMonthlyStats(req: Request, res: Response) {
    try {
      const maintenanceSlipsPaid = await MaintenanceSlip.aggregate([
        // Step 1: Join flats
        {
          $lookup: {
            from: "flats",
            localField: "flat_id",
            foreignField: "_id",
            as: "flat",
          },
        },
        {
          $unwind: "$flat",
        },
        // Step 2: Add a computed field for maintenance * rooms
        {
          $addFields: {
            totalAmount: { $multiply: ["$flat.maintenance", "$flat.rooms"] },
          },
        },
        // Step 3: Group to calculate total and paid total
        {
          $group: {
            _id: null,
            total: { $sum: "$totalAmount" },
            paid: {
              $sum: {
                $cond: [
                  {
                    $and: [
                      { $eq: ["$status", "paid"] },
                      { $eq: ["$month", currentMonth] },
                    ],
                  },
                  "$totalAmount",
                  0,
                ],
              },
            },
          },
        },
        // Step 4: Add percentage field
        {
          $addFields: {
            percentagePaid: {
              $cond: [
                { $gt: ["$total", 0] },
                { $multiply: [{ $divide: ["$paid", "$total"] }, 100] },
                0,
              ],
            },
          },
        },
      ]);

      const expenseSlipsPaid = await ExpenseSlip.aggregate([
        {
          $match: {
            month: currentMonth,
          },
        },
        {
          $group: {
            _id: null,
            totalDocuments: { $sum: 1 },
            paidDocuments: {
              $sum: {
                $cond: [
                  {
                    $and: [
                      { $eq: ["$status", "paid"] },
                      { $eq: ["$month", currentMonth] },
                    ],
                  },
                  1,
                  0,
                ],
              },
            },
          },
        },
        {
          $addFields: {
            percentagePaid: {
              $cond: [
                { $gt: ["$totalDocuments", 0] },
                {
                  $multiply: [
                    { $divide: ["$paidDocuments", "$totalDocuments"] },
                    100,
                  ],
                },
                0,
              ],
            },
          },
        },
        {
          $project: {
            _id: 0,
            totalDocuments: 1,
            paidDocuments: 1,
            percentagePaid: 1,
          },
        },
      ]);

      return res.status(200).json(
        new ApiResponse(200, "Monthly Stats Retrieved Successfully", {
          maintenanceSlipsPaid: maintenanceSlipsPaid[0] || {
            total: 0,
            paid: 0,
            percentagePaid: 0,
          },
          expenseSlipsPaid: expenseSlipsPaid[0] || {
            totalDocuments: 0,
            paidDocuments: 0,
            percentagePaid: 0,
          },
        })
      );
    } catch (error: any) {
      return res
        .status(error.statusCode || 500)
        .json(new ApiResponse(error.statusCode || 500, error.message));
    }
  },
};

export default statsController;
