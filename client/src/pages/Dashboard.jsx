import React from "react";
import Sidebar from "../components/Sidebar";
import DataTable from "../components/DataTable";
import TopBar from "../components/TopBar";
import AboutUs from "../components/AboutUs";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const Dashboard = () => {
  return (
    <Router>
      <div>
        <div className="container-fluid d-md-block">
          <div className="row">
            <TopBar />
          </div>
          <div className="row">
            <div className="col-lg-2 d-none d-md-block">
              <Sidebar />
            </div>
            <Switch>
              <Route exact path="/dashboard/data-table">
                <div className="col my-5">
                  <DataTable />
                </div>
              </Route>
              <Route exact path="/dashboard/about-us">
                <div className="col mx-5 text-center my-5">
                  <AboutUs />
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
