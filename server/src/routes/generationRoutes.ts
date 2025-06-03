import { Router } from "express";
import generationController from "../controllers/generationController";
import asyncHandler from "../utils/asyncHandler";

const generationRoutes = Router();

generationRoutes.post(
    "/generate-slips",
    asyncHandler(generationController.generateMaintenanceSlipsAndExpenseSlips)
    );


    export default generationRoutes;