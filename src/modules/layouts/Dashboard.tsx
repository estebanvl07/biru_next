import Head from "next/head";
import { HeaderApp, SideBar } from "./templates/dashbaord";

const DashboardLayout = ({
  children,
  title,
  headDescription,
  serviceOptions = true,
}: {
  children: React.ReactNode;
  title?: string;
  headDescription?: string;
  serviceOptions?: boolean;
}) => {
  return (
    <div className="flex dark:bg-slate-950">
      <Head>
        <title>Biru - {title}</title>
        <meta name="description" content={headDescription} />
      </Head>
      <SideBar serviceOptions={serviceOptions} />
      <section className="z-0 h-full min-h-screen w-full flex-grow py-3 md:pl-60">
        <div className="flex flex-col gap-4 px-8">
          <HeaderApp title={title} />
          <main className="z-0">{children}</main>
        </div>
      </section>
    </div>
  );
};

export default DashboardLayout;
