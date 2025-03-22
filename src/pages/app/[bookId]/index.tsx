import type { GetServerSideProps } from "next";

import { createServerSideCaller } from "~/utils/serverSideCaller/serverSideCaller";
import { useResize } from "~/lib/hooks/useResize";
import { useCategory } from "~/modules/Category/hook/category.hook";

import CategoiresSuggestion from "~/modules/components/molecules/CategoiresSuggestion";
import DashboardLayout from "~/modules/Layouts/Dashboard";
import MobileDashboard from "~/modules/Dashboard/MobileDashboard";
import DesktopDashboard from "~/modules/Dashboard/DesktopDashboard";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const accountId = Number(ctx.params!.acc);

  const helpers = await createServerSideCaller(ctx);
  await helpers.userAccount.getOne.prefetch({ id: accountId });
  await helpers.userAccount.setLastAccess.prefetch({ id: Number(accountId) });

  const trpcState = helpers.dehydrate();

  return {
    props: {
      trpcState,
    },
  };
};

const HomePage = () => {
  const { categories, isLoading } = useCategory();
  const { isMobile } = useResize();

  return (
    <DashboardLayout
      title="Dashboard"
      headDescription="Dashboard de la cuenta seleccionada"
      hasFilter
    >
      {isMobile ? <MobileDashboard /> : <DesktopDashboard />}
      {!isLoading && categories?.length === 0 && <CategoiresSuggestion />}
    </DashboardLayout>
  );
};

export default HomePage;
