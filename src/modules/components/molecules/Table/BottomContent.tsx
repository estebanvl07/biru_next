import { Button, Pagination } from "@nextui-org/react";
import React, { Dispatch, SetStateAction } from "react";
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
            showShadow
            color="primary"
            page={page}
            total={pages}
            onChange={setPage}
          />
        )}
        {navButtons && (
          <div className="hidden w-[30%] justify-end gap-2 sm:flex">
            <Button
              isDisabled={pages === 1}
              size="sm"
              variant="flat"
              onPress={onPreviousPage}
            >
              Previous
            </Button>
            <Button
              isDisabled={pages === 1}
              size="sm"
              variant="flat"
              onPress={onNextPage}
            >
              Next
            </Button>
          </div>
        )}
      </div>
    );
  },
);

export default BottomContent;
