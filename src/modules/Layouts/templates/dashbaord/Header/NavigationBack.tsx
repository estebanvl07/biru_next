"use client";
import { Icon } from "@iconify/react/dist/iconify.js";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

const NavigationBack = ({ width = 24 }: { width?: number }) => {
  const router = useRouter();
  const pathname = usePathname();

  const onGoBack = () => {
    router.back();
  };

  if (pathname === "/account") return null;

  return (
    <button onClick={onGoBack}>
      <Icon
        icon="la:angle-left"
        className="dark:text-slate-300"
        width={width}
      />
    </button>
  );
};

export default NavigationBack;
