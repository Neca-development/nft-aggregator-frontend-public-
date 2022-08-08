import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./store/store";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "./index.scss";
import { BrowserRouter } from "react-router-dom";
import { ChainId, Config, DAppProvider } from "@usedapp/core";
import { ethers } from "ethers";

const infuraId = process.env.REACT_APP_INFURA_PROJECT_ID;
const infuraRpc = process.env.REACT_APP_INFURA_RPC_URL;

const infuraProvider = new ethers.providers.JsonRpcProvider(infuraRpc + infuraId);
infuraProvider.pollingInterval = 20000;

const config: Config = {
  readOnlyChainId: ChainId.Rinkeby,
  readOnlyUrls: {
    [ChainId.Rinkeby]: infuraProvider,
  },
  notifications: {
    expirationPeriod: 1000,
    checkInterval: 200000,
  },
  refresh: "never",
};

const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(
  <DAppProvider config={config}>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </DAppProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
