import { Dispatch, SetStateAction } from "react";

export interface TopContentProps {
  keySearch: string[];
  title: string;
  hasSearch?: boolean;
  hasExport?: boolean;
  hasNew?: boolean;
  lenght?: number;
  redirectTo?: string;
  filterValue?: string;
  setFilterValue?: Dispatch<SetStateAction<string>>;
  setPage?: Dispatch<SetStateAction<number>>;
  setRowsPerPage?: Dispatch<SetStateAction<number>>;
  newButtonText?: string;
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
  buttonNewText?: string;
  buttonNewLink?: string;
  hasNew?: boolean;
  filterKeys?: string | string[];
  renderCell?: (item: any, columnKey: any) => void;
  inputPlaceholder?: string;
  data: T[];
}
