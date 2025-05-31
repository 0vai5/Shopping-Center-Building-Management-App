import MaintenanceSlip from "../models/maintenanceSlip.model";
import CustomError from "../utils/CustomError";
import ApiResponse from "../utils/ApiResponse";
import { Request, Response } from "express";
import getMonth from "../utils/getMonth";

const month = getMonth("current");

const maintenanceSlipController = {
  async getMaintenanceSlips(req: Request, res: Response) {
    try {
      const MaintenanceSlips = await MaintenanceSlip.find({ month }).populate(
        "flat_id"
      );

      if (!MaintenanceSlips || MaintenanceSlips.length === 0) {
        throw new CustomError("No maintenance slips found for this month", 404);
      }

      return res
        .status(200)
        .json(
          new ApiResponse(
            200,
            "Maintenance slips fetched successfully",
            MaintenanceSlips
          )
        );
    } catch (error: any) {
      return res
        .status(error.statusCode || 500)
        .json(new ApiResponse(error.statusCode || 500, error.message));
    }
  },
  async updateMaintenanceSlipStatus(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { status } = req.body;

      const maintenanceSlip = await MaintenanceSlip.findByIdAndUpdate(
        id,
        {
          status,
        },
        {
          new: true,
        }
      );

      if (!maintenanceSlip) {
        throw new CustomError("Maintenance slip not found", 404);
      }

      return res
        .status(200)
        .json(
          new ApiResponse(
            200,
            "Maintenance slip status updated successfully",
            maintenanceSlip
          )
        );

    } catch (error: any) {
      return res
        .status(error.statusCode || 500)
        .json(new ApiResponse(error.statusCode || 500, error.message));
    }
  },
};

export default maintenanceSlipController;
