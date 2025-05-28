import { Router } from "express";
import userController from "../controllers/userController";
import asyncHandler from "../utils/asyncHandler";

const UserRoutes = Router();

UserRoutes.get("/users", asyncHandler(userController.getUsers));
UserRoutes.post("/create-user", asyncHandler(userController.createUser));

export default UserRoutes;
