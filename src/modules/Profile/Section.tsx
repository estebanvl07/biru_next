import React, { ReactElement } from "react";

import { Icon } from "@iconify/react/dist/iconify.js";
import { Listbox, ListboxItem } from "@nextui-org/listbox";

interface SectionsProps {
  title?: string;
  options: {
    id: number;
    onclick?: () => void;
    text: string;
    startContent?: ReactElement;
    endContent?: ReactElement;
    href?: string;
  }[];
}

const Section = ({ title, options }: SectionsProps) => {
  return (
    <section className="mb-4">
      {title && (
        <h4 className="mb-2 font-semibold text-primary dark:text-indigo-300">
          {title}
        </h4>
      )}
      <Listbox aria-label="setting option">
        {options.map((item, index) => {
          return (
            <ListboxItem
              key={item.id}
              variant="flat"
              href={item.href ?? undefined}
              startContent={item.startContent}
              endContent={
                item.endContent ? (
                  item.endContent
                ) : (
                  <Icon icon="mingcute:right-line" width={24} />
                )
              }
              onClick={() => {
                item.onclick && item.onclick();
              }}
              className="flex items-center gap-2"
            >
              {item.text}
            </ListboxItem>
          );
        })}
      </Listbox>
    </section>
  );
};

export default Section;
