import React, { FC } from "react";
import { HeaderApp } from "~/modules/layouts/templates/dashbaord";

interface DashboardProps {
  children: React.ReactNode;
}

const WhitoutSideBar: FC<DashboardProps> = ({ children }) => {
  return (
    <div className="flex h-full min-h-screen flex-col bg-white dark:bg-slate-950">
      <HeaderApp />
      <main className="min-h-calc-48 w-full flex-grow md:mt-16 md:min-h-calc-64">
        {children}
      </main>
    </div>
  );
};

export default WhitoutSideBar;
