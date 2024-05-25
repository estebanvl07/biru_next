import { Skeleton } from "@nextui-org/skeleton";
import {
  TableLoader,
  AccountOptionLoader,
  TransactionItemLoader,
  Category,
  SavingCardLoader,
} from "./ski.components";

interface SkeletonProps {
  skeletonType?:
    | "ListItem"
    | "AccountOption"
    | "default"
    | "Table"
    | "Category"
    | "Saving";
}

export const LoaderSkeleton = ({ skeletonType = "default" }: SkeletonProps) => {
  // .ski -> class for item loader (skeleton-item)

  const loader = {
    // ListItem: () => {
    //   return (
    //     <div className="flex flex-col gap-2">
    //       <ListItem />
    //       <ListItem />
    //     </div>
    //   );
    // },
    // AccountCard: () => {
    //   return (
    //     <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
    //       <AccountCard />
    //       <AccountCard />
    //     </div>
    //   );
    // },
    // CategoryCard: () => {
    //   return (
    //     <div className="mt-0 flex gap-2 overflow-auto">
    //       <Category />
    //       <Category />
    //       <Category />
    //     </div>
    //   );
    // },
    // Flows: () => {
    //   return (
    //     <div className="mt-2 flex flex-col overflow-auto rounded-xl md:flex-row">
    //       <Flows />
    //       <Flows />
    //     </div>
    //   );
    // },
    // Amount: () => {
    //   return <DesktopCardBalance />;
    // },
    // Balance: () => {
    //   return <Balance />;
    // },

    Saving: () => <SavingCardLoader />,
    Category: () => <Category />,
    ListItem: () => <TransactionItemLoader />,
    Table: () => {
      return <TableLoader />;
    },
    AccountOption: () => {
      return <AccountOptionLoader />;
    },
    default: () => null,
  }[skeletonType];

  return loader();
};
