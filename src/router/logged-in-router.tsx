import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Header } from "../components/header";
import { useMe } from "../hook/useMe";
import { NotFound } from "../page/404";
import { Category } from "../page/client/category";
import { RestaurantPage } from "../page/client/restaurant-page";
import { Restaurants } from "../page/client/restaurants";
import { Search } from "../page/client/search";
import { ConfirmEmail } from "../page/user/confirm-email";
import { EditProfile } from "../page/user/edit-profile";

const ClientRoute = [
  <Route key={1} path="/" exact component={Restaurants} />,
  <Route key={2} path="/confirm" component={ConfirmEmail} />,
  <Route key={3} path="/edit-profile" component={EditProfile} />,
  <Route key={4} path="/search" component={Search} />,
  <Route key={5} path="/category/:slug" component={Category} />,
  <Route key={6} path="/restaurant/:id" component={RestaurantPage} />,
];

export const LoggedInRouter = () => {
  const { data, loading, error } = useMe();
  if (!data || loading || error) {
    return (
      <div className="h-screen flex justify-center items-center">
        <span className="font-medium text-xl tracking-wide">Loading...</span>
      </div>
    );
  }
  return (
    <Router>
      <Header />
      <Switch>
        {data.me.role === "Client" && ClientRoute}
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
};
