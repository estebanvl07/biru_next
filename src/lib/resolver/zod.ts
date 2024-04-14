import { z } from "zod";

export const messages = {
  required: "Campo Requerido",
};

export const Z_NUMBER = z.number({ required_error: messages.required });
export const Z_STRING = z
  .string({ required_error: messages.required })
  .min(1, { message: messages.required });
export const Z_BOOLEAN = z.boolean({ required_error: messages.required });
export const Z_DATE = z.date({ required_error: messages.required });

export const Z_NUMBER_S = Z_NUMBER.or(Z_STRING.transform(Number));

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
