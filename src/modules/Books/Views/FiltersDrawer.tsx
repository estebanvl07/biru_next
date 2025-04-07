"use client";

import type React from "react";

import { Briefcase, Check, Filter, Home, PlusIcon, Users } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";
import { Button } from "@heroui/button";
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  Input,
  RadioGroup,
  useDisclosure,
} from "@heroui/react";

import { Icon } from "@iconify/react/dist/iconify.js";

interface FiltersDrawerProps {
  mode: number;
  setMode: Dispatch<SetStateAction<number>>;
  orderBy: "activity" | "name";
  setOrderBy: Dispatch<SetStateAction<"activity" | "name">>;
}

export function FiltersDrawer({
  mode,
  setMode,
  orderBy,
  setOrderBy,
}: FiltersDrawerProps) {
  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <>
      <Button
        className="w-full border border-divider"
        onPress={() => onOpen()}
        color="default"
        isIconOnly
        startContent={<Filter className="h-4 w-4" />}
      ></Button>
      <Drawer placement={"bottom"} isOpen={isOpen} onOpenChange={onClose}>
        <DrawerContent className="font-montserrat">
          {(onClose) => (
            <>
              <DrawerBody className="px-0 text-base">
                <ul className="flex flex-col border-b [&>li]:px-4 [&>li]:py-4">
                  <li
                    className="flex items-center justify-between gap-x-8"
                    onClick={() => setOrderBy("activity")}
                  >
                    <p>Ordenar por actividad</p>
                    {orderBy === "activity" && <Check size={18} />}
                  </li>
                  <li
                    className="flex items-center justify-between gap-x-8"
                    onClick={() => setOrderBy("name")}
                  >
                    <p>Ordenar por nombre</p>
                    {orderBy === "name" && <Check size={18} />}
                  </li>
                </ul>
                <ul className="flex flex-col [&>li]:px-4 [&>li]:py-4">
                  <li
                    className="flex items-center justify-between gap-x-8"
                    onClick={() => setMode(1)}
                  >
                    <aside className="flex items-center gap-x-2">
                      <Icon icon="mingcute:grid-line" width={18} />
                      <p>Vista de Cuadricula</p>
                    </aside>
                    {mode === 1 && <Check size={18} />}
                  </li>
                  <li
                    className="flex items-center justify-between gap-x-8"
                    onClick={() => setMode(2)}
                  >
                    <aside className="flex items-center gap-x-2">
                      <Icon icon="ph:table-fill" width={18} />
                      <p>Vista de Lista</p>
                    </aside>
                    {mode === 2 && <Check size={19} />}
                  </li>
                </ul>
              </DrawerBody>
            </>
          )}
        </DrawerContent>
      </Drawer>
    </>
  );
}
