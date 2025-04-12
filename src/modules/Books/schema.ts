import { updateSchema, z, Z_NUMBER, Z_STRING } from "~/lib/resolver/zod";

const input = {
  name: Z_STRING,
  description: Z_STRING,
  type: Z_NUMBER,
};

export const createBook = z.object(input);
export type CreateBook = z.infer<typeof createBook>;
export const updateBook = updateSchema(input);
export type UpdateBook = z.infer<typeof updateBook>;
