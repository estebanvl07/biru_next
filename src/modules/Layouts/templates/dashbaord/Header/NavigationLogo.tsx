import Image from "next/image";
import Link from "next/link";

import { useParams } from "next/navigation";

import { useThemeContext } from "~/lib/context/Theme.context";

const NavigationLogo = ({ className, isExpanded }: { className?: string, isExpanded: boolean }) => {
  const { theme } = useThemeContext();
  const params = useParams();

  const src = {
    light: "/logo.svg",
    dark: "/logo-dark.svg",
  }[theme];

  const srcminimal = {
    light: "/minimal-logo.svg",
    dark: "/minimal-logo-dark.svg",
  }[theme]

  return (
    <Link href={params?.acc ? `/account/${params?.acc}/main` : "/account"} className={className}>
      <Image src={isExpanded ? src : srcminimal} alt="Logo de Biru" width={isExpanded ? 110 : 40} height={60} />
    </Link>
  );
};

export default NavigationLogo;
