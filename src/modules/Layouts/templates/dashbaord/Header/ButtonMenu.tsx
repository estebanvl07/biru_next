import { Icon } from "@iconify/react/dist/iconify.js";
import { Button } from "@heroui/button";
import React, { useState } from "react";
import { useOutsideClick } from "~/lib/hooks";
import Menu from "./Menu/Menu";

const ButtonMenu = () => {
  const [showSideBar, setShowSideBar] = useState<boolean>(false);
  const menuRef = useOutsideClick<HTMLDivElement>(() => setShowSideBar(false));

  return (
    <div ref={menuRef} className="relative">
      <Button
        variant="bordered"
        isIconOnly
        radius="full"
        className="border-none bg-default-100"
        onClick={() => {
          setShowSideBar(!showSideBar);
        }}
      >
        <Icon icon="iconamoon:menu-burger-horizontal-bold" width={20} />
      </Button>
      {showSideBar && (
        <Menu
          className="absolute right-0 top-12 !w-44 border bg-white shadow-xl dark:border-white"
          onHide={() => setShowSideBar(false)}
        />
      )}
    </div>
  );
};

export default ButtonMenu;
