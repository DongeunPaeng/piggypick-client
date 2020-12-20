import React from "react";
import { Router, Route, Switch } from "react-router-dom";
// import TeamListPage from "../pages/TeamList";
import ItemListPage from "../pages/ItemListPage";
// import NotFoundPage from "../components/NotFoundPage";
// import PrivateRoute from "./PrivateRoute";

const AppRouter = () => {
  <Router>
    <Switch>
      <Route
        exact
        path="/"
        render={<ItemListPage />}
      />
      {/*
      <PrivateRoute exact path="/:id" component={ItemListPage} />
      <Route component={NotFoundPage} />
      */}
    </Switch>
  </Router>;
};

export default AppRouter;
