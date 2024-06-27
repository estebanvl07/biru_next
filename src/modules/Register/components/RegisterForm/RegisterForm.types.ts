import type { RegisterUserInputType } from "~/modules/Register/resolver";

export type RegisterFormProps = {
  onSubmit: (payload: RegisterUserInputType) => void | Promise<void>;
};
