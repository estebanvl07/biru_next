import {
  Z_DATE,
  Z_NUMBER,
  Z_STRING,
  updateSchema,
  z,
} from "~/lib/resolver/zod";

export const input = {
  name: Z_STRING,
  bookId: Z_STRING,
  goal: Z_NUMBER,
  type: Z_NUMBER,
  description: z.optional(z.string()),
  entityId: z.optional(z.number()),
  icon: z.optional(z.string()),
  goalDate: z.optional(Z_DATE),
};

export const createGoal = z.object(input);
export type createGoal = z.infer<typeof createGoal>;
export const updateGoal = updateSchema(input);
export type updateGoal = z.infer<typeof updateGoal>;
