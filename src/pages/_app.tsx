import "styles/globals.css";
import { ThemeProvider, createTheme } from "@mui/material";
import type { AppProps } from "next/app";
import { useEffect } from "react";
import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { prefixer } from "stylis";
import { Provider, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import store from "redux/index";
import "react-toastify/dist/ReactToastify.css";

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    document.dir = "rtl";
  }, []);
  const cacheRtl = createCache({
    key: "muirtl",
    stylisPlugins: [prefixer, rtlPlugin],
  });
  const mainTheme = createTheme({
    typography: {
      fontFamily: "Vazirmatn, sans-serif",
    },
    direction: "rtl",
    palette: {
      primary: {
        light: "#6b6e70",
        main: "#1e272e",
      },
      secondary: {
        light: "#EFEFEF",
        main: "#dce4ec",
        dark: "#808e9b",
      },
      success: {
        main: "#2ecc71",
        dark: "#27ae60",
      },
      info: {
        main: "#575fcf",
        dark: "#3c40c6",
      },
      error: {
        main: "#ff5e57",
        dark: "#ff3f34",
      },
      warning: {
        main: "#ffdd59",
        dark: "#ffd32a",
      },
    },
  });
  return (
    <Provider store={store}>
      <CacheProvider value={cacheRtl}>
        {" "}
        <ThemeProvider theme={mainTheme}>
          <Component {...pageProps} />
          <ToastContainer
            position="top-left"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            toastStyle={{ direction: "rtl" }}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </ThemeProvider>
      </CacheProvider>
    </Provider>
  );
}
