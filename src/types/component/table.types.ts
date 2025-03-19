import { SharedSelection } from "@heroui/system";
import {
  type SelectionMode,
  TableProps as TableHeroProps,
} from "@heroui/table";
import { Dispatch, SetStateAction } from "react";

export type FilterValidate = { by: string; value: string | number };
export interface TopContentProps {
  title?: string;
  hasSearch?: boolean;
  hasExport?: boolean;
  hasNew?: boolean;
  lenght?: number;
  visibleColumns?: SharedSelection;
  setVisibleColumns?: Dispatch<SetStateAction<SharedSelection>>;
  redirectTo?: string;
  inputPlaceholder?: string;
  columns?: ColumnsProps[];
  filterBy?: FilterByProps[];
  filterValue?: string;
  setFilterValue?: Dispatch<SetStateAction<string>>;
  onNew?: () => void;
  setPage?: Dispatch<SetStateAction<number>>;
  onChangeFilters: (filters: FilterValidate[]) => void;
  setRowsPerPage?: Dispatch<SetStateAction<number>>;
  newButtonText?: string;
}

export interface BottomConfig {
  hasPagination?: boolean;
  navButtons?: boolean;
}

export type ColumnsProps = {
  uid: string;
  name: string;
  align?: "start" | "center" | "end";
  sortable?: boolean;
};

export type FilterByProps = {
  by: string;
  title: string;
  selectionMode?: SelectionMode;
  onChangeFilters?: (opt: FilterValidate) => void;
  options: { text: string; value: string | number }[];
};
export interface TableProps<T> extends Omit<TableHeroProps<T>, "children"> {
  headerConfig: Omit<
    TopContentProps,
    | "columns"
    | "filterBy"
    | "onChangeFilters"
    | "setVisibleColumns"
    | "visibleColumns"
  >;
  columns: ColumnsProps[];
  footerConfig?: BottomConfig;
  hasTopContent?: boolean;
  hasBottomContent?: boolean;
  filterBy?: FilterByProps[];
  filterKeys?: string | string[];
  renderCell?: (item: any, columnKey: any) => void;
  isLoading?: boolean;
  removeWrapper?: boolean;
  data: T[];
}

export interface BottomContentProps extends BottomConfig {
  onPreviousPage: () => void;
  onNextPage: () => void;
  page: number;
  pages: number;
  setPage: Dispatch<SetStateAction<number>>;
}
