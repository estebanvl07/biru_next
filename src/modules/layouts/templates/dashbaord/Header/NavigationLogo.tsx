"use client";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import React from "react";

const NavigationLogo = () => {
  const params = useParams();

  console.log(params);

  return (
    <Link href={params?.acc ? `/account/${params?.acc}/main` : "/account"}>
      <Image src="/logo.svg" alt="Logo de Biru" width={100} height={60} />
    </Link>
  );
};

export default NavigationLogo;
