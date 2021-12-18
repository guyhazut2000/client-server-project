import React from "react";
import "../css/topbar.css";
// import {
//   NotificationsNone,
//   Language,
//   Settings,
//   Search,
// } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { resetUsersData } from "../redux/userRedux";

const TopBar = () => {
  const user = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  let history = useHistory();

  const handleLogoutClick = async (e) => {
    e.preventDefault();
    // reset redux user to initialized values.
    if (user) {
      dispatch(resetUsersData());
      history.push("/");
    }
  };

  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft align-items-center ">
          <Link to="/">
            <span className="logo">Car Service App</span>
          </Link>
          <div className="topMiddleLeft">
            <div class="input-group"></div>
          </div>
        </div>
        <div className="topRight">
          {/* <div className="topbarIconContainer">
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
          <img
            src="https://images.pexels.com/photos/1526814/pexels-photo-1526814.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
            alt=""
            className="topAvatar"
          /> */}
          <button
            className="btn btn-success"
            onClick={(e) => {
              handleLogoutClick(e);
            }}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
