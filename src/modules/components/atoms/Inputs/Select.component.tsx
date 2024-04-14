"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import clsx from "clsx";
import { Icon } from "@iconify/react/dist/iconify.js";

import { Input } from "~/modules/components";
// import { Button } from "..";

import type { ISelectProps } from "~/types/component/input.types";

import { useOutsideClick } from "~/lib/hooks";
import useInputSearch from "~/lib/hooks/useInputSearch";

import { ISelectOptions } from "~/types/root.types";
import { Dropdown } from "primereact/dropdown";

const Select = ({
  options,
  setOption,
  changeOption,
  UListClassName,
  optionListClassName,
  directionList = "bottom",
  defaultValue,
  readOnly,
  label,
  ...props
}: ISelectProps) => {
  const [showOptions, setShowOptions] = useState<boolean>(false);
  const [query, setQuery] = useState<string>("");
  const { newList, onSearch, refreshList } = useInputSearch({
    data: options,
    key: "name",
  });

  const closeOptions = () => {
    setShowOptions(false);
  };

  const optionsRef = useOutsideClick<HTMLDivElement>(closeOptions);

  const handleCLickOption = (option: ISelectOptions) => {
    setQuery(option.name);
    changeOption(option);
    refreshList();
    closeOptions();
  };

  const onClean = () => {
    setQuery("");
    refreshList();
    changeOption({
      name: "",
      value: "",
    });
  };

  const onValidityOption = () => {
    const option = options.find((item) => item.name === query);
    if (!option) {
      setQuery("");
      refreshList();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    onSearch(e);
    setQuery(value);
    if (value !== "") {
      setShowOptions(true);
      return;
    }

    refreshList();
  };

  const handleDefaultValue = () => {
    if (defaultValue) {
      // console.log(options);
      options.find((opt) => opt.value == defaultValue && setQuery(opt.name));
    }
  };

  useEffect(() => {
    if (setOption) {
      options.find((opt) => opt.value == setOption && setQuery(opt.name));
    }
  }, [setOption]);

  useEffect(() => {
    handleDefaultValue();
  }, []);

  return (
    <div className="relative flex w-full items-center" ref={optionsRef}>
      <Input
        readOnly={readOnly}
        onChange={handleInputChange}
        value={query}
        label={label}
        autoComplete="off"
        type="text"
        onFocus={() => {
          if (!readOnly) setShowOptions(!showOptions);
        }}
        onBlur={() => onValidityOption()}
        {...props}
      >
        <button
          className="absolute right-4 top-3 transition-transform hover:-rotate-6"
          type="button"
          onClick={onClean}
        >
          <Icon icon="healthicons:cleaning-outline" width={26} />
        </button>
      </Input>

      <motion.ul
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className={clsx(
          "scrollbar-y-customize absolute z-20 flex max-h-64 w-full flex-col overflow-auto rounded-lg border bg-white text-sm shadow-2xl dark:border-white/10 dark:bg-slate-900",
          UListClassName,
          {
            "!top-[60px]": directionList === "bottom" && label,
            "!bottom-[60px]": directionList === "top" && label,
            "!top-[45px]": directionList === "bottom" && !label,
            "!bottom-[45px]": directionList === "top" && !label,
            hidden: !showOptions,
          },
        )}
      >
        {newList.map((option) => {
          return (
            <div key={option.value}>
              <li
                className={clsx(
                  "px-4 py-[10px] hover:cursor-pointer hover:bg-gray-100 dark:hover:bg-slate-600/50",
                  optionListClassName,
                  {
                    "bg-gray-100 dark:bg-black/25": option.name === query,
                  },
                )}
                onClick={() => {
                  handleCLickOption(option);
                }}
              >
                {option.name}
              </li>
            </div>
          );
        })}
        {newList.length === 0 && (
          <p className="py-3 text-center text-sm text-zinc-400">
            No se encontraron resultados
          </p>
        )}
      </motion.ul>
    </div>
  );
};

export default Select;
