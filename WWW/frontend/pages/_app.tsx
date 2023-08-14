import React, { useEffect } from "react";
import { AppProps } from "next/app";
import { ClerkProvider } from "@clerk/nextjs";
import "../styles/index.css";
import Head from "next/head";
import { UserContextProvider } from "../utils/useSupabase";

const pageTitle = "Art Lab";
const description = "Art Lab";

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    const body = document.body;
    body.setAttribute("data-theme", "night");
  }, []);

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />

        <meta property="og:title" content={pageTitle} key="ogtitle" />
        <meta property="og:description" content={description} key="ogdesc" />
        <title>{pageTitle}</title>

        <meta property="og:site_name" content={"Art Lab"} key="ogsitename" />
        <meta property="og:title" content={pageTitle} key="ogtitle" />
        <meta property="og:description" content={description} key="ogdesc" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
