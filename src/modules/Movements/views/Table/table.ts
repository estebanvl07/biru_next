const columns = [
  {
    name: "Nombre",
    uid: "name",
    sortable: true,
  },
  {
    name: "Categoría",
    uid: "categoryId",
    sortable: true,
  },
  {
    name: "Tipo",
    uid: "type",
  },
  {
    name: "Siguiente Ocurrencia",
    uid: "next_ocurrence",
    sortable: true,
  },
  {
    name: "Estado",
    uid: "status",
    sortable: true,
  },
  {
    name: "Acciones",
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
