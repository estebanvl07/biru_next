const columns = [
  {
    name: "ID",
    uid: "id",
    sotring: false,
  },
  {
    name: "Entidad",
    uid: "name",
    sotring: true,
  },
  {
    name: "Referencia",
    uid: "reference",
    sotring: true,
  },
  {
    name: "Tipo",
    uid: "type",
    sotring: true,
  },
  {
    name: "Fecha de creación",
    uid: "createdAt",
  },
  {
    name: "Acciones",
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
