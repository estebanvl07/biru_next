import { Z_NUMBER, Z_STRING, updateSchema, z } from "~/lib/resolver/zod";

export const input = {
  name: Z_STRING,
  type: Z_NUMBER,
  state: Z_NUMBER,
  bookId: Z_STRING,
  icon: z.optional(z.string()),
  amount: z.optional(z.number()),
  description: z.optional(z.string()),
  reference: z.optional(z.string()),
  recipient: z.optional(z.string()),
  categoryId: z.optional(z.number()),
  entityId: z.optional(z.number()),
  transferType: z.optional(z.number()),
};

export const createTemplate = z.object(input);
export type createTemplate = z.infer<typeof createTemplate>;
export const updateTemplate = updateSchema(input);
export type updateTemplate = z.infer<typeof updateTemplate>;
