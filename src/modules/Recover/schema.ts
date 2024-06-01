import { z } from "zod";

export const RecoverSchema = z.object({
  email: z.string({
    required_error: "El correo es requerido",
  }),
});
export type RecoverSchema = z.infer<typeof RecoverSchema>;

export const CodeSchema = z.object({
  code: z.string({
    required_error: "El codigo es requerido",
  }),
});
export type CodeSchema = z.infer<typeof CodeSchema>;

export const RecoverPasswordSchema = z.object({
  password: z.string({
    required_error: "La contraseña es requerida",
  }),
  confirmPassword: z.string({
    required_error: "La contraseña es requerida",
  }),
});
export type RecoverPasswordSchema = z.infer<typeof RecoverPasswordSchema>;
