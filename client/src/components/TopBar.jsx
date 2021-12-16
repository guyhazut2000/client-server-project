import React from "react";
import "../css/topbar.css";
import { NotificationsNone, Language, Settings ,Search} from "@material-ui/icons"
import { Link } from "react-router-dom";

const TopBar = () => {
    return (
        <div className="topbar">
          <div className="topbarWrapper">
            <div className="topLeft align-items-center ">
              <Link to="/">
             <span className="logo">Car Service App</span>
              </Link>
             <div className="topMiddleLeft">
              <div class="input-group">
  <div class="form-outline">
    <input type="search" id="form1" class="form-control" />
  </div>
  <button type="button" class="btn btn-primary btn-success btn-lg">
  <Search/>
  </button>
             </div>
             </div>
             </div>
            <div className="topRight">
              <div className="topbarIconContainer">
                <NotificationsNone />
                <span className="topIconBadge">2</span>
              </div>
              <div className="topbarIconContainer">
                <Language />
                <span className="topIconBadge">2</span>
              </div>
              <div className="topbarIconContainer">
                <Settings />
              </div>
              <img src="https://images.pexels.com/photos/1526814/pexels-photo-1526814.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" alt="" className="topAvatar" />
            </div>
          </div>
        </div>
      );
}

export default TopBar
