import { useAccounts, useCurrentAccount } from "~/modules/Account/hooks";
import DashboardLayout from "~/modules/layouts/Dashboard";

import AccountCard from "~/modules/Account/AccountCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

import { CardBalanceAccount, LastTransactions } from "~/modules/common";
import { LineChart } from "~/modules/charts";
import { Icon } from "@iconify/react/dist/iconify.js";

import "swiper/css";
import "swiper/css/navigation";

import {
  useTransactions,
  getTransactionsByMonths,
} from "~/modules/transactions/hook";
import { useEffect, useState } from "react";
import { Transaction, UserAccount } from "@prisma/client";
import { api } from "~/utils/api";

export default function AllAccountPage() {
  const { accounts } = useAccounts();
  const { account } = useCurrentAccount();

  const [currentCard, setCurrentCard] = useState<number>();
  const [transactions, setTransactions] = useState<Transaction[]>();
  const [currentAccount, setCurrentAccount] = useState<UserAccount>(account);

  const { transactionsByMonth, balanceByMonth, months } =
    getTransactionsByMonths(transactions);

  const getTransactions = async () => {
    // const transactions = await api.transaction.getTransactions.useSuspenseQuery({
    //   accountId: String(currentCard!),
    // });
    // setTransactions(transactions.data);
  };

  useEffect(() => {
    if (!currentCard) return;
    getTransactions();
  }, [currentCard]);

  return (
    <DashboardLayout title="Cuentas">
      <div className="grid grid-cols-2 gap-6">
        <section className="col-span-2 flex flex-col justify-between gap-6 lg:col-span-1">
          <div className="w-full">
            <Swiper
              slidesPerView={1}
              spaceBetween={10}
              navigation={true}
              color="primary"
              onSlideChange={(swiper) => {
                setCurrentCard(accounts[swiper.activeIndex]!.id);
              }}
              modules={[Navigation]}
              className="mySwiper !h-full"
            >
              {accounts.map((acc) => {
                return (
                  <SwiperSlide key={acc.id}>
                    <AccountCard
                      account={acc}
                      hoverStyles={false}
                      className="mx-auto max-w-[20rem]"
                      // onClick={() => navigateAccount(account.id)}
                    />
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
          <div>
            <h3 className="px-6">Ultimas Transacciones</h3>
            <LastTransactions
              showHeader={false}
              cardClassName="!bg-transparent !border-none"
            />
          </div>
        </section>
        <section className="col-span-2 flex flex-1 flex-col gap-6 lg:col-span-1">
          <div>
            <h3>Balance</h3>
            <h2>$ 450.000</h2>
            <LineChart
              series={[
                {
                  name: "Balaneces",
                  data: balanceByMonth ?? [],
                  color: "#3E1FE9",
                },
              ]}
              keys={months}
              heightChart="200"
            />
          </div>
          <div className="">
            <h3 className="mb-4">Categorías</h3>
            <div className="flex items-center">
              <Swiper
                slidesPerView={3}
                autoplay
                //   navigation={true}
                centeredSlides={true}
                color="primary"
                modules={[Autoplay]}
                className="mySwiper !h-full"
              >
                {[1, 2, 3, 4].map((acc) => {
                  return (
                    <SwiperSlide key={acc} className="">
                      <div className="flex w-40 flex-col items-center justify-center rounded-xl border bg-slate-50 py-8 dark:border-white/10 dark:bg-default-200">
                        <div className="grid h-12 w-12 place-content-center rounded-full border dark:border-white/10">
                          <Icon
                            icon="iconamoon:category"
                            className="dark:text-white"
                            width={24}
                          />
                        </div>
                        <div className="mt-8 flex flex-col items-center justify-center">
                          <span className="text-xs font-light opacity-70 dark:opacity-45">
                            Category
                          </span>
                          <h3>$ 15.511</h3>
                        </div>
                      </div>
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </div>

            {/* <CardBalanceAccount /> */}
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
}
