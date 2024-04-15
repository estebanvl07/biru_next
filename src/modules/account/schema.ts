import { Z_NUMBER, Z_STRING, updateSchema, z } from "~/lib/resolver/zod";

export const input = {
  balance: Z_NUMBER,
  name: Z_STRING,
  reference: Z_STRING,
  type: Z_NUMBER,
};

export const createUserAccount = z.object(input);
export type CreateUserAccount = z.infer<typeof createUserAccount>;
export const updateUserAccount = updateSchema(input);
export type UpdateUserAccount = z.infer<typeof updateUserAccount>;
