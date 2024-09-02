"use client";

import { Provider } from "react-redux";
import React from "react";
import store from "./store/store";
import { GenerationProvider } from "./GenerationProvider";

const Providers = ({ children }) => {
  return (
    <Provider store={store}>
      <GenerationProvider>{children}</GenerationProvider>
    </Provider>
  );
};

export default Providers;
