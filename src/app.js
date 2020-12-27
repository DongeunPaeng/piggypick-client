import React from "react";
import ReactDOM from "react-dom";
import AppRouter, { history } from "./routers/AppRouter";
import { Provider } from "react-redux";
import configureStore from "./store/configureStore";
import { login, logout } from "./actions/auth";
import LoadingPage from "./components/LoadingPage";
import { firebase } from "./firebase/firebase";
import "normalize.css/normalize.css";
import "./styles/styles.scss";

const store = configureStore();

const jsx = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);

let hasRendered = false;

const renderApp = () => {
  if (!hasRendered) {
    // We go inside this if condition only once at the very first time, and never again.
    ReactDOM.render(jsx, document.getElementById("app"));
    hasRendered = true; // This value 'true' never changes from now on
  }
};

ReactDOM.render(<LoadingPage />, document.getElementById("app"));

firebase.auth().onAuthStateChanged(
  setTimeout(user => {
    if (user) {
      store.dispatch(login(user.uid, user.email));
      renderApp();
      if (history.location.pathname === "/") {
        history.push("/teams");
      }
    } else {
      store.dispatch(logout());
      renderApp();
      history.push("/");
    }
  }, 1500)
);
