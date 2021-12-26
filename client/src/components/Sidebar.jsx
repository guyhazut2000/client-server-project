import "../css/sidebar.css";
import { TableChart, Info } from "@material-ui/icons";
import React from "react";
import { Link } from "react-router-dom";

const SideBar = () => {
  return (
    <div className="sidebar container my-5">
      <div className="col mx-3">
        <h3 className="sidebarTitle">Dashboard</h3>

        <ul className="sidebarList">
          <div className="row">
            <Link to="/dashboard/data-table">
              <li className="sidebarListItem">
                <TableChart className="sidebarIcon" />
                Data Table
              </li>
            </Link>
          </div>
          <div className="row">
            <Link to="/dashboard/about-us">
              <li className="sidebarListItem">
                <Info className="sidebarIcon" />
                About Us
              </li>
            </Link>
          </div>
        </ul>
      </div>
    </div>
  );
};

export default SideBar;
