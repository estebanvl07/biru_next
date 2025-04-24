import { Card, CardBody, CardHeader } from "@heroui/react";
import React from "react";

const SummaryBalance = () => {
  return (
    <Card className="h-full border border-divider px-4 shadow-sm">
      <CardHeader className="flex flex-col items-start  text-start">
        <h3>Balance</h3>
        <h2 className="mt-4 text-4xl font-semibold">$ 4.567.000</h2>
        <p>Lorem ipsum dolor sit amet.</p>
      </CardHeader>
      <CardBody>
        <p>Porcentaje de balance</p>
        <div className="mt-1 flex items-center gap-x-1">
          <span className="h-5 w-7/12 rounded-lg bg-primary transition hover:scale-105"></span>
          <span className="h-5 w-3/12 rounded-lg bg-indigo-500 transition hover:scale-105"></span>
          <span className="h-5 w-2/12 rounded-lg bg-indigo-300 transition hover:scale-105"></span>
        </div>
        <ul className="my-2">
          <li className="flex items-center justify-between border-b border-divider py-3">
            <aside className="flex items-center gap-x-3">
              <div className="h-3 w-3 rounded-full bg-primary" />
              <div>
                <h5>Ingresos</h5>
                <span>70%</span>
              </div>
            </aside>
            <p>$2.567.000</p>
          </li>
          <li className="flex items-center justify-between border-b border-divider py-3">
            <aside className="flex items-center gap-x-3">
              <div className="h-3 w-3 rounded-full bg-primary" />
              <div>
                <h5>Egresos</h5>
                <span>30%</span>
              </div>
            </aside>
            <p>$1.567.000</p>
          </li>
          <li className="flex items-center justify-between border-divider py-3 ">
            <aside className="flex items-center gap-x-3">
              <div className="h-3 w-3 rounded-full bg-primary" />
              <div>
                <h5>Ahorro</h5>
                <span>20%</span>
              </div>
            </aside>
            <p>$900.000</p>
          </li>
        </ul>
      </CardBody>
    </Card>
  );
};

export default SummaryBalance;
