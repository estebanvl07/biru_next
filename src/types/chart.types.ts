export type Series = {
  color?: string;
  name: string;
  data: number[];
};

export interface ChartProps {
  series: Series[] | number[] | undefined;
  keys?: string[];
  titleChart?: string;
  heightChart?: string;
  showToolBar?: boolean;
  showLegend?: boolean;
  showToolTip?: boolean;
  showXAxis?: boolean;
  showYAxis?: boolean;
  offsetX?: number;
  offsetY?: number;
  showGrid?: boolean;
  hasformatNumber?: boolean;
}
