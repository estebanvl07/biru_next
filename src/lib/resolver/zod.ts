import { z } from "zod";

export const messages = {
  required: "Campo Requerido",
  email: "Correo inválido",
  length: (length: number) => `Debe tener ${length} caracteres`,
  min: {
    string: (min: number) => `Mínimo de ${min} caracteres`,
    number: (min: number) => `Mínimo de ${min}`,
  },
};

export const Z_NUMBER = z.number({ required_error: messages.required });
export const Z_STRING = z
  .string({ required_error: messages.required })
  .min(1, { message: messages.required });
export const Z_BOOLEAN = z.boolean({ required_error: messages.required });
export const Z_DATE = z.date({ required_error: messages.required });
export const Z_NUMBER_S = Z_NUMBER.or(Z_STRING.transform(Number));
export const Z_EMAIL = Z_STRING.email({ message: messages.email });
export const Z_PASSWORD = Z_STRING.min(8, { message: messages.min.string(8) });

export const updateSchema = <T extends z.ZodRawShape>(base: T) => {
  type UpdateBase = T & { id: z.ZodString };

  const keys = Object.keys(base) as Array<keyof typeof base>;
  const props = keys.reduce(
    (input, key) => {
      return { ...input, [key]: base[key]!.optional() };
    },
    { id: Z_STRING } as UpdateBase,
  );

  return z.object(props);
};

export { z };
