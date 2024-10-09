import React, { useEffect, useState } from "react";
import {
  AnnualBalance,
  Balance,
  BalanceAccount,
  CategoriesPercent,
  LastTransactions,
} from "../Common";
import GoalList from "../Goals/widget/GoalList";
import { useCurrentAccount } from "../Account/hooks";
import { PieChartAmountByCategoires } from "../Charts";
import QuickTransaction from "../components/molecules/QuickTransaction";
import { ReactSortable } from "react-sortablejs";
import clsx from "clsx";
import { api } from "~/utils/api";
import { getPercent } from "~/lib/helpers";
import { OrderComponent, UI_ORDER, Widget } from "~/lib/constants/ui";

const DesktopDashboard = () => {
  const { account, isLoading } = useCurrentAccount();
  const { data: balance } = api.userAccount.getBalance.useQuery();
  const { data: defaultSetting } = api.users.getUiSetting.useQuery();
  const { mutate } = api.users.setSetting.useMutation();

  const widgets: { [Key: string]: JSX.Element } = {
    total_balance: (
      <Balance
        title="Total de Cuenta"
        amount={account.balance || 0}
        isLoading={isLoading}
        color="bg-green-500/30 text-green-600"
        percent="10%"
        titlePercent="De Ingresos"
      />
    ),
    income_balance: (
      <Balance
        title="Total de Ingresos"
        amount={balance?.incomes || 0}
        isLoading={isLoading}
        color="bg-green-500/30 text-green-600"
        percent={getPercent(balance?.incomes || 0, account.balance || 0)}
        titlePercent="De Ingresos"
      />
    ),
    egress_balance: (
      <Balance
        title="Total de Engresos"
        amount={balance?.egress || 0}
        color="bg-red-500/30 text-red-600"
        percent={getPercent(balance?.egress || 0, account.balance || 0)}
        titlePercent="De Egresos"
      />
    ),
    savings_balance: (
      <Balance
        title="Total de Ahorros"
        amount={balance?.savings || 0}
        color="bg-default-300/30 text-default-500"
        percent={getPercent(balance?.savings || 0, account.balance || 0)}
        titlePercent="De Egresos"
      />
    ),
    account_balance: <BalanceAccount className="h-fit" />,
    goal_list: <GoalList />,
    balance_by_categories: <PieChartAmountByCategoires />,
    last_transactions: (
      <LastTransactions transactionsMaxLength={6} cardClassName="h-full" />
    ),
    quick_transaction: <QuickTransaction />,
    categories_percent: <CategoriesPercent />,
    annual_balance: <AnnualBalance />,
  };

  const [list, setList] = useState<OrderComponent[]>();

  useEffect(() => {
    if (!balance) return;
    if (defaultSetting) {
      return setList(JSON.parse(defaultSetting.widgetOrder));
    }
    setList(UI_ORDER);
  }, [balance, defaultSetting]);

  useEffect(() => {
    if (list) {
      mutate(JSON.stringify(list));
    }
  }, [list]);

  return (
    <div>
      <ReactSortable
        list={list || []}
        setList={setList}
        animation={600}
        className="grid grid-cols-4 grid-rows-[130px] gap-2"
      >
        {list &&
          list?.map((item) => (
            <div key={item.id} className={clsx(item.className)}>
              {widgets[item.name]}
            </div>
          ))}
      </ReactSortable>
    </div>
  );
};

export default DesktopDashboard;
