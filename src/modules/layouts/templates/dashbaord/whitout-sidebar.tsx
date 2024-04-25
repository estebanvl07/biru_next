import React, { FC } from "react";
import { HeaderApp } from "~/modules/layouts/templates/dashbaord";

interface DashboardProps {
  children: React.ReactNode;
}

const WhitoutSideBar: FC<DashboardProps> = ({ children }) => {
  return (
    <div className="flex h-full min-h-screen flex-col bg-white dark:bg-slate-950">
      <main className="w-full flex-grow">
        <HeaderApp />
        {children}
      </main>
    </div>
  );
};

export default WhitoutSideBar;
