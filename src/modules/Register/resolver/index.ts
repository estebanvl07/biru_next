import { Z_EMAIL, Z_PASSWORD, Z_STRING, z } from "~/lib/resolver/zod";

export const registerUserInput = z.object({
  name: Z_STRING,
  email: Z_EMAIL,
  password: Z_PASSWORD,
});

export type RegisterUserInputType = z.infer<typeof registerUserInput>;
