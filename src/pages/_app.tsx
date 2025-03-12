import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import { Inter, Montserrat, Mukta, Poppins, Ubuntu } from "next/font/google";

import { api } from "~/utils/api";
import { HeroUIProvider } from "@heroui/react";

import { type Session } from "next-auth";

import { ThemeProvider } from "~/lib/context/Theme.context";
import { FilterProvider } from "~/lib/context/Filter.context";
import "~/styles/globals.css";
import { Toaster } from "~/lib/context/Toaster.context";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-sans",
});

const poppins = Ubuntu({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-sans",
});

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <HeroUIProvider>
        <ThemeProvider>
          <FilterProvider>
            <div className={`font-sans ${montserrat.variable}`}>
              <div id="portal-root"></div>
              <Component {...pageProps} />
            </div>
            <Toaster />
          </FilterProvider>
        </ThemeProvider>
      </HeroUIProvider>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
