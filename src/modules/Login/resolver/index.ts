import { Z_EMAIL, Z_PASSWORD, z } from "~/lib/resolver/zod";

export const loginInput = z.object({
  email: Z_EMAIL,
  password: Z_PASSWORD,
});

export type LoginInputType = z.infer<typeof loginInput>;
