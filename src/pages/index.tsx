import Head from "next/head";
import withAuthRedirect from "~/lib/helpers/withAuthRedirect";
import { Landing } from "~/modules/Landing";

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
      <div className="flex h-full min-h-screen flex-col bg-white from-slate-950 to-slate-950 px-0 dark:bg-gradient-to-b">
        <Landing />
      </div>
    </>
  );
};

export default withAuthRedirect(Home);
