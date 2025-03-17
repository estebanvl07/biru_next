export const getTransactionStatus = (state: number) => {
  const status = {
    1: "Confirmado",
    2: "Cancelado",
    3: "Programado",
  }[state];

  return status;
};

export const statusColor = (state: number) => {
  return {
    1: "success",
    2: "danger",
    3: "warning",
  }[state];
};

export const statusIcon = (state: number) => {
  return {
    1: "gg:check-o",
    2: "ic:outline-cancel",
    3: "ic:outline-pending",
  }[state];
};
