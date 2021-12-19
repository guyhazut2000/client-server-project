import React from "react";
import { useSelector } from "react-redux";
import Login from "./components/LoginForm";
import Signup from "./pages/Signup";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import "bootstrap";
import PageNotFound from "./pages/PageNotFound";
import ForgotPasswordForm from "./pages/ForgotPassword";
import Dashboard from "./pages/Dashboard";

const App = () => {
  const user = useSelector((state) => state.user.currentUser);

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          {user ? <Dashboard /> : <Redirect to="/sign-in" />}
        </Route>
        <Route exact path="/sign-in">
          {user ? <Redirect to="/" /> : <Login />}
        </Route>
        <Route exact path="/sign-up">
          {user ? <Redirect to="/dashboard" /> : <Signup />}
        </Route>
        <Route exact path="/forgot-password">
          {user ? <Redirect to="/dashboard" /> : <ForgotPasswordForm />}
        </Route>
        <Route exact path="/dashboard">
          {user ? <Dashboard /> : <Redirect to="/sign-in" />}
        </Route>
        <Route exact path="/dashboard-data-table">
          {user ? <Dashboard /> : <Redirect to="/sign-in" />}
        </Route>
        <Route path="*" component={PageNotFound} />
      </Switch>
    </Router>
  );
};

export default App;
