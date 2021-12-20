import React, { useState } from "react";
import UserDataService from "../services/User";
import validator from "validator";
import Swal from "sweetalert2";
import "bootstrap";
import { useHistory } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";

const SignUpForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  let history = useHistory();
  const [isVerified, setIsVerified] = useState(false);

  // function to validate string value.
  const validateString = (string) => {
    function isValidName(string) {
      if (typeof string !== "string" || /[0-9]+/g.test(string)) {
        return false;
      }
      return true;
    }
    return isValidName(string);
  };
  // function to validate fields.
  const validateFields = () => {
    // validate empty fields.
    if (
      email === "" ||
      password === "" ||
      repeatPassword === "" ||
      firstName === "" ||
      lastName === ""
    ) {
      return {
        status: false,
        error: {
          header: "Empty Fields",
          msg: "Please fill all of your fields",
        },
      };
    }
    // validate email
    var isString = validateString(firstName);
    if (!isString) {
      return {
        status: false,
        error: {
          header: "First Name Error",
          msg: "First Name should contain only chars.",
        },
      };
    }
    isString = validateString(lastName);
    if (!isString) {
      return {
        status: false,
        error: {
          header: "Last Name Error",
          msg: "Last Name should contain only chars.",
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
    if (password.localeCompare(repeatPassword) !== 0) {
      return {
        status: false,
        error: {
          header: "Password isn't matching",
          msg: "Please fill the same password in both fields.",
        },
      };
    }
    return { status: true, error: {} };
  };
  // re captcha on change
  const onChange = (value) => {
    // console.log("Captcha value:", value);
    setIsVerified(true);
  };
  // handle sign up click button
  const handleSignUpClick = async (e) => {
    e.preventDefault();
    // re-captcha

    // check fields validation.
    var validation = validateFields();
    if (!validation.status) {
      Swal.fire(validation.error.header, validation.error.msg, "error");
      return;
    }

    // check if email exists in DB.
    try {
      var user = await UserDataService.getUserByEmail(email);
      // if email is already exists in db.
      if (user.data !== null) {
        console.log(user.data);
        Swal.fire(
          "Sign Up Error",
          "Email is already been used. please choose different email.",
          "error"
        );
        return;
      }

      // create new user
      var data = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        repeatPassword: repeatPassword,
      };
      var newUser = await UserDataService.createNewUser(data);
      if (newUser.data !== null) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "New User created successfully.\nMoving to Login Page.",
          showConfirmButton: false,
          timer: 2000,
        });
      }
      // window.location.reload();
      setTimeout(function () {
        history.push("/sign-in");
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="registration-form">
        <form>
          <h1>Create an Account!</h1>
          <div className="form-icon">
            <span>
              <i className="icon icon-user"></i>
            </span>
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control item"
              id="firstName"
              placeholder="First Name"
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control item"
              id="lastName"
              placeholder="Last Name"
              onChange={(e) => {
                setLastName(e.target.value);
              }}
            />
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
          <div className="form-group">
            <input
              type="password"
              className="form-control item"
              id="repeat-password"
              placeholder="Repeat Password"
              onChange={(e) => {
                setRepeatPassword(e.target.value);
              }}
            />
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
              onClick={(e) => {
                handleSignUpClick(e);
              }}
            >
              Sign Up
            </button>
          </div>
          <div className="mt-5 p-5 text-center links">
            <div className="forgot-password">
              <a href="/forgot-password">Forgot Password?</a>
            </div>
            <div className="login">
              <a href="/sign-in">Already have an account? Login!</a>
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

export default SignUpForm;
