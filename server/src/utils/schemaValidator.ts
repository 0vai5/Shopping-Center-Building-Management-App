import { ZodSchema } from "zod";

const validateSchema = <T>(schema: ZodSchema, data: unknown) => {
  return schema.safeParse(data);
};

export default validateSchema;
