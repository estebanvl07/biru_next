"use client";
import { useEffect, useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

import { Card } from "~/modules/components";
import SpendingParams from "./spendingParams";
import { getPercent } from "~/lib/helpers";

import type { Category, Transaction } from "@prisma/client";

import "swiper/css";
import "swiper/css/pagination";
import { api } from "~/utils/api";
import { useTransactions } from "~/modules/transactions/hook/useTransactions.hook";

type ChartInfoType = {
  category: Category;
  amount: number;
};

const CategoriesPercent = () => {
  const [chartPieInfo, setChartPieInfo] = useState<ChartInfoType[]>([]);
  const [totalBalance, setTotalBalance] = useState<number>();

  const { data: categories } = api.category.getAll.useQuery();
  const { transactions } = useTransactions();
  // TODO: convert to hook
  useEffect(() => {
    if (!categories || !transactions) return;
    setChartPieInfo([]);
    const groupedTransactions: Record<number, Transaction[]> =
      transactions.reduce(
        (acc, transaction) => {
          const { categoryId } = transaction;
          if (!acc[categoryId]) {
            acc[categoryId] = [];
          }
          acc[categoryId]!.push(transaction);
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
        category: categoryOptions[index],
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
      <section className="flex h-full max-w-full flex-wrap items-center justify-center py-2">
        {chartPieInfo && (
          <>
            <Swiper
              slidesPerView={chartPieInfo.length < 3 ? chartPieInfo.length : 3}
              spaceBetween={30}
              navigation={true}
              pagination={{
                type: "bullets",
              }}
              color="#d3d3d3"
              modules={[Pagination]}
              className="mySwiper"
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
          <span className="mx-auto text-sm">No se encontraron resulados</span>
        )}
      </section>
    </Card>
  );
};

export default CategoriesPercent;
