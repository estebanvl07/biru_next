import { Button } from "~/modules/components";
import {
  Advatages,
  Explore,
  Footer,
  PrincipalSection,
  BasicLayout,
} from "~/modules/layouts/templates/Landing";

export default function Home() {
  return (
    <BasicLayout>
      <PrincipalSection />
      <Advatages />
      <Explore />
      <Footer />
    </BasicLayout>
  );
}
