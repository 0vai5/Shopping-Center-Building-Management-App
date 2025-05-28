import { z } from "zod";

export const flatSchema = z.object({
  owner_name: z.string().min(3, "Owner name is required"),
  owner_phone: z.string().min(11, "Owner phone is required"),
  flat_number: z.string().min(1, "Flat number is required"),
  rooms: z.number().min(2, "At least two rooms are required"),
  maintenance: z.number().min(0, "Maintenance fee must be positive").default(400),
  dues: z.string().optional(),
});

export default flatSchema;
