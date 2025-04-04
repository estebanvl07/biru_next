import { Button, Pagination } from "@heroui/react";
import { MoveLeft, MoveRight } from "lucide-react";
import React from "react";
import { BottomContentProps } from "~/types/component/table.types";

const BottomContent = React.memo(
  ({
    onNextPage,
    onPreviousPage,
    page,
    pages,
    setPage,
    hasPagination = true,
    navButtons = true,
  }: BottomContentProps) => {
    return (
      <div className="flex items-center justify-between px-2 py-2">
        {hasPagination && (
          <Pagination
            isCompact
            showControls
            showShadow={false}
            color="primary"
            page={page}
            total={pages}
            onChange={setPage}
          />
        )}
        {navButtons && (
          <div className="hidden w-[30%] justify-end gap-2 sm:flex">
            <Button isDisabled={pages === 1} size="sm" onPress={onPreviousPage}>
              <MoveLeft width={16} />
            </Button>
            <Button isDisabled={pages === 1} size="sm" onPress={onNextPage}>
              <MoveRight width={16} />
            </Button>
          </div>
        )}
      </div>
    );
  },
);

export default BottomContent;
