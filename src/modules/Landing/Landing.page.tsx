import { HeroSection, Advantages, Explore, Footer } from "./components";

export const Landing = () => {
  return (
    <>
      <HeroSection />
      <div className="w-full bg-indigo-950 py-14">
        <div className="mx-auto max-w-[75rem]">
          <h2 className="max-w-md text-3xl text-white"></h2>
        </div>
      </div>
      <Advantages />
      <Explore />
      <Footer />
    </>
  );
};
