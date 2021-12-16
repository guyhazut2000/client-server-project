import "../css/login.css";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import UserDataService from "../services/User";
import Swal from "sweetalert2";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let history = useHistory();

  console.log("login is rendered");

  
  // login
  const login = async (e) => {
    e.preventDefault();
    // check if fields not empty
    if (password === "" || email === "") {
      Swal.fire(
        "Error!",
        "Login failed! Please fill all of your fields.",
        "error"
      );
      return;
    }
   
    try {
      console.log("start login process");
      var user;
      var userOnline = false;
      //  user object data
      var data = { email: email ,password: password};
      // check if the user exist in db.
      var res = await UserDataService.getUser(data);
      // console.log(res, res.data);
      if (res.data === null) {
        Swal.fire("Error!", "Login failed! User is Not Exists.", "error");
        return;
      } else {
        user = res.data;
        // console.log("User Login data:", res.data);
        if (user.isOnline) {
          userOnline = true;
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "User is already online.",
          });
        }
        // check if user exists.
        if (userOnline) {
          console.log("user is online already");
          return;
        }
        // login user
        res = await UserDataService.login(data);
        console.log(res.data);
        if (res.data !== null) {
          user = res.data;
          console.log("user login successfully.");
          Swal.fire("Welcome!", "You Logged in successfully!", "success");
          history.push("/home");
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <>
      <div className="registration-form">
      <h1>Login</h1>     
        <form>
          <br />
          <div className="form-icon">
            <span>
              <i className="icon icon-user"></i>
            </span>
          </div>
         
          <div className="form-group">
            <input
              type="text"
              className="form-control item"
              id="email"
              placeholder="Enter Email Address..."
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control item"
              id="password"
              placeholder="Password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <div className="form-group checkbox mb-3">
      <label>
        <input type="checkbox" value="remember-me"/> <span>Remember me</span>
      </label>
    </div>
          <div className="form-group">
            <button
              type="button"
              className="btn btn-block create-account"
              onClick={(e) => login(e)}
            >
              Login
            </button>
          </div>
        </form>
        <div className="social-media">
          <h5>Sign up with social media</h5>
          <div className="social-icons">
            <a href="#">
              <i className="icon-social-facebook" title="Facebook"></i>
            </a>
            <a href="#">
              <i className="icon-social-google" title="Google"></i>
            </a>
            <a href="#">
              <i className="icon-social-twitter" title="Twitter"></i>
            </a>
          </div>
        </div>
        <h6 className="mt-5 p-5 text-center text-secondary ">
          Copyright © 2021 . All Rights Reserved.
        </h6>
      </div>
    </>
  );
};

export default Login;