const columns = [
  {
    name: "ID",
    uid: "id",
    sortable: false,
  },
  {
    name: "ENTIDAD",
    uid: "name",
    sortable: true,
  },
  {
    name: "REFERENCIA",
    uid: "reference",
    sortable: true,
  },
  {
    name: "ESTADO",
    uid: "state",
    sortable: true,
  },
  {
    name: "FECHA DE CREACIÓN",
    uid: "createdAt",
  },
  {
    name: "ACTIONS",
    uid: "actions",
  },
];

const detailColumns = [
  {
    name: "TRANSACCIÓN",
    uid: "amount",
    sortable: true,
  },
  {
    name: "REFERENCIA",
    uid: "reference",
    sortable: true,
  },
  {
    name: "DESCRIPCION",
    uid: "description",
    sortable: true,
  },
  {
    name: "TIPO",
    uid: "type",
    sortable: true,
  },
  {
    name: "ACCIONES",
    uid: "actions",
    sortable: true,
  },
];
export { columns, detailColumns };
