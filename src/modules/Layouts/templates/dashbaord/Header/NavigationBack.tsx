"use client";
import { Icon } from "@iconify/react/dist/iconify.js";
import { ArrowLeft } from "lucide-react";
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
      <ArrowLeft width={20} />
    </button>
  );
};

export default NavigationBack;
