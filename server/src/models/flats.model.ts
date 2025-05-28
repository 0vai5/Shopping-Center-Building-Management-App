import mongoose, { Schema, Document } from "mongoose";

export interface IFlat extends Document {
  owner_name: string;
  flat_number: string;
  owner_phone: string;
  rooms: number;
  maintenance: number;
  dues?: string;
}

const flatSchema = new Schema<IFlat>(
  {
    owner_name: { type: String, required: true },
    flat_number: { type: String, required: true, unique: true },
    owner_phone: { type: String, required: true },
    rooms: { type: Number, required: true },
    maintenance: { type: Number, required: true, default: 400 },
    dues: { type: String, required: false },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

const flat = mongoose.model<IFlat>("Flat", flatSchema);
export default flat;
