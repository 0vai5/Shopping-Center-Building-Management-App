import flat from "../models/flats.model";
import MaintenanceSlip from "../models/maintenanceSlip.model";
import flatSchema from "../schema/flatSchema";
import validateSchema from "../utils/schemaValidator";
import CustomError from "../utils/CustomError";
import ApiResponse from "../utils/ApiResponse";
import { Request, Response } from "express";
import getMonth from "../utils/getMonth";
import Misc from "../models/misc.model";

const month = getMonth("current");

const flatsController = {
  async createFlat(req: Request, res: Response) {
    try {
      const { success, data, error } = validateSchema(flatSchema, req.body);

      if (!success) {
        throw new CustomError(error.message, 400);
      }

      const newFlat = await flat.create(data);
      const slipNumber = await Misc.findByIdAndUpdate(
        "683b35ba027b86d2b661bb83",
        {
          $inc: { slipNumber: 1 },
        },
        {
          new: true,
        }
      );

      const maintenanceSlipData = {
        flat_id: newFlat._id,
        month,
        slip_number: slipNumber?.slip_number || 1,
        status: "pending",
      };

      const maintenanceSlip = await MaintenanceSlip.create(maintenanceSlipData);

      return res.status(201).json(
        new ApiResponse(201, "Flat created successfully", {
          flat: newFlat,
          maintenanceSlip: maintenanceSlip,
        })
      );
    } catch (error: any) {
      return res
        .status(error.statusCode || 500)
        .json(new ApiResponse(error.statusCode || 500, error.message));
    }
  },
  async getFlats(req: Request, res: Response) {
    try {
      const flats = await flat.find();
      if (!flats || flats.length === 0) {
        throw new CustomError("No flats found", 404);
      }

      return res
        .status(200)
        .json(new ApiResponse(200, "Flats retrieved successfully", flats));
    } catch (error: any) {
      return res
        .status(error.statusCode || 500)
        .json(new ApiResponse(error.statusCode || 500, error.message));
    }
  },
  async deleteFlat(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const flatToDelete = await flat.findByIdAndDelete(id);

      if (!flatToDelete) {
        throw new CustomError("Flat not found", 404);
      }

      return res
        .status(200)
        .json(new ApiResponse(200, "Flat deleted successfully", flatToDelete));
    } catch (error: any) {
      return res
        .status(error.statusCode || 500)
        .json(new ApiResponse(error.statusCode || 500, error.message));
    }
  },
};

export default flatsController;
