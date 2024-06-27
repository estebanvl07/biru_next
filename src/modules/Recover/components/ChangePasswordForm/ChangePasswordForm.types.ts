import type { ChangePasswordFormType } from "~/modules/Recover/resolver";

export type ChangePasswordFormProps = {
  onSubmit: (payload: ChangePasswordFormType) => void | Promise<void>;
};
