import { z } from "zod";

const input = {
  start_date: z.date().optional(),
  end_date: z.date().optional(),
  bookId: z.string(),
  type: z.number().int().positive().optional(),
  max: z.number().min(0).optional(),
  min: z.number().min(0).optional(),
  categoryId: z.optional(z.number().int().positive()),
  entityId: z.optional(z.number().int().positive()),
  state: z.optional(z.number().int().positive()),
};

export const advanceSchema = z.object(input);
export type advanceSchema = z.infer<typeof advanceSchema>;
