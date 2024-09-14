import { Icon } from "@iconify/react/dist/iconify.js";
import { Tooltip } from "@nextui-org/react";

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
      {children}
      {hasView && (
        <Tooltip content={detailText} className="font-montserrat">
          <span
            className="cursor-pointer text-lg text-default-400 active:opacity-50"
            onClick={onClickView}
          >
            <Icon icon="ph:eye" width={24} />
          </span>
        </Tooltip>
      )}
      {hasEdit && (
        <Tooltip content={editText} className="font-montserrat">
          <span
            className="cursor-pointer text-lg text-default-400 active:opacity-50"
            onClick={onClickEdit}
          >
            <Icon icon="akar-icons:edit" width={24} />
          </span>
        </Tooltip>
      )}
      {hasDelete && (
        <Tooltip
          color="danger"
          content={deleteText}
          className="font-montserrat"
        >
          <span
            className="cursor-pointer text-lg text-danger active:opacity-50"
            onClick={onClickDelete}
          >
            <Icon icon="tabler:trash" width={24} />
          </span>
        </Tooltip>
      )}
    </div>
  );
};

export default Actions;
