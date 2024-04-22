import { Z_STRING, updateSchema, z } from "~/lib/resolver/zod";

export const input = {
  name: Z_STRING,
  email: Z_STRING,
  password: Z_STRING,
};

export const createUser = z.object(input);
export type CreateUser = z.infer<typeof createUser>;
// export const updateCategory = updateSchema(input);
// export type UpdateCategory = z.infer<typeof updateCategory>;
