import { GLSDefaults } from "gls/lib";
import { AppProps } from "next/app";
import "../styles/normalize.css";
import "../styles/globals.css";
import Head from "next/head";
import { useEffect } from "react";
import { setStylesTarget } from "typestyle";

// normalize();
// setupPage("body");

// This default export is required in a new `pages/_app.js` file.
const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  useEffect(() => {
    setStylesTarget(document.getElementById("styles-target")!);
  }, []);

  return (
    <GLSDefaults.Provider value={{ verticalSpacing: 0, horizontalSpacing: 0 }}>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
      </Head>
      <Component {...pageProps} />
    </GLSDefaults.Provider>
  );
};

export default MyApp;
