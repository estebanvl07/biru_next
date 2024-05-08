export type ActivationStatus = "success" | "error";

export type ActivationProps = {
  valid?: boolean;
};

export type ActivationStatusProps = {
  status: ActivationStatus;
};
