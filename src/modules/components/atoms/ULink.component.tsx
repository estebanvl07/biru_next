import Link from "next/link";

type Props = {
  children: React.ReactNode;
  href: string;
};

const ULink = ({ children, href }: Props) => {
  return <Link href={href}>{children}</Link>;
};

export default ULink;
