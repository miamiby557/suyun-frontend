import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import promiseMiddleware from "redux-promise";
import thunk from "redux-thunk";
import logger from "redux-logger";
import zhCN from "antd/lib/locale-provider/zh_CN";
import  "babel-polyfill";
import { LocaleProvider } from "antd";
import App, { reducer, errorHandler } from "./app";
import "./index.css";
import registerServiceWorker from "./registerServiceWorker";
import moment from "moment";
import "moment/locale/zh-cn";

moment.locale("zh-cn");

const store = createStore(
  reducer,
  applyMiddleware(promiseMiddleware, thunk, errorHandler, logger)
);

ReactDOM.render(
  <Provider store={store}>
    <LocaleProvider locale={zhCN}>
      <App />
    </LocaleProvider>
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
