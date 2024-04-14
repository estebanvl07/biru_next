import React from "react";
import Layout from "~/modules/layouts/templates/dashbaord/white-sidebar";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return <Layout>{children}</Layout>;
};

export default MainLayout;
