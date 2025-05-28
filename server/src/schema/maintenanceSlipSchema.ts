import { z } from "zod";

export const maintenanceSlipSchema = z.object({
  flat_id: z.string().min(1, "Flat ID is required"),
  month: z.string().min(1, "Month is required"),
  slip_number: z
    .number()
    .int()
    .positive("Slip number must be a positive integer"),
  status: z.enum(["paid", "pending", "overdue"]),
});

export default maintenanceSlipSchema;
