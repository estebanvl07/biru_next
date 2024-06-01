import { Z_EMAIL, Z_PASSWORD, Z_STRING, z } from "~/lib/resolver/zod";

export const loginInput = z.object({
  email: Z_EMAIL,
  password: Z_STRING,
});

export type LoginInputType = z.infer<typeof loginInput>;
