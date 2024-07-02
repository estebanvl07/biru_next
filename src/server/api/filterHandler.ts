import { FILTERS, FilterOptions } from "~/types/transactions";

export const filtersHandler = (options: FilterOptions) => {
  const { filter, startDate, endDate } = options;

  const now = new Date();
  let filterStartDate: Date | undefined;
  let filterEndDate: Date | undefined = now;

  switch (filter) {
    case FILTERS.day:
      filterStartDate = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
      );
      break;
    case FILTERS.month:
      filterStartDate = new Date(now.getFullYear(), now.getMonth(), 1);
      break;
    case FILTERS.six_month:
      filterStartDate = new Date(now.getFullYear(), now.getMonth() - 6, 1);
      break;
    case FILTERS.year:
      filterStartDate = new Date(now.getFullYear(), 0, 1);
      break;
    case FILTERS.customized:
      if (!startDate || !endDate) {
        throw new Error("Start date and end date must be provided");
      }
      filterStartDate = startDate;
      filterEndDate = endDate;
      break;
    default:
      break;
  }

  return {
    filterStartDate,
    filterEndDate,
  };
};
