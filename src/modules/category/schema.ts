import { Z_NUMBER, Z_STRING, updateSchema, z } from "~/lib/resolver/zod";

export const input = {
  name: Z_STRING,
  type: Z_NUMBER,
  description: z.optional(z.string()),
  icon: z.optional(z.string()),
};

export const createCategory = z.object(input);
export type CreateCategory = z.infer<typeof createCategory>;
export const updateCategory = updateSchema(input);
export type UpdateCategory = z.infer<typeof updateCategory>;
