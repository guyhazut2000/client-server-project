import "../css/login.css";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import UserDataService from "../services/User";
import Swal from "sweetalert2";
import validator from "validator";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/userRedux";
import ReCAPTCHA from "react-google-recaptcha";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  let history = useHistory();
  var isChecked = false;
  const [isVerified, setIsVerified] = useState(false);

  // re captcha on change
  const onChange = (value) => {
    // console.log("Captcha value:", value);
    setIsVerified(true);
  };

  useEffect(() => {
    var tempCookie = JSON.parse(getCookie("rememberMe"));
    // console.log(tempCookie !== null);
    if (tempCookie !== null) {
      // console.log(tempCookie);
      // console.log(document.getElementById("email").value);
      // console.log(document.getElementById("password").value);
      document.getElementById("email").value = tempCookie.email;
      document.getElementById("password").value = tempCookie.password;
      setEmail(tempCookie.email);
      setPassword(tempCookie.password);
    }
  }, []);

  function setCookie(name, value, days) {
    var expires = "";
    if (days) {
      var date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
  }
  function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(";");
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) === " ") c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  }
  function eraseCookie(name) {
    document.cookie =
      name + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
  }

  const handleRememberMeClick = (e) => {
    isChecked = e.target.checked;
  };
  // function to validate fields.
  const validateFields = () => {
    // validate empty fields.
    if (email === "" || password === "") {
      return {
        status: false,
        error: {
          header: "Empty Fields",
          msg: "Please fill all of your fields",
        },
      };
    }
    var isEmail = validator.isEmail(email);
    if (!isEmail) {
      return {
        status: false,
        error: {
          header: "Wrong Email Format",
          msg: "Please fill Email correctly. for example - test@gmail.com",
        },
      };
    }
    return { status: true, error: {} };
  };

  // handle sign up click button
  const handleLoginClick = async (e) => {
    e.preventDefault();
    // handle remember me

    // check fields validation.
    var validation = validateFields();
    if (!validation.status) {
      Swal.fire(validation.error.header, validation.error.msg, "error");
      return;
    }

    // login user
    try {
      var data = {
        email: email,
        password: password,
      };
      var user = await UserDataService.loginUser(data);
      // if email is already exists in db.
      if (user.data === null) {
        Swal.fire("Login Error", "User credentials are wrong.", "error");
        return;
      }
      // display success msg and move to home page.
      if (user.data !== null) {
        // set currentUser in redux store
        dispatch(loginSuccess(user));
        // remember me func
        // console.log(isChecked);
        if (isChecked) {
          var cookieData = JSON.stringify({
            email: email,
            password: password,
          });
          setCookie("rememberMe", cookieData, 10);
        } else {
          eraseCookie("rememberMe");
        }
        // display msg
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "User Logged in successfully.\nMoving to Home Page.",
          showConfirmButton: false,
          timer: 1000,
        });
      }
      // go to home page
      setTimeout(function () {
        history.push("/");
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="registration-form">
        <form>
          <h1>Login</h1>
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
          <div className="form-group checkbox">
            <label>
              <input
                type="checkbox"
                value="rememberMe"
                id="rememberMe"
                onClick={(e) => {
                  handleRememberMeClick(e);
                }}
              />
              <p>Remember me</p>
            </label>
          </div>
          <div className="g-re-captcha">
            <ReCAPTCHA
              onExpired={() => setIsVerified(false)}
              sitekey="6LdeFrcdAAAAAKZz6IG-ZpAhU-OdxuXxSinfGh6e"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <button
              disabled={!isVerified}
              type="button"
              className="btn btn-block create-account"
              onClick={(e) => handleLoginClick(e)}
            >
              Login
            </button>
          </div>
          <div className="mt-5 p-5 text-center links">
            <div className="forgot-password">
              <a href="/forgot-password">Forgot Password?</a>
            </div>
            <div className="login">
              <a href="/sign-up">Don't have account? Sign up!</a>
            </div>
          </div>
        </form>
        <h6 className="mt-5 p-5 text-center text-secondary ">
          Copyright © 2021 . All Rights Reserved.
        </h6>
      </div>
    </>
  );
};

export default Login;
