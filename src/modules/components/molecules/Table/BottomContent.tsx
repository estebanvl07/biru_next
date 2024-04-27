import { Button, Pagination } from "@nextui-org/react";
import React, { Dispatch, SetStateAction } from "react";

interface BottomContentProps {
  onPreviousPage: () => void;
  onNextPage: () => void;
  page: number;
  pages: number;
  setPage: Dispatch<SetStateAction<number>>;
}

const BottomContent = React.memo(
  ({
    onNextPage,
    onPreviousPage,
    page,
    pages,
    setPage,
  }: BottomContentProps) => {
    return (
      <div className="flex items-center justify-between px-2 py-2">
        <Pagination
          isCompact
          showControls
          showShadow
          color="primary"
          page={page}
          total={pages}
          onChange={setPage}
        />
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
      </div>
    );
  },
);

export default BottomContent;
