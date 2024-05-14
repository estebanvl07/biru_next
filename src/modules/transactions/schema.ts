import {
  Z_DATE,
  Z_NUMBER,
  Z_STRING,
  updateSchema,
  z,
} from "~/lib/resolver/zod";

export const input = {
  amount: Z_NUMBER,
  type: z.union([z.literal(1), z.literal(2)], {
    required_error: "Campo Requerido",
  }),
  date: Z_DATE,
  recipient: z.optional(z.string()),
  description: z.optional(z.string()),
  categoryId: Z_NUMBER,
  accountId: Z_NUMBER,
};

export const createTransaction = z.object(input);
export type createTransaction = z.infer<typeof createTransaction>;
export const updateTransaction = updateSchema(input);
export type updateTransction = z.infer<typeof updateTransaction>;
