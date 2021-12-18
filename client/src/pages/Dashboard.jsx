import React from "react";
import Sidebar from "../components/Sidebar";
import DataTable from "../components/DataTable";
import TopBar from "../components/TopBar";
import AboutUs from "../components/AboutUs";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Test from "../components/tests/Test";

const Dashboard = () => {
  return (
    <Router>
      <div>
        <div className="container-fluid">
          <div className="row">
            <TopBar />
          </div>
          <div className="row">
            <div className="col-md-2 p-0">
              <Sidebar />
            </div>
            <Switch>
              <Route exact path="/data-table">
                <div className="col">
                  <DataTable />
                </div>
              </Route>
              <Route exact path="/about-us">
                <div className="col-md-9">
                  <AboutUs />
                </div>
              </Route>
              <Route exact path="/test">
                <div className="col">
                  <Test />
                </div>
              </Route>
            </Switch>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default Dashboard;
