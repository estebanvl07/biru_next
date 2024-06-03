export const parseAmount = (amount: number | undefined) => {
  if (!amount || amount === 0) return "0.0";
  if (amount >= 1000000) return `${parseFloat((amount / 1000000).toFixed(1))}M`;
  return `${parseFloat((amount / 1000).toFixed(1))}k`;
};

export const getPercent = (
  value: number,
  amount: number | undefined,
): string => {
  if (value === 0 || typeof amount === "undefined") return "0%";
  return `${((value / amount) * 100).toFixed(1)}%`;
};
