import withAuthRedirect from "~/lib/helpers/withAuthRedirect";
import { Landing } from "~/modules/Landing";

const Home = () => {
  return (
    <div className="flex h-full min-h-screen flex-col bg-white from-slate-950 to-slate-950 px-0 dark:bg-gradient-to-b">
      <Landing />
    </div>
  );
};

export default withAuthRedirect(Home);
