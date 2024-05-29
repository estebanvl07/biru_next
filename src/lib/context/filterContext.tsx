import { createContext, useContext, ReactNode, useState } from "react";
import { FILTERS } from "~/types/transactions";

type RangeDate = { startDate: Date; endDate: Date };

interface FilterContextProps {
  filter: FILTERS;
  setFilter: (theme: FILTERS) => void;
  rangeDate: RangeDate | undefined;
  setRangeDate: (newRange: RangeDate) => void;
}

const FilterContext = createContext<FilterContextProps | undefined>(undefined);

export const FilterProvider = ({ children }: { children: ReactNode }) => {
  const [filter, setFilter] = useState<FILTERS>(0);
  const [rangeDate, setRangeDate] = useState<RangeDate>();

  return (
    <FilterContext.Provider
      value={{ filter, setFilter, rangeDate, setRangeDate }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export const useFilterContext = () => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error("useFilterContext must be used within a ThemeProvider");
  }
  return context;
};
