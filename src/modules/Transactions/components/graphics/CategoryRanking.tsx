import { Card, CardBody, CardHeader } from "@heroui/react";
import React from "react";
import { BarChart } from "~/modules/Charts";

const CategoryRanking = () => {
  return (
    <Card className="h-full border border-divider px-4 py-2 shadow-sm">
      <CardHeader>
        <aside>
          <h2>Ranking de Categorías</h2>
          <p>Conoce las categorías con más egresos realizados.</p>
        </aside>
      </CardHeader>
      <CardBody>
        <BarChart
          position="horizontal"
          heightChart="350"
          keys={["Lun", "Mar", "Mier", "Jue", "Vie", "Sab", "Dom"]}
          hasformatNumber={false}
          series={[
            {
              name: "",
              data: [44, 55, 41, 64, 22, 43, 21],
            },
          ]}
        />
      </CardBody>
    </Card>
  );
};

export default CategoryRanking;
