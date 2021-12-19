import React from "react";
import "../css/topbar.css";
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
      // clear user data
      dispatch(resetUsersData());
      // clear localStorage data
      localStorage.clear();
      history.push("/");
    }
  };

  return (
    <div className="topbar row text-nowrap d-flex m-0">
      <div className="topbarWrapper">
        <div className="topLeft align-items-center">
          {/* <Link to="/dashboard">
            <span className="logo">Car Service App</span>
          </Link> */}
          <a className="logo" href="/dashboard">
            <p>Car Service App</p>
          </a>
          <div className="topMiddleLeft">
            <div class="input-group"></div>
          </div>
        </div>
        <div className="topRight">
          <button
            className="btn btn-lg"
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
