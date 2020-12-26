import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";
import LoginPage from "../pages/LoginPage";
import ItemListPage from "../pages/ItemListPage";
import TeamListPage from "../pages/TeamListPage";
import NotFoundPage from "../components/NotFoundPage";
import PrivateRoute from "./PrivateRoute";

export const history = createBrowserHistory();

const AppRouter = () => (
  <Router history={history}>
    <Switch>
      <Route exact path="/" component={LoginPage} />
      <PrivateRoute path="/teams" component={TeamListPage} />
      <PrivateRoute path="/items/:id" component={ItemListPage} />
      <Route component={NotFoundPage} />
    </Switch>
  </Router>
);
export default AppRouter;
