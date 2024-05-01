import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import { Montserrat } from "next/font/google";

import { api } from "~/utils/api";

import { NextUIProvider } from "@nextui-org/react";

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
        <div className={`font-sans ${montserrat.variable}`}>
          <Component {...pageProps} />
        </div>
      </NextUIProvider>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
