import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  _id: string;
  name: string;
  email: string;
}

const userSchema = new Schema<IUser>(
  {
    _id: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

const User = mongoose.model<IUser>("User", userSchema);
export default User;
