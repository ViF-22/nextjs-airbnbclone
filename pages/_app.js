import "@/styles/globals.css";
import ProgressBar from "@badrap/bar-of-progress";
import Router from "next/router";

import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import favReducer from "@/features/favSlice";

const store = configureStore({
  reducer: {
    fav: favReducer,
  },
});
const progress = new ProgressBar({
  size: 3,
  color: "#FE595E",
  className: "z-50",
  delay: 100,
});

Router.events.on("routeChangeStart", progress.start); //when route starts to change => start progressBar
Router.events.on("routeChangeComplete", progress.finish);
Router.events.on("routeChangeError", progress.finish);

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}
