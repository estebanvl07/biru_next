export type PropsDataTable = {
  id: number;
  name: string;
  align?: "left" | "center" | "right";
  width?: string;
  order?: boolean;
  render: (row: any) => JSX.Element;
};
