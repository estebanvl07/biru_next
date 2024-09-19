import React from "react";
import { Table } from "../components";

const IncomeTable = () => {
  return (
    <div>
      <Table
        headerConfig={{}}
        data={[]}
        columns={[
          {
            uid: "t",
            name: "TRANSACCIÓN",
          },
          {
            uid: "t",
            name: "CATEGORÍA",
          },
          {
            uid: "t",
            name: "MONTO",
          },
          {
            uid: "t",
            name: "ENTIDAD",
          },
          {
            uid: "t",
            name: "ACCION",
          },
        ]}
      />
    </div>
  );
};

export default IncomeTable;
