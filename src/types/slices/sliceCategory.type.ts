import { ICategory } from "../category";
import { ISelectOptions } from "../root.types";

export interface ICategorySlice {
  loading: boolean;
  error: boolean;
  data?: ICategory[];
  detail?: ICategory;
  filters?: ISelectOptions[];
}
