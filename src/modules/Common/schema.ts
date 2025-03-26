import { z } from "zod";

export const filter = {
  filter: z.union([
    z.literal(0),
    z.literal(1),
    z.literal(2),
    z.literal(3),
    z.literal(4),
    z.literal(5),
  ]),
  bookId: z.string(),
  accountId: z.number().optional(),
  startDate: z.optional(z.date()),
  endDate: z.optional(z.date()),
};

export const filterInput = z.object(filter);
