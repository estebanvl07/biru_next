import { Dispatch, SetStateAction } from "react";

export interface TopContentProps {
  title?: string;
  hasSearch?: boolean;
  hasExport?: boolean;
  hasNew?: boolean;
  lenght?: number;
  redirectTo?: string;
  inputPlaceholder?: string;
  filterValue?: string;
  setFilterValue?: Dispatch<SetStateAction<string>>;
  setPage?: Dispatch<SetStateAction<number>>;
  setRowsPerPage?: Dispatch<SetStateAction<number>>;
  newButtonText?: string;
}

export interface BottomConfig {
  hasPagination?: boolean;
  navButtons?: boolean;
}

type ColumnsProps = {
  uid: string;
  name: string;
  align?: "start" | "center" | "end";
  sorting?: boolean;
};

export interface TableProps<T> {
  headerConfig: TopContentProps;
  columns: ColumnsProps[];
  footerConfig?: BottomConfig;
  hasTopContent?: boolean;
  hasBottomContent?: boolean;
  filterKeys?: string | string[];
  renderCell?: (item: any, columnKey: any) => void;
  isLoading?: boolean;
  removeWrapper?: boolean
  data: T[];
}

export interface BottomContentProps extends BottomConfig {
  onPreviousPage: () => void;
  onNextPage: () => void;
  page: number;
  pages: number;
  setPage: Dispatch<SetStateAction<number>>;
}
