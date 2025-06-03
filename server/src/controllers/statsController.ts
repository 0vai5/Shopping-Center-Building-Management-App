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
        {
          $match: {
            month: currentMonth,
            status: "paid",
          },
        },
        {
          $lookup: {
            from: "flats",
            localField: "flat_id",
            foreignField: "_id",
            as: "flatDetails",
          },
        },
        {
          $unwind: "$flatDetails",
        },
        {
          $project: {
            _id: 1,
            month: 1,
            status: 1,
            maintenance: "$flatDetails.maintenance",
            flat_number: "$flatDetails.flat_number",
            flat_owner: "$flatDetails.flat_owner",
            rooms: "$flatDetails.rooms",
            dues: "$flatDetails.dues",
          },
        },
      ]);

      const totalMaintenancePaid = maintenanceSlipsPaid.reduce((acc, slip) => {
        const dues = JSON.parse(slip.dues || "[]");

        if (dues.length > 0) {
          const totalDues = dues.reduce((sum: number, dues: any) => {
            return sum + dues.maintenance * slip.rooms;
          });

          return acc + totalDues + slip.maintenance * slip.rooms;
        }

        return acc + slip.maintenance * slip.rooms;
      }, 0);

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

      const responseData = {
        maintenanceSlipsPaid: {
          total: 11,
          paid: maintenanceSlipsPaid.length,
          percentagePaid:
            maintenanceSlipsPaid.length > 0
              ? (maintenanceSlipsPaid.length / 11) * 100
              : 0,
          amountPaid: totalMaintenancePaid,
        },
        expenseSlipsPaid: expenseSlipsPaid[0] || {
          totalDocuments: 0,
          paidDocuments: 0,
          percentagePaid: 0,
        },
      };

      return res
        .status(200)
        .json(
          new ApiResponse(
            200,
            "Monthly Stats Retrieved Successfully",
            responseData
          )
        );
    } catch (error: any) {
      return res
        .status(error.statusCode || 500)
        .json(new ApiResponse(error.statusCode || 500, error.message));
    }
  },
};

export default statsController;
