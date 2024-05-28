export const amountFormatter = (
  inputValue: string,
): { formatted: string; raw: number | null } => {
  const cleaned = inputValue.replace(/\D/g, "");

  if (cleaned === "") {
    return { formatted: "", raw: null };
  }

  const numericValue = parseInt(cleaned, 10) || 0;
  const formattedValue = numericValue.toLocaleString("es-ES");

  return { formatted: formattedValue, raw: numericValue };
};
