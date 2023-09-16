import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import { api } from "~/utils/api";
import "~/styles/globals.css";
import Layout from "./components/Layout";
import { Analytics } from "@vercel/analytics/react";

import { NextUIProvider } from "@nextui-org/react";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <NextUIProvider>
        <Layout>
          <Component {...pageProps} />
          <Analytics />
        </Layout>
      </NextUIProvider>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
