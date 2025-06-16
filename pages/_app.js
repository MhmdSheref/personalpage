import "@/styles/globals.css";
import Layout from "@/components/Layout";
import Head from "next/head";
import {Literata} from "next/font/google";

const literata = Literata({
  weight: ["600", "800"],
  subsets: ['latin'],
})




export default function App({ Component, pageProps }) {
  return (
      <>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <main className={literata.className}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </main>
      </>
  );
}
