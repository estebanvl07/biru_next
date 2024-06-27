import { toast } from "sonner";
import { api } from "~/utils/api";
import type { RecoverFormProps } from "../components";
import { useState } from "react";
import type {
  VerifyCodeFormProps,
  ChangePasswordFormProps,
} from "../components";
import { useRouter } from "next/router";

enum RecoveryUserSteps {
  RECOVER_USER = 1,
  VERIFY_CODE = 2,
  CHANGE_PASSWORD = 3,
}

export const useRecoveryUser = () => {
  const [step, setStep] = useState(RecoveryUserSteps.RECOVER_USER);
  const [recoveryEmail, setRecoveryEmail] = useState("");
  const router = useRouter();

  const { mutateAsync: recoverUser } = api.users.recover.useMutation({
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess() {
      setStep(RecoveryUserSteps.VERIFY_CODE);
    },
  });

  const {
    mutateAsync: recoverVerifyUser,
    data: token,
    isSuccess: hasToken,
  } = api.users.recoverVerify.useMutation({
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess() {
      setStep(RecoveryUserSteps.CHANGE_PASSWORD);
    },
  });

  const { mutateAsync: changePassword } =
    api.users.recoverChangePassword.useMutation({
      onError: (error) => {
        toast.error(error.message);
      },
      onSuccess() {
        toast.success("Contraseña actualizada correctamente");
        void router.push("/login");
        setStep(RecoveryUserSteps.RECOVER_USER);
      },
    });

  const onRecoverUserSubmit: RecoverFormProps["onSubmit"] = async (data) => {
    try {
      await recoverUser(data);
      setRecoveryEmail(data.email);
    } catch {}
  };

  const onRecoverVerifyCodeSubmit: VerifyCodeFormProps["onSubmit"] = async (
    data,
  ) => {
    try {
      await recoverVerifyUser(data);
    } catch {}
  };

  const onChangePasswordSubmit: ChangePasswordFormProps["onSubmit"] = async (
    data,
  ) => {
    try {
      if (hasToken) {
        await changePassword({
          password: data.password,
          token,
        });
      }
    } catch {}
  };

  const goToVerifyCodeStep = () => {
    setRecoveryEmail("");
    setStep(RecoveryUserSteps.VERIFY_CODE);
  };

  const goToRecoverUserStep = () => {
    setStep(RecoveryUserSteps.RECOVER_USER);
  };

  const isRecoverUserStep = step === RecoveryUserSteps.RECOVER_USER;
  const isVerifyCodeStep = step === RecoveryUserSteps.VERIFY_CODE;
  const isChangePasswordStep = step === RecoveryUserSteps.CHANGE_PASSWORD;

  return {
    isRecoverUserStep,
    isVerifyCodeStep,
    isChangePasswordStep,
    onRecoverUserSubmit,
    onRecoverVerifyCodeSubmit,
    onChangePasswordSubmit,
    goToVerifyCodeStep,
    goToRecoverUserStep,
    recoveryEmail,
  };
};
