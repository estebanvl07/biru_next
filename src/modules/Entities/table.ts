const columns = [
  {
    name: "ID",
    uid: "id",
    sotring: false,
  },
  {
    name: "ENTIDAD",
    uid: "name",
    sotring: true,
  },
  {
    name: "REFERENCIA",
    uid: "reference",
    sotring: true,
  },
  {
    name: "ESTADO",
    uid: "state",
    sotring: true,
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
    sotring: true,
  },
  {
    name: "REFERENCIA",
    uid: "reference",
    sotring: true,
  },
  {
    name: "DESCRIPCION",
    uid: "description",
    sotring: true,
  },
  {
    name: "TIPO",
    uid: "type",
    sotring: true,
  },
  {
    name: "ACCIONES",
    uid: "actions",
    sotring: true,
  },
];
export { columns, detailColumns };
