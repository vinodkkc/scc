import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router } from "react-router-dom";
import store from "./app/store/Store";
import { Provider } from "react-redux";
import "./i18n/I18n";

ReactDOM.render(
  <Router basename={`${process.env.REACT_APP_BASE_PATH}`}>
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>
  </Router>,
  document.getElementById("root")
);

reportWebVitals();
