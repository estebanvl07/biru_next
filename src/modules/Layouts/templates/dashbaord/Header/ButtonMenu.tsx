import { Icon } from "@iconify/react/dist/iconify.js";
import { Button } from "@heroui/button";
import { useDisclosure } from "@heroui/modal";
import { Drawer, DrawerBody, DrawerContent } from "@heroui/drawer";
import MenuContent from "./Menu/MenuContent";

const ButtonMenu = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <>
      <Button
        variant="bordered"
        isIconOnly
        radius="full"
        className="border-none bg-default-100"
        onPress={onOpen}
      >
        <Icon icon="iconamoon:menu-burger-horizontal-bold" width={20} />
      </Button>
      <Drawer isOpen={isOpen} onClose={onClose} size="md" placement="top">
        <DrawerContent className="pb-4 font-montserrat">
          <DrawerBody>
            <MenuContent onHide={onClose} />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default ButtonMenu;
