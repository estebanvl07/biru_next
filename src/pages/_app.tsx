import { SessionProvider } from "next-auth/react";
import { Montserrat } from "next/font/google";

import { api } from "~/utils/api";
import { NextUIProvider } from "@nextui-org/react";

import { type Session } from "next-auth";
import { type AppType } from "next/app";

import { ThemeProvider } from "~/lib/context/themeContext";
import { FilterProvider } from "~/lib/context/filterContext";

import "~/styles/globals.css";

const montserrat = Montserrat({
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
            <div className={`font-sans ${montserrat.variable}`}>
              <Component {...pageProps} />
            </div>
          </FilterProvider>
        </ThemeProvider>
      </NextUIProvider>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
