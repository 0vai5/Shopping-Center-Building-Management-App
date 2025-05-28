import mongoose, {Schema, Document} from "mongoose";

export interface IMisc extends Document {
    slip_number: number;
}

const miscSchema = new Schema<IMisc>(
    {
        slip_number: {type: Number, required: true},
    },
    {
        timestamps: {
            createdAt: "created_at",
            updatedAt: "updated_at",
        },
    }
);

const Misc = mongoose.model<IMisc>("Misc", miscSchema);
export default Misc;