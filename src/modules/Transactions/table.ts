const columns = [
  {
    name: "Descripción",
    uid: "description",
    sortable: true,
  },
  {
    name: "Entidad",
    uid: "entityId",
  },
  {
    name: "Categoría",
    uid: "category",
  },
  {
    name: "Estado",
    uid: "state",
    sortable: true,
  },
  {
    name: "Tipo",
    uid: "type",
    sortable: true,
  },
  {
    name: "Monto",
    uid: "amount",
    sortable: true,
  },
  {
    name: "Fecha de transacción",
    uid: "date",
    sortable: true,
  },
  {
    name: "Acciones",
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
