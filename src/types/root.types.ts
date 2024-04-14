export type MainRoutes = {
  path: string;
  element: React.ReactNode;
  header?: boolean;
  target:
    | "_blank"
    | "dashboardLayout"
    | "publicEmpty"
    | "privateEmpty"
    | "signupLayout";
};

export interface ISelectOptions {
  value: string | number;
  name: string;
}

export interface IMenuOptions {
  id: number;
  name: string;
  icon: string;
  href: string;
}

export interface IMenu {
  id: number;
  title: string;
  menus: IMenuOptions[];
}

export type Series = {
  color?: string;
  name: string;
  data: number[];
};

export type ListMenu = {
  label: string;
  href: string;
  icon?: string;
  onClick?: () => void;
};
