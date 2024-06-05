export const menuOptions = [
  {
    id: 1,
    title: "",
    menus: [
      {
        id: 1,
        name: "Dashboard",
        icon: "akar-icons:dashboard",
        href: "/main",
      },
    ],
  },
  {
    id: 2,
    title: "Servicios",
    menus: [
      {
        id: 1,
        name: "Transacciones",
        icon: "mingcute:transfer-fill",
        href: "/transactions",
      },
      {
        id: 2,
        name: "Entidades",
        icon: "ph:users-bold",
        href: "/entities",
      },
      {
        id: 3,
        name: "Metas",
        icon: "ph:target",
        href: "/goals",
      },
      {
        id: 4,
        name: "Análisis",
        icon: "material-symbols:analytics-outline",
        href: "/analytics",
      },
      {
        id: 5,
        name: "Categorías",
        icon: "iconamoon:category",
        href: "/category",
      },

      // {
      //   id: 5,
      //   name: "Facturas",
      //   icon: "mingcute:bill-line",
      //   href: "/bills",
      // },
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
      // {
      //   id: 9,
      //   name: "Presupuesto",
      //   icon: "heroicons:currency-dollar",
      //   href: "/bills",
      // },
      // {
      //   id: 5,
      //   name: "Reportes",
      //   icon: "mdi:report-box-outline",
      //   href: "/reports",
      // },
    ],
  },
  {
    id: 3,
    title: "Configuración",
    menus: [
      {
        id: 1,
        name: "Ayuda",
        icon: "material-symbols:help-outline",
        href: "/help",
      },

      {
        id: 3,
        name: "Configuración",
        icon: "ep:setting",
        href: "/setting",
      },
    ],
  },
];

export const mobileOptions = [
  {
    id: 5,
    name: "Dashboard",
    icon: "akar-icons:dashboard",
    href: "/main",
  },
  {
    id: 2,
    name: "Transacciones",
    icon: "mingcute:transfer-fill",
    href: "/transactions",
  },
  {
    id: 1,
    name: "Metas",
    icon: "ph:target",
    href: "/goals",
  },
  {
    id: 3,
    name: "Entidades",
    icon: "ph:users-bold",
    href: "/entities",
  },
  {
    id: 4,
    name: "Categorías",
    icon: "iconamoon:category",
    href: "/category",
  },
];
