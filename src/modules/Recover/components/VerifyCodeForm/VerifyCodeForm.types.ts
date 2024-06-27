import type { VerifyCodeInputType } from "~/modules/Recover/resolver";

export type VerifyCodeFormProps = {
  onSubmit: (payload: VerifyCodeInputType) => void | Promise<void>;
  onGoBack: VoidFunction;
  email: string;
};
