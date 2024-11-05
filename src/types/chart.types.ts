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
  widthChart?: string;
  position?: string;
  showToolBar?: boolean;
  bottomBorder?: boolean;
  plotTextSize?: string;
  curve?: Curve;
  hasZoom?: boolean;
  showLegend?: boolean;
  showToolTip?: boolean;
  showXAxis?: boolean;
  showYAxis?: boolean;
  offsetX?: number;
  offsetY?: number;
  showGrid?: boolean;
  hasformatNumber?: boolean;
}

type Curve =
  | "smooth"
  | "straight"
  | "stepline"
  | "linestep"
  | "monotoneCubic"
  | ("smooth" | "straight" | "stepline" | "linestep" | "monotoneCubic")[]
  | undefined;
