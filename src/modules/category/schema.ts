import { Z_STRING, updateSchema, z } from "~/lib/resolver/zod";

export const input = {
  name: Z_STRING,
  type: z.union([z.literal("1"), z.literal("2")], {
    required_error: "Campo Requerido",
  }),
  icon: Z_STRING,
  description: Z_STRING.optional(),
};

export const createCategory = z.object(input);
export type CreateCategory = z.infer<typeof createCategory>;
export const updateCategory = updateSchema(input);
export type UpdateCategory = z.infer<typeof updateCategory>;
