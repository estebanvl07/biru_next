export type OrderComponent = {
  id: number;
  className?: string;
  name: string;
  active: boolean;
};

export const UI_ORDER: OrderComponent[] = [
  {
    id: 1,
    active: true,
    name: "total_balance",
    className: "row-span-1 col-span-1",
  },
  {
    id: 2,
    active: true,
    name: "income_balance",
    className: "row-span-1 col-span-1",
  },
  {
    id: 3,
    active: true,
    name: "egress_balance",
    className: "row-span-1 col-span-1",
  },
  {
    id: 4,
    active: true,
    name: "savings_balance",
    className: "row-span-1 col-span-1",
  },
  {
    id: 5,
    active: true,
    name: "account_balance",
    className: "col-span-2 row-span-2",
  },
  {
    id: 6,
    active: true,
    name: "goal_list",
    className: "row-span-2",
  },
  {
    id: 7,
    active: true,
    name: "balance_by_categories",
    className: "row-span-2",
  },
  {
    id: 8,
    active: true,
    name: "last_transactions",
    className: "col-span-2 row-span-4",
  },
  {
    id: 9,
    active: true,
    name: "quick_transaction",
    className: "col-span-2 row-span-2",
  },
  {
    id: 10,
    active: true,
    name: "categories_percent",
    className: "col-span-2",
  },
  {
    id: 11,
    active: true,
    name: "annual_balance",
    className: "col-span-4 row-span-2",
  },
];
