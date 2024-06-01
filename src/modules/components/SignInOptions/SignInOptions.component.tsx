"use client";

import { Icon } from "@iconify/react/dist/iconify.js";
import { signIn } from "next-auth/react";
import React from "react";
import { CALLBACK_SIGN_IN_URL } from "~/lib/constants/config";
import { Button, ButtonGroup } from "@nextui-org/button";

const SignInOptions = ({ title }: { title?: string }) => {
  return (
    <div className="flex w-full flex-col items-center gap-3">
      <span className="text-sm">{title ?? "Iniciar con"}</span>
      <ButtonGroup className="w-full">
        <Button
          className="w-full bg-default-100"
          onClick={() =>
            signIn("facebook", {
              callbackUrl: CALLBACK_SIGN_IN_URL,
              redirect: false,
            })
          }
        >
          <Icon icon="logos:facebook" width={24} /> Facebook
        </Button>
        <Button
          className="w-full bg-default-100"
          onClick={() =>
            signIn("google", {
              callbackUrl: CALLBACK_SIGN_IN_URL,
              redirect: false,
            })
          }
        >
          <Icon icon="flat-color-icons:google" width={24} /> Google
        </Button>
      </ButtonGroup>
    </div>
  );
};

export default SignInOptions;
