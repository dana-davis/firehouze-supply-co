import type { AppProps } from 'next/app'
import { Geist, Geist_Mono } from "next/font/google";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/globals.css";
import "../styles/animations.css";
import "../styles/buttons.css";
import "../styles/page.module.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function App({ Component, pageProps }: AppProps) {
  const { logo, categories } = pageProps;
  console.log('Page Props:', pageProps);

  return (
    <div className={`${geistSans.variable} ${geistMono.variable}`}>
      <Header logo={logo} categories={categories} />
      <main>
        <Component {...pageProps} />
      </main>
      <Footer logo={logo} />
    </div>
  );
}