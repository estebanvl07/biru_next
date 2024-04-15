"use client";
import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useState } from "react";
import { useOutsideClick } from "~/lib/hooks";
import { motion } from "framer-motion";
import LinkOption from "../Linkoption";
import { ListMenu } from "~/types/root.types";
import { useParams } from "next/navigation";

const CreationMenu = () => {
  const [showMenu, setShowMenu] = useState(false);
  const ref = useOutsideClick<HTMLDivElement>(() => setShowMenu(false));
  const { acc } = useParams();

  const BASIC_URL = `/account/${acc}/`;

  const options: ListMenu[][] = [
    [
      {
        label: "Ingreso",
        icon: "mdi:cash-plus",
        href: `${BASIC_URL}transactions/new`,
      },
      {
        label: "Egreso",
        icon: "mdi:cash-minus",
        href: `${BASIC_URL}transactions/new?type=2`,
      },
    ],
    [
      {
        label: "Categoria",
        icon: "iconamoon:category",
        href: `${BASIC_URL}category/new`,
      },
      {
        label: "Usuario",
        icon: "mdi:user-outline",
        href: `${BASIC_URL}category`,
      },
    ],
  ];

  return (
    <div ref={ref} className="relative flex items-center">
      <button
        // className="flex !h-8 !w-8 items-center justify-center rounded-full border"
        title="Crear"
        onClick={() => setShowMenu(!showMenu)}
      >
        <Icon icon="uil:plus-circle" className="text-primary" width={24} />
      </button>
      {showMenu && (
        <motion.div className="absolute right-0 top-12 flex w-[165px] flex-col rounded-md border bg-white py-2 shadow-xl dark:border-white/10 dark:bg-slate-900">
          <ul className="flex w-full flex-col">
            {options.map((arr, index) => {
              return (
                <div key={index}>
                  {arr.map((option) => {
                    return (
                      <LinkOption
                        onHide={() => setShowMenu(false)}
                        key={option.label}
                        {...option}
                      />
                    );
                  })}
                  {index !== options.length - 1 && <hr className="my-2" />}
                </div>
              );
            })}
          </ul>
        </motion.div>
      )}
    </div>
  );
};

export default CreationMenu;
