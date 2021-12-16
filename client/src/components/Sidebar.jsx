import "../css/sidebar.css";
import {
 TableChart,
 Info,
} from "@material-ui/icons";
import React from 'react'
import { Link } from "react-router-dom";

const SideBar = () => {
    return (
        <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Dashboard</h3>
          <ul className="sidebarList">
            <Link to="/data-table" >
            <li className="sidebarListItem active">
              <TableChart className="sidebarIcon" />
              Data Table
            </li>
            </Link>
            <Link to="/about-us" >
            <li className="sidebarListItem">
              <Info className="sidebarIcon" />
              About Us
            </li>
            </Link>
            
            
          </ul>
        </div>
      </div>
    </div>
    )
}

export default SideBar
