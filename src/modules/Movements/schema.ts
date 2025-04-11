import { z } from "zod";
import { updateIntSchema } from "~/lib/resolver/zod";

const input = {
  name: z.string(),
  bookId: z.string(),
  description: z.string(),
  type: z.number(),
  amount: z.number(),
  reminder_date: z.date(),
  next_ocurrence: z.date(),
  frecuency: z.number(),
  categoryId: z.optional(z.number()),
  goalId: z.optional(z.number()),
  entityId: z.optional(z.number()),
};

export const createMovements = z.object(input);
export type createMovements = z.infer<typeof createMovements>;
export const updateMovements = updateIntSchema(input);
export type updateMovements = z.infer<typeof updateMovements>;
