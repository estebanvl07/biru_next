import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";

import { useParams } from "next/navigation";

import { useThemeContext } from "~/lib/context/Theme.context";

const NavigationLogo = ({
  className,
  isExpanded,
}: {
  className?: string;
  isExpanded: boolean;
}) => {
  const { theme } = useThemeContext();
  const params = useParams();

  const srcminimal = {
    light: "/logo.svg",
    dark: "/logo-white.svg",
  }[theme];

  return (
    <Link
      href={params?.acc ? `/account/${params?.acc}/main` : "/account"}
      className={clsx("flex items-center gap-2", className)}
    >
      <Image src={srcminimal} alt="Logo de Biru" width={25} height={35} />
      {isExpanded && <span className="text-xl font-medium">Biru</span>}
    </Link>
  );
};

export default NavigationLogo;
