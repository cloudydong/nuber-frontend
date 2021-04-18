import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { NotFound } from "../page/404";
import { CreateAccount } from "../page/create-account";
import { Login } from "../page/login";

export const LoggedOutRouter = () => {
  return (
    <Router>
      <Switch>
        <Route path="/create-account" component={CreateAccount} />
        <Route exact path="/" component={Login} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
};
