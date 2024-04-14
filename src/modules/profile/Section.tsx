import React from "react";
import { Button } from "~/modules/components";

interface SectionsProps {
  title?: string;
  options: any[];
}

const Section = ({ title, options }: SectionsProps) => {
  return (
    <section className="mb-4">
      {title && (
        <h4 className="mb-2 font-semibold text-primary dark:text-indigo-300">
          {title}
        </h4>
      )}
      <ul className="rounded-lg bg-white dark:bg-slate-900">
        {options.map((item, index) => {
          return (
            <li key={item.id} className="flex justify-between !px-6 !py-3">
              <Button
                variantStyle="empty"
                className="flex w-full justify-between !text-base "
                onClick={item.onclick}
              >
                {item.text}
              </Button>
              {item.icon}
              {index + 1 !== options.length && (
                <hr className="mx-4 bg-slate-50 dark:opacity-20" />
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default Section;
