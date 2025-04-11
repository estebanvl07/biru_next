import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/react";
import clsx from "clsx";
import { Edit2Icon, EllipsisVertical, Eye, Trash2 } from "lucide-react";
import React from "react";

interface ActionsProps {
  detailText?: string;
  editText?: string;
  deleteText?: string;
  hasEdit?: boolean;
  hasDelete?: boolean;
  children?: React.ReactNode;
  hasView?: boolean;
  onClickView?: () => void;
  onClickEdit?: () => void;
  onClickDelete?: () => void;
}

const Actions = ({
  detailText = "Detalle",
  editText = "Editar",
  deleteText = "Eliminar",
  hasEdit = true,
  hasDelete = true,
  hasView = true,
  children,
  onClickView,
  onClickEdit,
  onClickDelete,
}: ActionsProps) => {
  return (
    <div className="relative flex items-center gap-2">
      <Dropdown>
        <DropdownTrigger>
          <EllipsisVertical width={20} />
        </DropdownTrigger>
        <DropdownMenu className="font-montserrat">
          <DropdownItem
            startContent={<Eye width={20} />}
            className={clsx({
              hidden: !hasView,
            })}
            onPress={onClickView}
            key="detail"
          >
            {detailText}
          </DropdownItem>

          <DropdownItem
            startContent={<Edit2Icon width={20} />}
            hidden={!hasEdit}
            className={clsx({
              hidden: !hasEdit,
            })}
            onPress={onClickEdit}
            key="edit"
          >
            {editText}
          </DropdownItem>
          <DropdownItem
            startContent={<Trash2 width={20} />}
            className={clsx({
              hidden: !hasDelete,
            })}
            onPress={onClickDelete}
            key="delete"
          >
            {deleteText}
          </DropdownItem>
          {children as JSX.Element}
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};

export default Actions;
