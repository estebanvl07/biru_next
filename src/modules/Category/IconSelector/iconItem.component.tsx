import { Icon } from "@iconify/react/dist/iconify.js";

type Props = {
  path: string;
  setIcon: (icon: string) => void;
};

const IconItem = ({ path, setIcon }: Props) => {
  return (
    <li className="relative flex aspect-square items-center justify-center">
      <button onClick={() => setIcon(path)}>
        <Icon icon={path} width={32} className="hover:scale-105" />
      </button>
    </li>
  );
};

export default IconItem;
