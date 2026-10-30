import { Share_Tech_Mono } from "next/font/google";
import Header from "@/components/Header";
import Ticker from "@/components/Ticker";
import Cursor from "@/components/Cursor";
import FxProvider from "@/components/FxProvider";
import Particles from "@/components/Particles";
import Reginleif from "@/components/Reginleif";
import LenaChat from "@/components/LenaChat";
import { profile } from "@/lib/content";
import "./globals.css";

const mono = Share_Tech_Mono({ weight: "400", subsets: ["latin"], variable: "--font-mono", display: "swap" });

export const metadata = {
  title: `${profile.firstName} ${profile.lastName} | ${profile.title}`,
  description: profile.tagline,
};

const themeScript = `try{var t=localStorage.getItem('theme')||'dark';document.documentElement.dataset.theme=t}catch(e){document.documentElement.dataset.theme='dark'}`;

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="dark" className={mono.variable} suppressHydrationWarning>
      <head><script dangerouslySetInnerHTML={{ __html: themeScript }} /></head>
      <body>
        <FxProvider>
          <Ticker />
          <Cursor />
          <Particles />
          <Reginleif />
          <Header />
          {children}
          <LenaChat />
        </FxProvider>
      </body>
    </html>
  );
}
