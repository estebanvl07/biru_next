import { Z_NUMBER, Z_STRING, updateSchema, z } from "~/lib/resolver/zod";

export const input = {
  name: Z_STRING,
  type: Z_NUMBER,
  balance: z.optional(z.number()),
  reference: z.optional(z.string()),
};

export const createUserAccount = z.object(input);
export type CreateUserAccount = z.infer<typeof createUserAccount>;
export const updateUserAccount = updateSchema(input);
export type UpdateUserAccount = z.infer<typeof updateUserAccount>;
