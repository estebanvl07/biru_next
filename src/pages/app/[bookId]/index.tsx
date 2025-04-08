import type { GetServerSideProps } from "next";

import { createServerSideCaller } from "~/utils/serverSideCaller/serverSideCaller";
import { useResize } from "~/lib/hooks/useResize";
import { useCategory } from "~/modules/Category/hook/category.hook";

import CategoiresSuggestion from "~/modules/components/molecules/CategoiresSuggestion";
import DashboardLayout from "~/modules/Layouts/Dashboard";
import MobileDashboard from "~/modules/Dashboard/MobileDashboard";
import DesktopDashboard from "~/modules/Dashboard/DesktopDashboard";
import { useCurrentBook } from "~/modules/Books/hooks/useBooks.hook";
import FilterTemplates from "~/modules/Layouts/templates/dashbaord/FilterTemplates";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const bookId = String(ctx.params!.bookId);

  const helpers = await createServerSideCaller(ctx);
  await helpers.books.lastAccess.fetch(bookId);

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
  const { book } = useCurrentBook();

  return (
    <DashboardLayout
      title="Dashboard"
      subtitle={book?.name}
      headDescription="Dashboard de la cuenta seleccionada"
      activityContent={<FilterTemplates />}
      hasFilter
    >
      {isMobile ? <MobileDashboard /> : <DesktopDashboard />}
      {!isLoading && categories?.length === 0 && <CategoiresSuggestion />}
    </DashboardLayout>
  );
};

export default HomePage;
