import React from "react";

import { useRecoveryUser } from "~/modules/Recover/hooks";
import { BasicLayout } from "~/modules/Layouts";

import {
  RecoverForm,
  VerifyCodeForm,
  ChangePasswordForm,
} from "~/modules/Recover/components";

export async function getStaticProps() {
  return {
    props: {},
  };
}

export const RecoverPage = () => {
  const {
    isRecoverUserStep,
    isVerifyCodeStep,
    isChangePasswordStep,
    onChangePasswordSubmit,
    onRecoverUserSubmit,
    onRecoverVerifyCodeSubmit,
    goToVerifyCodeStep,
    goToRecoverUserStep,
    recoveryEmail,
  } = useRecoveryUser();
  // PWA

  return (
    <BasicLayout
      title="Recuperar contraseña"
      description="¿Olvidaste tu contraseña?, no te preocupes, te ayudaremos a recuperarla"
    >
      {isRecoverUserStep && (
        <RecoverForm
          onSubmit={onRecoverUserSubmit}
          onGoToVerifyCodeStep={goToVerifyCodeStep}
        />
      )}
      {isVerifyCodeStep && (
        <VerifyCodeForm
          onSubmit={onRecoverVerifyCodeSubmit}
          onGoBack={goToRecoverUserStep}
          email={recoveryEmail}
        />
      )}
      {isChangePasswordStep && (
        <ChangePasswordForm onSubmit={onChangePasswordSubmit} />
      )}
    </BasicLayout>
  );
};

export default RecoverPage;
