import mongoose, { Schema, Document } from 'mongoose';

export interface IMaintenanceSlip extends Document {
    flat_id: string;
    month: string;
    slip_number: number;
    status: "paid" | "pending" | "overdue";
};

const maintenanceSlipSchema = new Schema<IMaintenanceSlip>({
    flat_id: { type: String, required: true },
    month: { type: String, required: true },
    slip_number: { type: Number, required: true },
    status: { type: String, enum: ["paid", "pending", "overdue"], required: true }
}, {
    timestamps: {
        createdAt: "created_at",
        updatedAt: "updated_at"
    }
});

const MaintenanceSlip = mongoose.model<IMaintenanceSlip>("MaintenanceSlip", maintenanceSlipSchema);
export default MaintenanceSlip;
