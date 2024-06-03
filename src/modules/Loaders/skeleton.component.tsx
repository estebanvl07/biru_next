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
  const loader = {
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
