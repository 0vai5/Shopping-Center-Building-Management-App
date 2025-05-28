import { Router } from "express";
import flatsController from "../controllers/flatsController";
import asyncHandler from "../utils/asyncHandler";

const FlatRoutes = Router();

FlatRoutes.get("/flats", asyncHandler(flatsController.getFlats));
FlatRoutes.post("/create-flat", asyncHandler(flatsController.createFlat));

export default FlatRoutes;
