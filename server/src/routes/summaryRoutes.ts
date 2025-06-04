import { Router } from "express";
import summaryController from "../controllers/summaryController";
import asyncHandler from "../utils/asyncHandler";

const summaryRoutes = Router();

summaryRoutes.post(
  "/summary",
  asyncHandler(summaryController.getSummary)
);

export default summaryRoutes;