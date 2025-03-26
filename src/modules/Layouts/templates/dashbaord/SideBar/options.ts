export const menuOptions = [
  {
    title: "Principal",
    options: [
      {
        id: 325,
        name: "Dashboard",
        icon: "mynaui:panel-left",
        href: "/",
      },
      {
        id: 2,
        name: "Calendario",
        icon: "mynaui:calendar-up",
        href: "/calendar",
      },
    ],
  },
  {
    title: "Finanzas",
    options: [
      {
        id: 1,
        name: "Transacciones",
        icon: "mynaui:arrow-left-right",
        href: "/transactions",
      },
      {
        id: 6,
        name: "Movimientos Fijos",
        icon: "heroicons:wallet-solid",
        href: "/movements",
      },
      {
        id: 3,
        name: "Metas",
        icon: "mynaui:target",
        href: "/goals",
      },
      {
        id: 4,
        name: "Presupuesto",
        icon: "mynaui:bitcoin-circle",
        href: "/budget",
      },
    ],
  },
  {
    title: "Análisis",
    options: [
      {
        id: 1,
        name: "Análisis",
        icon: "mynaui:chart-bubble",
        href: "/analytics",
      },
      {
        id: 2,
        name: "Reportes",
        icon: "mynaui:archive",
        href: "/#",
      },
    ],
  },

  // {
  //   id: 6,
  //   name: "Nóminas",
  //   icon: "solar:calculator-linear",
  //   href: "/bills",
  // },
  // {
  //   id: 7,
  //   name: "Inversiones",
  //   icon: "streamline:investment-selection",
  //   href: "/bills",
  // },
];

export const mobileOptions = [
  {
    id: 1,
    name: "Dashboard",
    icon: "akar-icons:dashboard",
    href: "/",
  },
  {
    id: 2,
    name: "Transacciones",
    icon: "mingcute:transfer-fill",
    href: "/transactions",
  },
  {
    id: 3,
    name: "Metas",
    icon: "ph:target",
    href: "/goals",
  },
  {
    id: 4,
    name: "Entidades",
    icon: "ph:users-bold",
    href: "/entities",
  },
  {
    id: 5,
    name: "Categorías",
    icon: "iconamoon:category",
    href: "/category",
  },
  {
    id: 6,
    name: "Análisis",
    icon: "material-symbols:analytics-outline",
    href: "/analytics",
  },
];
