import {
  Z_DATE,
  Z_NUMBER,
  Z_STRING,
  updateSchema,
  z,
} from "~/lib/resolver/zod";

export const input = {
  amount: Z_NUMBER,
  accountId: Z_NUMBER,
  type: Z_NUMBER,
  bookId: Z_STRING,
  date: z.optional(Z_DATE),
  reference: z.optional(z.string()),
  recipient: z.optional(z.string()),
  description: z.optional(z.string()),
  transferType: z.optional(z.number()),
  state: z.optional(z.number()),
  isProgramed: z.optional(z.boolean()),
  isConfirmed: z.optional(z.boolean()),
  goalId: z.optional(z.number()),
  entityId: z.optional(z.number()),
  categoryId: z.optional(z.number()),
};

export const createTransaction = z.object(input);
export type createTransaction = z.infer<typeof createTransaction>;
export const updateTransaction = updateSchema(input);
export type updateTransction = z.infer<typeof updateTransaction>;
