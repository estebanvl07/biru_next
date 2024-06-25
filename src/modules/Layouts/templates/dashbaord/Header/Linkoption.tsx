import { Icon } from "@iconify/react/dist/iconify.js";
import Link from "next/link";
import { ListMenu } from "~/types/root.types";

interface LinkPops extends ListMenu {
  onHide?: () => void;
}

const LinkOption = ({ href, label, icon, onClick, onHide }: LinkPops) => {
  return (
    <Link href={href ?? "#"} onClick={onHide}>
      <li
        className="flex w-full items-center gap-2 px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-slate-950"
        onClick={onClick}
      >
        {icon && <Icon icon={icon} width={18} />}
        <span>{label}</span>
      </li>
    </Link>
  );
};

export default LinkOption;
