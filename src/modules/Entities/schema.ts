import { Z_STRING, updateSchema, z } from "~/lib/resolver/zod";

export const input = {
  name: Z_STRING,
  description: z.optional(z.string()),
  avatar: z.optional(z.string()),
  type: z.union([z.literal(1), z.literal(2)], {
    required_error: "Campo Requerido",
  }),
  reference: z.optional(z.string()),
};

export const createEntity = z.object(input);
export type createEntity = z.infer<typeof createEntity>;
export const updateEntity = updateSchema(input);
export type updateEntity = z.infer<typeof updateEntity>;
