import Head from "next/head";
import withAuthRedirect from "~/lib/helpers/withAuthRedirect";
import { Spotlight } from "~/modules/components/ui/spotLight";
import { Landing } from "~/modules/Landing";

export async function getStaticProps() {
  return {
    props: {},
  };
}

const Home = () => {
  return (
    <>
      <Head>
        <title>Biru - Finanzas personales</title>
        <meta
          name="description"
          content="Biru es una aplicación que te ayuda a gestionar tus finanzas"
        />
      </Head>

      <main className="relative flex h-full min-h-screen w-full flex-col bg-white px-0 dark:bg-slate-950">
        <Landing />
      </main>
    </>
  );
};

export default withAuthRedirect(Home);
