import { Z_DATE, Z_NUMBER, updateSchema, z } from "~/lib/resolver/zod";

export const input = {
  amount: Z_NUMBER,
  accountId: Z_NUMBER,
  type: z.union([z.literal(1), z.literal(2)], {
    required_error: "Campo Requerido",
  }),
  date: z.optional(Z_DATE),
  reference: z.optional(z.string()),
  recipient: z.optional(z.string()),
  description: z.optional(z.string()),
  transferType: z.optional(z.number()),
  goalId: z.optional(z.number()),
  entityId: z.optional(z.number()),
  categoryId: z.optional(z.number()),
};

export const createTransaction = z.object(input);
export type createTransaction = z.infer<typeof createTransaction>;
export const updateTransaction = updateSchema(input);
export type updateTransction = z.infer<typeof updateTransaction>;
