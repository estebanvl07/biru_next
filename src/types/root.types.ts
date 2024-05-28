export type Series = {
  color?: string;
  name: string;
  data: number[];
};

export type ListMenu = {
  label: string;
  href: string;
  showLine?: boolean;
  icon?: string;
  onClick?: () => void;
};
