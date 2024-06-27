import type { RecoverUserInputType } from "~/modules/Recover/resolver";

export type RecoverFormProps = {
  onSubmit: (payload: RecoverUserInputType) => void | Promise<void>;
  onGoToVerifyCodeStep: VoidFunction;
};
