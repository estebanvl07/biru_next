import {
  Z_DATE,
  Z_NUMBER,
  Z_STRING,
  updateSchema,
  z,
} from "~/lib/resolver/zod";

// export interface ITransaction {
//     id: number;
//     accountId: number;
//     userId: number;
//     amount: number;
//     type: number;
//     date: string;
//     recipient: string;
//     description: string;
//     categoryId: number;
//     state: number;
//     createdAt: string;
//     updatedAt: string;
//   }

export const input = {
  amount: Z_NUMBER,
  type: z.union([z.literal(1), z.literal(2)], {
    required_error: "Campo Requerido",
  }),
  date: Z_DATE,
  recipient: Z_STRING,
  description: Z_STRING,
  categoryId: Z_NUMBER,
  accountId: Z_NUMBER,
};

export const createTransaction = z.object(input);
export type createTransaction = z.infer<typeof createTransaction>;
export const updateTransaction = updateSchema(input);
export type updateTransction = z.infer<typeof updateTransaction>;
