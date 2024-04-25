import React from "react";
import { HeaderApp, SideBar } from ".";

const LayoutWhiteSidebar = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full">
      <SideBar />
      <main className="h-full w-full flex-grow p-4 md:pl-64">{children}</main>
    </div>
  );
};

export default LayoutWhiteSidebar;
