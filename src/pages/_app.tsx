import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import { Inter, Montserrat, Mukta, Poppins } from "next/font/google";

import { api } from "~/utils/api";
import { NextUIProvider } from "@nextui-org/react";

import { type Session } from "next-auth";

import { ThemeProvider } from "~/lib/context/Theme.context";
import { FilterProvider } from "~/lib/context/Filter.context";
import "~/styles/globals.css";
import { Toaster } from "~/lib/context/Toaster.context";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-sans",
});

const poppins = Inter({
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-sans",
});

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <NextUIProvider>
        <ThemeProvider>
          <FilterProvider>
            <div className={`font-sans ${poppins.variable}`}>
              <Component {...pageProps} />
            </div>
            <Toaster />
          </FilterProvider>
        </ThemeProvider>
      </NextUIProvider>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
