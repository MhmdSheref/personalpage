import "@/styles/globals.css";
import Layout from "@/components/Layout";
import {Literata} from "next/font/google";

const literata = Literata({
  weight: ["600", "800"],
  subsets: ['latin'],
})




export default function App({ Component, pageProps }) {
  return <main className={literata.className}><Layout><Component {...pageProps} /></Layout></main>;
}
