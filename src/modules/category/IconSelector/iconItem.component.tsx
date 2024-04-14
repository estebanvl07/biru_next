import { Icon } from "@iconify/react/dist/iconify.js";
import { Button } from "~/modules/components";

type Props = {
  path: string;
  setIcon: (icon: string) => void;
};

const IconItem = ({ path, setIcon }: Props) => {
  return (
    <li className="relative flex aspect-square items-center justify-center">
      <Button variantStyle="empty" onClick={() => setIcon(path)}>
        <Icon icon={path} width={32} className="hover:scale-105" />
      </Button>
    </li>
  );
};

export default IconItem;
