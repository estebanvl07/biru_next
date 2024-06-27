import { Z_EMAIL, Z_PASSWORD, Z_STRING, z, messages } from "~/lib/resolver/zod";

export const recoverUserInput = z.object({
  email: Z_EMAIL,
});

export type RecoverUserInputType = z.infer<typeof recoverUserInput>;

export const verifyCodeInput = z.object({
  code: Z_STRING.length(6, messages.length(6)),
  email: Z_EMAIL,
});

export type VerifyCodeInputType = z.infer<typeof verifyCodeInput>;

export const changePasswordInput = z.object({
  password: Z_PASSWORD,
  token: Z_STRING,
});

export const changePasswordForm = z
  .object({
    password: Z_PASSWORD,
    confirmPassword: Z_PASSWORD,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  });

export type ChangePasswordFormType = z.infer<typeof changePasswordForm>;

export type ChangePasswordInputType = z.infer<typeof changePasswordInput>;
