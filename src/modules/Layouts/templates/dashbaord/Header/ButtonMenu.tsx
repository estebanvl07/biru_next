import { Icon } from "@iconify/react/dist/iconify.js";
import { Button } from "@nextui-org/button";
import React, { useState } from "react";
import { useOutsideClick } from "~/lib/hooks";
import Menu from "./Menu/Menu";

const ButtonMenu = () => {
  const [showSideBar, setShowSideBar] = useState<boolean>(false);
  const menuRef = useOutsideClick<HTMLDivElement>(() => setShowSideBar(false));

  return (
    <div ref={menuRef}>
      <Button
        variant="bordered"
        isIconOnly
        radius="full"
        className="bg-default-100 border-none"
        onClick={() => {
          setShowSideBar(!showSideBar);
        }}
      >
        <Icon icon="iconamoon:menu-burger-horizontal-bold" width={20} />
      </Button>
      {showSideBar && <Menu onHide={() => setShowSideBar(false)} />}
    </div>
  );
};

export default ButtonMenu;
