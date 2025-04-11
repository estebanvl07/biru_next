export type OptionsProps = {
  id: number;
  name: string;
  icon?: string;
  href: string;
  cleanPath?: boolean;
  options?: OptionsProps[];
};

export type MenuProps = {
  title: string;
  options: OptionsProps[];
};

export const MENU_OPTIONS: MenuProps[] = [
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
      {
        id: 4,
        name: "Presupuesto de Mes",
        icon: "mynaui:bitcoin-circle",
        href: "/budget",
      },
    ],
  },
  {
    title: "Finanzas",
    options: [
      {
        id: 1,
        name: "Transacciones",
        icon: "mynaui:arrow-up-right",
        href: "/transactions",
        options: [
          {
            id: 1,
            name: "Resumen de Transacciones",
            href: "/transactions",
          },
          {
            id: 2,
            name: "Nueva Transacción",
            href: "/transactions/new",
          },
        ],
      },
      // {
      //   id: 1,
      //   name: "Ingresos",
      //   icon: "mynaui:arrow-up-right",
      //   href: "#",
      //   options: [
      //     {
      //       id: 4,
      //       name: "Resumen de Ingresos",
      //       href: "/incomes",
      //     },
      //     {
      //       id: 1,
      //       name: "Nuevo Ingreso",
      //       href: "/incomes/new?type=1",
      //     },
      //     {
      //       id: 3,
      //       name: "Ingreso Programado",
      //       href: "/incomes/new?type=1",
      //     },
      //     {
      //       id: 2,
      //       name: "Análisis de Ingresos",
      //       href: "/incomes/analytics",
      //     },
      //   ],
      // },
      // {
      //   id: 2,
      //   name: "Egresos",
      //   icon: "mynaui:arrow-down-left",
      //   href: "#",
      //   options: [
      //     {
      //       id: 4,
      //       name: "Resumen de Egresos",
      //       href: "/expenses",
      //     },
      //     {
      //       id: 1,
      //       name: "Nuevo Egreso",
      //       href: "/expenses/new?type=2",
      //     },
      //     {
      //       id: 3,
      //       name: "Egreso Programado",
      //       href: "/expenses/new?type=2",
      //     },
      //     {
      //       id: 2,
      //       name: "Análisis de Egresos",
      //       href: "/expenses/analytics",
      //     },
      //   ],
      // },
      // {
      //   id: 3,
      //   name: "Facturas",
      //   icon: "mingcute:bill-line",
      //   href: "#",
      //   options: [
      //     {
      //       id: 1,
      //       name: "Historial",
      //       icon: "mynaui:clock-circle",
      //       href: "/bills",
      //     },
      //     {
      //       id: 2,
      //       name: "Facturas Pendientes",
      //       icon: "mynaui:calendar-up",
      //       href: "/bills",
      //     },
      //     {
      //       id: 2,
      //       name: "Nueva Factura",
      //       icon: "mynaui:plus",
      //       href: "/bills/new",
      //     },
      //   ],
      // },
      {
        id: 4,
        name: "Movimientos Recurrentes",
        icon: "grommet-icons:power-cycle",
        href: "/movements",
      },
      // {
      //   id: 5,
      //   name: "Ahorros",
      //   icon: "fluent:savings-24-regular",
      //   href: "/movements",
      // },
      {
        id: 6,
        name: "Metas de Pago",
        icon: "mynaui:target",
        href: "/goals",
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
      // {
      //   id: 2,
      //   name: "Reportes",
      //   icon: "mynaui:archive",
      //   href: "/#",
      // },
      // {
      //   id: 3,
      //   name: "Conciliaciones",
      //   icon: "ri:shake-hands-line",
      //   href: "/analytics",
      // },
    ],
  },
  {
    title: "Configuración",
    options: [
      {
        id: 1,
        name: "Configuración",
        icon: "mynaui:config",
        href: "/settings",
      },
      {
        id: 2,
        name: "Mis Libros",
        icon: "mynaui:book",
        href: "/overview",
        cleanPath: true,
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
    name: "Movimientos Recurrentes",
    icon: "grommet-icons:power-cycle",
    href: "/movements",
  },
  {
    id: 5,
    name: "Presupuesto de Mes",
    icon: "mynaui:bitcoin-circle",
    href: "/budget",
  },
  {
    id: 6,
    name: "Calendario",
    icon: "mynaui:calendar-up",
    href: "/calendar",
  },
];
