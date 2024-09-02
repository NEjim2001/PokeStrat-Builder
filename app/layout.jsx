import "@styles/globals.css";
import Nav from "@components/Nav";
import Providers from "./Providers";
import { Analytics } from "@vercel/analytics/react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const metadata = {
  title: "PokeStrat | Ultimate Pokemon Team Builder | PokéStrat",
  description:
    "Build and optimize competitive Pokemon teams with PokeStrat. Explore movesets, strategies, and Smogon data for the perfect battle-ready team.",
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <head>
        <script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_GOOGLE_ADSENSE}`}
          crossOrigin="anonymous"
        />

        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/assets/images/pokestrat-secondary-logo-transparent-icon.png"
        ></link>
        <link
          rel="icon"
          href="/assets/images/pokestrat-secondary-logo-transparent-icon.png"
        />
      </head>

      <body>
        <div className="main">
          <div className="gradient" />
        </div>
        <main className="app">
          <Providers>
            <ToastContainer />

            <Nav />
            {children}
            <Analytics />
          </Providers>
        </main>
      </body>
    </html>
  );
};

export default RootLayout;
