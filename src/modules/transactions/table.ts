import { useCallback } from "react";
import { Transaction } from "@prisma/client";

const columns = [
  {
    name: "ID",
    uid: "id",
    sortable: false,
  },
  {
    name: "DESCRIPTION",
    uid: "description",
    sortable: true,
  },
  {
    name: "CATEGORIA",
    uid: "category",
    sortable: true,
  },
  {
    name: "TIPO",
    uid: "type",
    sortable: true,
  },
  {
    name: "FECHA DE TRANSACCION",
    uid: "createdAt",
  },
  {
    name: "ACTIONS",
    uid: "actions",
  },
];

export { columns };
