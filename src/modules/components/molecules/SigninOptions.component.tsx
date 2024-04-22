"use client";

import { Icon } from "@iconify/react/dist/iconify.js";
import { signIn } from "next-auth/react";
import React from "react";
import { Button } from "~/modules/components";
import { CALLBACK_SIGNIN_URL } from "~/lib/constants/config";

const SigninOptions = ({ title }: { title?: string }) => {
  return (
    <div className="flex w-full flex-col items-center gap-3">
      <span className="text-sm">{title ?? "Iniciar con"}</span>
      <section className="flex w-full items-center justify-center overflow-hidden rounded-lg border">
        <Button
          className="w-full flex-1 rounded-none !py-2 hover:bg-slate-100"
          variantStyle="empty"
          onClick={() =>
            signIn("facebook", {
              callbackUrl: CALLBACK_SIGNIN_URL,
              redirect: false,
            })
          }
        >
          <Icon icon="logos:facebook" width={24} /> Facebook
        </Button>
        <span className="block !h-8 border-l"></span>
        <Button
          className="w-full flex-1 rounded-none !py-2 hover:bg-slate-100"
          variantStyle="empty"
          onClick={() =>
            signIn("google", {
              callbackUrl: CALLBACK_SIGNIN_URL,
              redirect: false,
            })
          }
        >
          <Icon icon="flat-color-icons:google" width={24} /> Google
        </Button>
      </section>
    </div>
  );
};

export default SigninOptions;
