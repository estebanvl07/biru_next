import { Skeleton } from "@nextui-org/skeleton";
import { Card } from "../components";
import clsx from "clsx";

export const Category = () => {
  return (
    <div className="grid grid-cols-2 gap-2 md:flex md:grid-cols-2 md:flex-wrap lg:grid-cols-3 xl:grid-cols-4">
      <div className="relative flex w-full flex-col items-center justify-start gap-4 rounded-lg bg-default-50 px-6 py-8 md:w-32">
        <Skeleton className="h-16 w-16 rounded-full" />
        <Skeleton className="h-4 w-10 rounded-full" />
      </div>
      <div className="relative flex w-full flex-col items-center justify-start gap-4 rounded-lg bg-default-50 px-6 py-8 md:w-32">
        <Skeleton className="h-16 w-16 rounded-full" />
        <Skeleton className="h-4 w-10 rounded-full" />
      </div>
    </div>
  );
};

export const SavingCardLoader = () => {
  return (
    <div className="flex flex-col gap-2 md:flex-row">
      {[1, 2].map((i) => (
        <Card
          key={i}
          className="flex w-full flex-col gap-3 rounded-xl px-6 py-2 md:w-80"
        >
          <header className="flex items-center justify-between">
            <Skeleton className="h-4 w-16 rounded-xl" />
            <Skeleton className="h-12 w-12 rounded-full" />
          </header>
          <main className="flex items-center justify-between">
            <aside>
              <Skeleton className="mb-1 h-4 w-10 rounded-xl" />
              <Skeleton className="h-2 w-8 rounded-xl" />
            </aside>
            <aside>
              <Skeleton className="mb-1 h-4 w-10 rounded-xl" />
              <Skeleton className="h-2 w-8 rounded-xl" />
            </aside>
          </main>
          <Skeleton className=" h-1 w-full rounded-full" />
        </Card>
      ))}
    </div>
  );
};

export const TransactionItemLoader = () => {
  return (
    <div className="flex flex-col gap-2">
      {[1, 2, 3].map((i) => (
        <div key={i} className="flex items-center justify-between p-2">
          <aside className="flex items-center gap-2">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div>
              <Skeleton className="mb-2 h-4 w-14 rounded-xl" />
              <Skeleton className="h-3 w-8 rounded-xl" />
            </div>
          </aside>
          <Skeleton className="h-4 w-16 rounded-xl" />
        </div>
      ))}
    </div>
  );
};

export const AccountOptionLoader = () => {
  return (
    <div className="flex flex-col ">
      <div className="flex flex-col gap-2 p-2">
        <Skeleton className="h-4 w-12 rounded-xl" />
        <Skeleton className="h-2 w-20 rounded-xl" />
      </div>
      <div className="flex flex-col gap-2 p-2">
        <Skeleton className="h-4 w-12 rounded-xl" />
        <Skeleton className="h-2 w-20 rounded-xl" />
      </div>
    </div>
  );
};

export const TableLoader = () => {
  return (
    <div className="flex w-full  flex-col">
      <header className="flex w-full items-center justify-between">
        <Skeleton className="h-8 w-56 rounded-xl" />
        <aside className="flex gap-2">
          <Skeleton className="h-12 w-32 rounded-xl" />
          <Skeleton className="h-12 w-32 rounded-xl" />
        </aside>
      </header>
      <nav className="my-3 flex justify-between">
        <Skeleton className="h-6 w-16 rounded-xl" />
        <Skeleton className="h-6 w-10 rounded-xl" />
      </nav>
      <main className="w-full rounded-xl border px-6 py-4 pb-6 shadow-sm dark:border-white/10">
        <Skeleton className="h-12 w-full rounded-xl" />
        <div className="mt-4 flex items-center justify-between px-4">
          <Skeleton className="h-4 w-6 rounded-xl" />
          <div className="flex items-center gap-2">
            <Skeleton className="h-12 w-12 rounded-full" />
            <aside>
              <Skeleton className="mb-1 h-4 w-32 rounded-xl" />
              <Skeleton className="h-4 w-24 rounded-xl" />
            </aside>
          </div>
          <Skeleton className="mb-1 h-4 w-16 rounded-xl" />
          <Skeleton className="mb-1 h-4 w-24 rounded-xl" />
          <Skeleton className="mb-1 h-4 w-48 rounded-xl" />
        </div>
        <div className="mt-4 flex items-center justify-between px-4">
          <Skeleton className="h-4 w-6 rounded-xl" />
          <div className="flex items-center gap-2">
            <Skeleton className="h-12 w-12 rounded-full" />
            <aside>
              <Skeleton className="mb-1 h-4 w-32 rounded-xl" />
              <Skeleton className="h-4 w-24 rounded-xl" />
            </aside>
          </div>
          <Skeleton className="mb-1 h-4 w-16 rounded-xl" />
          <Skeleton className="mb-1 h-4 w-24 rounded-xl" />
          <Skeleton className="mb-1 h-4 w-48 rounded-xl" />
        </div>
        <div className="mt-4 flex items-center justify-between px-4">
          <Skeleton className="h-4 w-6 rounded-xl" />
          <div className="flex items-center gap-2">
            <Skeleton className="h-12 w-12 rounded-full" />
            <aside>
              <Skeleton className="mb-1 h-4 w-32 rounded-xl" />
              <Skeleton className="h-4 w-24 rounded-xl" />
            </aside>
          </div>
          <Skeleton className="mb-1 h-4 w-16 rounded-xl" />
          <Skeleton className="mb-1 h-4 w-24 rounded-xl" />
          <Skeleton className="mb-1 h-4 w-48 rounded-xl" />
        </div>
      </main>
      <footer className="mt-4 flex w-full items-center justify-between">
        <Skeleton className="h-12 w-40 rounded-xl" />
        <aside className="flex gap-2">
          <Skeleton className="h-8 w-24 rounded-xl" />
          <Skeleton className="h-8 w-24 rounded-xl" />
        </aside>
      </footer>
    </div>
  );
};
