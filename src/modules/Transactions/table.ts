const columns = [
  {
    name: "ID",
    uid: "id",
    sortable: false,
  },
  {
    name: "DESCRIPTION",
    uid: "amount",
    sortable: true,
  },
  {
    name: "CATEGORIA",
    uid: "category",
  },
  {
    name: "ESTADO",
    uid: "state",
    sortable: true,
  },
  {
    name: "TIPO",
    uid: "type",
    sortable: true,
  },
  {
    name: "FECHA DE TRANSACCION",
    uid: "date",
    sortable: true,
  },
  {
    name: "ACTIONS",
    uid: "actions",
  },
];

export const basicColumns = [
  {
    name: "ID",
    uid: "id",
    sortable: false,
  },
  {
    name: "TRANSACCION",
    uid: "amount",
    sortable: true,
  },
  {
    name: "TIPO",
    uid: "type",
    sortable: true,
  },
  {
    name: "FECHA DE TRANSACCION",
    uid: "date",
  },
  {
    name: "ACTIONS",
    uid: "actions",
  },
];

const dashboardColumns = [
  {
    name: "DESCRIPTION",
    uid: "description",
    sortable: true,
  },
  {
    name: "CUENTA",
    uid: "accountId",
  },
  {
    name: "FECHA",
    uid: "createdAt",
  },
];

export { columns, dashboardColumns };
