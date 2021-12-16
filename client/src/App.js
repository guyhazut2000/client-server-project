import React from "react";
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
  return (
    <Router>
      <Switch>
        {/* <Route exact path="/">
          {user ? <Redirect to="/home" /> : <Login />}
        </Route>
        <Route exact path="/course">
          {user ? <CourseList /> : <Login />}
        </Route>
        <Route exact path="/course/:courseName">
          {user ? <Course /> : <Login />}
        </Route>
        <Route path="/home">{user ? <Home /> : <Redirect to="/" />}</Route>
        <Route path="/about" component={About} />
        <Route path="/sign-up" component={SignUp} />
        <Route path="/admin" component={Admin} /> */}
        <Route exact path="/sign-in" component={Login} />
        <Route exact path="/sign-up" component={Signup} />
        <Route exact path="/forgot-password" component={ForgotPasswordForm} />
        <Route exact path="/dashboard" component={Dashboard} />
        <Route path="*" component={PageNotFound} />
      </Switch>
    </Router>
  );
};

export default App;
