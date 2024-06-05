import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

import { useParams } from "next/navigation";

import { useThemeContext } from "~/lib/context/themeContext";

const NavigationLogo = () => {
  const { theme } = useThemeContext();
  const params = useParams();

  const src = {
    light: "/logo.svg",
    dark: "/logo-dark.svg"
  }[theme]

  return (
    <Link href={params?.acc ? `/account/${params?.acc}/main` : "/account"}>
      <Image src={src} alt="Logo de Biru" width={100} height={60} />
    </Link>
  );
};

export default NavigationLogo;
