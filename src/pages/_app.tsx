import AuthComponent from "@/components/AuthComponent";
import { Toaster } from "@/components/ui/toaster";
import { auth } from "@/lib/firebase";
import { useUserStore } from "@/store/useUserStore";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Habit Hub</title>
      </Head>
      <AuthComponent>
        <Component {...pageProps} />
        <Toaster />
      </AuthComponent>
    </>
  );
}
