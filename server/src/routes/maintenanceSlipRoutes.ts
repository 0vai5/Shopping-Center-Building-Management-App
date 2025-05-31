import { Router } from "express";
import asyncHandler from "../utils/asyncHandler";
import maintenanceSlipController from "../controllers/maintenanceSlipController";

const MaintenanceSlipRoutes = Router();

MaintenanceSlipRoutes.get(
  "/get-maintenance-slips",
  asyncHandler(maintenanceSlipController.getMaintenanceSlips)
);
MaintenanceSlipRoutes.post(
  "/update-maintenance-slip-status/:id",
  asyncHandler(maintenanceSlipController.updateMaintenanceSlipStatus)
);

export default MaintenanceSlipRoutes;
