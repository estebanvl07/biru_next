import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "~/modules/components";

const Header = () => {
  return (
    <header className="w-full px-2 sm:px-0">
      <div className="mx-auto flex max-w-[72rem] items-center justify-between gap-x-8 py-4 md:px-8">
        <Link href="/">
          <Image src="/logo.svg" alt="Logo de Biru" width={120} height={60} />
        </Link>
        <div className="flex gap-2">
          <Link href="/register">
            <Button variantStyle="outline">Registrarme</Button>
          </Link>
          <Link href="/login">
            <Button>Ingresar</Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
