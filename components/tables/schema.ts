import { z } from "zod";

export const userSchema = z.object({
  name: z.string(),
  email: z.string(),
  role: z.enum(["admin", "user"]),
  address: z.string().optional(),
  jobTitle: z.string().optional(),
  company: z.object({
    CompanyName: z.string(),
  }).optional(), // company alanını optional yapın
  phoneNumber: z.string().optional(),
  status: z.boolean(),
});

export type User = z.infer<typeof userSchema>;