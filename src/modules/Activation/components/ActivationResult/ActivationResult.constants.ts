import type { ActivationStatus } from "~/modules/Activation/types";

export const ICONS: Record<ActivationStatus, [string, string]> = {
  success: ["ion:checkmark-done-circle-outline", "text-green-500"],
  error: ["ion:close-circle-outline", "text-red-500"],
};

export const MESSAGES: Record<ActivationStatus, [string, string]> = {
  success: [
    "¡Hás activado tu cuenta con Éxito!",
    "Felicidades, tu cuenta ha sido activada con éxito, ahora puedes iniciar sesión",
  ],
  error: [
    "¡Error al activar la cuenta!",
    "Lo sentimos, ha ocurrido un error al activar tu cuenta, verifica que el enlace sea correcto.",
  ],
};
