import { ColumnsProps } from "~/types/component/table.types";

export const columns: ColumnsProps[] = [
  {
    name: "DESCRIPCIÓN",
    uid: "name",
    sortable: true,
  },
  {
    name: "CATEGORÍA",
    uid: "categoryId",
    sortable: true,
  },
  {
    name: "FECHA",
    uid: "next_ocurrence",
    sortable: true,
  },
  {
    name: "PLAZO",
    uid: "last_ocurrence",
    sortable: true,
  },
  {
    name: "MONTO",
    uid: "amount",
    sortable: true,
  },
  {
    name: "ACCIÓN",
    uid: "action",
    sortable: true,
  },
];
