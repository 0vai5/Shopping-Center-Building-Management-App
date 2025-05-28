import User from "../models/user.model";
import validateSchema from "../utils/schemaValidator";
import userSchema from "../schema/userSchema";
import CustomError from "../utils/CustomError";
import ApiResponse from "../utils/ApiResponse";
import { Request, Response } from "express";

const userController = {
  async createUser(req: Request, res: Response) {
    try {
      const { success, data, error } = validateSchema(userSchema, req.body);

      if (!success) {
        throw new CustomError(error.message, 400);
      }

      const user = await User.findOne({ email: data.email });

      if (user) {
        throw new CustomError("User already exists", 400);
      }

      const newUser = await User.create(data);

      return res
        .status(201)
        .json(new ApiResponse(201, "User created successfully", newUser));
    } catch (error: any) {
      return res
        .status(error.statusCode || 500)
        .json(new ApiResponse(error.statusCode || 500, error.message));
    }
  },
  async getUsers(req: Request, res: Response) {
    try {
      const users = await User.find();
      if (!users || users.length === 0) {
        throw new CustomError("No users found", 404);
      }

      return res
        .status(200)
        .json(new ApiResponse(200, "Users retrieved successfully", users));
    } catch (error: any) {
      return res
        .status(error.statusCode || 500)
        .json(new ApiResponse(error.statusCode || 500, error.message));
    }
  },
};


export default userController;