"use client";
import { Icon } from "@iconify/react/dist/iconify.js";
import clsx from "clsx";
import { motion } from "framer-motion";

type Props = {
  ulClassName?: string;
  ulRef?: React.RefObject<HTMLUListElement>;
  list: any[];
  onSelected: (item: any) => void;
  isSelected: (value: any) => boolean;
  keyLabel: string;
  keyValue: string;
  changeSelected?: (value: any) => void;
};

export const List = ({
  ulClassName,
  list,
  ulRef,
  onSelected,
  isSelected,
  keyLabel,
  keyValue,
  changeSelected,
}: Props) => {
  return (
    <ul
      className={clsx(
        "absolute bottom-20 h-auto w-full overflow-hidden rounded-lg bg-white",
        ulClassName,
      )}
      ref={ulRef}
    >
      {list.map((item, i) => {
        return (
          <motion.li
            key={item[keyLabel]}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={() => {
              onSelected?.(item);
              // changeSelected?.(item[keyValue]);
            }}
            className="relative flex items-center justify-between px-4 py-2 hover:bg-blue-200"
          >
            {i !== 0 && (
              <hr className="absolute left-4 right-4 top-0 opacity-40" />
            )}
            <span
              className={clsx(
                "cursor-pointer select-none",
                isSelected(item[keyValue]) && "font-medium",
              )}
            >
              {item[keyLabel]}
            </span>
            {isSelected(item[keyValue]) && (
              <Icon
                icon="bi:check2-circle"
                className="text-green-500"
                width={24}
              />
            )}
          </motion.li>
        );
      })}
    </ul>
  );
};

export default List;
