import React from "react";
import OptionItem from "./OptionItem";

const OptionsList = ({ list }: { list: any }) => {
  return (
    <ul className="mb-4 flex flex-col gap-1 font-normal text-zinc-800 dark:text-white">
      <span className="mb-2 text-sm text-black/70 dark:text-white/70">
        {list.title}
      </span>
      {list.menus.map((item: any) => {
        return <OptionItem key={item.id} item={item} />;
      })}
    </ul>
  );
};

export default OptionsList;
