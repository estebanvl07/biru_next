import {
  Z_DATE,
  Z_NUMBER,
  Z_STRING,
  updateSchema,
  z,
} from "~/lib/resolver/zod";

export const input = {
  name: Z_STRING,
  target: Z_NUMBER,
  saved: Z_NUMBER,
  description: z.optional(z.string()),
  icon: z.optional(z.string()),
  goalDate: z.optional(Z_DATE),
};

export const createSaving = z.object(input);
export type createSaving = z.infer<typeof createSaving>;
export const updateSaving = updateSchema(input);
export type updateSaving = z.infer<typeof updateSaving>;
