"use client";
import { useEffect, useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

import { Card, Empty } from "~/modules/components";
import SpendingParams from "./spendingParams";
import { getPercent } from "~/lib/helpers";

import type { Category, Transaction } from "@prisma/client";

import "swiper/css";
import "swiper/css/pagination";
import { api } from "~/utils/api";
import { useTransactions } from "~/modules/transactions/hook/useTransactions.hook";
import { useResize } from "~/lib/hooks/useResize";
import { useFilterContext } from "~/lib/context/filterContext";

type ChartInfoType = {
  category: Category;
  amount: number;
};

const CategoriesPercent = () => {
  const [chartPieInfo, setChartPieInfo] = useState<ChartInfoType[]>([]);
  const [totalBalance, setTotalBalance] = useState<number>();
  const { filter, rangeDate } = useFilterContext();

  const { isMobile } = useResize();

  const { data: categories } = api.category.getAll.useQuery();

  const { transactions } = useTransactions({
    filter,
    ...rangeDate,
  });
  // TODO: convert to hook
  useEffect(() => {
    if (!categories || !transactions) return;
    setChartPieInfo([]);
    const groupedTransactions: Record<number, Transaction[]> =
      transactions.reduce(
        (acc, transaction) => {
          const { categoryId } = transaction;
          if (!acc[categoryId as number]) {
            acc[categoryId as number] = [];
          }
          acc[categoryId as number]!.push(transaction);
          return acc;
        },
        {} as Record<number, Transaction[]>,
      );

    const groupeCategoryKeys = Object.keys(groupedTransactions);
    const gruopeTransactions = Object.values(groupedTransactions);

    // get names using groupeCategoryKeys
    const categoryOptions = groupeCategoryKeys.map((id) => {
      const categoryFound = categories.find(
        (category) => category.id === Number(id),
      );
      return categoryFound;
    });

    // get total amount by category
    const transactionsSeries = gruopeTransactions.map((groupTr, index) => {
      const groupOfAmounts = groupTr.map((transactions) => transactions.amount);

      // addition od amount by categories
      const amountOfCategory = groupOfAmounts.reduce(
        (amount, currentAmount) => amount + currentAmount,
        0,
      );

      return amountOfCategory;
    });

    if (!categoryOptions) return;

    transactionsSeries.map((amount, index) => {
      const chartInfo = {
        category: categoryOptions[index] ?? { name: "Sin categoría" },
        amount,
      } as ChartInfoType;

      if (!chartPieInfo) return setChartPieInfo([chartInfo]);
      setChartPieInfo((prev) => [...prev, chartInfo]);
    });
  }, [transactions]);

  useEffect(() => {
    if (chartPieInfo.length === 0) return;
    const amountByCateegory = chartPieInfo.reduce(
      (amount, currentCategory) => amount + currentCategory.amount,
      0,
    );

    setTotalBalance(amountByCateegory);
  }, [chartPieInfo]);

  return (
    <Card className="h-full flex-col">
      <h3 className="mb-2">Porcentajes de categorías</h3>
      <section className="flex h-full w-full max-w-full flex-wrap items-center justify-center py-2">
        {chartPieInfo && categories?.length !== 0 && (
          <>
            <Swiper
              slidesPerView={
                isMobile
                  ? chartPieInfo.length > 1
                    ? 2
                    : 1
                  : chartPieInfo.length > 3
                    ? 3
                    : chartPieInfo.length
              }
              spaceBetween={isMobile ? 10 : 50}
              navigation={true}
              pagination={{
                type: "bullets",
              }}
              color="#d3d3d3"
              modules={[Pagination]}
              className="mySwiper w-full"
            >
              {chartPieInfo.map((info) => {
                return (
                  <SwiperSlide key={info.category?.id}>
                    <SpendingParams
                      category={info.category}
                      percent={getPercent(info.amount, totalBalance)}
                    />
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </>
        )}
        {chartPieInfo.length === 0 && (
          <Empty description="No encontramos datos" />
        )}
      </section>
    </Card>
  );
};

export default CategoriesPercent;
