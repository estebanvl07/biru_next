const columns = [
  {
    name: "ID",
    uid: "id",
    sortable: false,
  },
  {
    name: "NOMBRE",
    uid: "name",
    sortable: true,
  },
  {
    name: "CATEGORÍA",
    uid: "categoryId",
    sortable: true,
  },
  {
    name: "TIPO",
    uid: "type",
  },
  {
    name: "SIGUIENTE OCURRENCIA",
    uid: "next_ocurrence",
    sortable: true,
  },
  {
    name: "ESTADO",
    uid: "status",
    sortable: true,
  },
  {
    name: "ACTIONS",
    uid: "actions",
  },
];

const detailColumns = [
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
    uid: "date",
  },
  {
    name: "ACTIONS",
    uid: "actions",
  },
];

export { columns, detailColumns };
