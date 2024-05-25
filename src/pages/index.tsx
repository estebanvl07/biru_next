import withAuthRedirect from "~/lib/helpers/withAuthRedirect";
import { Landing } from "~/modules/Landing";
import { BasicLayout } from "~/modules/layouts";

const Home = () => {
  return (
    <BasicLayout>
      <Landing />
    </BasicLayout>
  );
};

export default withAuthRedirect(Home);
