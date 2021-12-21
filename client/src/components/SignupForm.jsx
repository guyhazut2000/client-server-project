import React, { useState, useEffect } from "react";
import UserDataService from "../services/User";
import validator from "validator";
import Swal from "sweetalert2";
import "bootstrap";
import { useHistory } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import "../css/login.css";

const SignUpForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  let history = useHistory();
  const [isVerified, setIsVerified] = useState(false);
  const [isVerifiedPassword, setIsVerifiedPassword] = useState(false);

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

  useEffect(() => {
    var myInput = document.getElementById("password");
    var letter = document.getElementById("letter");
    var capital = document.getElementById("capital");
    var number = document.getElementById("number");
    var length = document.getElementById("length");
    var specialCharacter = document.getElementById("special-character");

    // validate password by patterns
    const passwordValidator = () => {
      var passwordVerifier = {
        lowerCaseLetters: false,
        upperCaseLetters: false,
        numbers: false,
        specialCharacter: false,
        length: false,
      };
      // Validate lowercase letters
      var lowerCaseLetters = /[a-z]/g;
      if (myInput.value.match(lowerCaseLetters)) {
        letter.classList.remove("invalid");
        letter.classList.add("valid");
        passwordVerifier.lowerCaseLetters = true;
      } else {
        letter.classList.remove("valid");
        letter.classList.add("invalid");
        passwordVerifier.lowerCaseLetters = false;
      }

      // Validate capital letters
      var upperCaseLetters = /[A-Z]/g;
      if (myInput.value.match(upperCaseLetters)) {
        capital.classList.remove("invalid");
        capital.classList.add("valid");
        passwordVerifier.upperCaseLetters = true;
      } else {
        capital.classList.remove("valid");
        capital.classList.add("invalid");
        passwordVerifier.upperCaseLetters = false;
      }

      // Validate numbers
      var numbers = /[0-9]/g;
      if (myInput.value.match(numbers)) {
        number.classList.remove("invalid");
        number.classList.add("valid");
        passwordVerifier.numbers = true;
      } else {
        number.classList.remove("valid");
        number.classList.add("invalid");
        passwordVerifier.numbers = false;
      }

      // Validate special character
      var specialCharacters = /[!@#$%^&*)(-+|}{;_:/?.><]/g;
      if (myInput.value.match(specialCharacters)) {
        specialCharacter.classList.remove("invalid");
        specialCharacter.classList.add("valid");
        passwordVerifier.specialCharacter = true;
      } else {
        specialCharacter.classList.remove("valid");
        specialCharacter.classList.add("invalid");
        passwordVerifier.specialCharacter = false;
      }

      // Validate length
      if (myInput.value.length >= 6) {
        length.classList.remove("invalid");
        length.classList.add("valid");
        passwordVerifier.length = true;
      } else {
        length.classList.remove("valid");
        length.classList.add("invalid");
        passwordVerifier.length = false;
      }
      // console.log(passwordVerifier);
      if (
        !passwordVerifier.lowerCaseLetters ||
        !passwordVerifier.upperCaseLetters ||
        !passwordVerifier.numbers ||
        !passwordVerifier.specialCharacter ||
        !passwordVerifier.length
      ) {
        // document.getElementById("submit-btn").disabled = true;
        setIsVerifiedPassword(false);
      } else {
        // document.getElementById("submit-btn").disabled = false;
        setIsVerifiedPassword(true);
      }
    };
    // When the user starts to type something inside the password field
    myInput.onkeyup = passwordValidator;

    // When the user clicks on the password field, show the message box
    myInput.onfocus = function () {
      document.getElementById("message").style.display = "block";
      passwordValidator();

      // When the user clicks outside of the password field, hide the message box
      myInput.onblur = function () {
        document.getElementById("message").style.display = "none";
      };
    };
  }, [isVerified]);

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
        // console.log(user.data);
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
      console.log(newUser);
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
          {/* <div className="form-group">
            <input
              type="password"
              className="form-control item"
              id="password"
              placeholder="Password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div> */}
          <div className="form-group">
            <input
              type="password"
              id="password"
              name="password"
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*)(-+|}{;_:/?.><]).{6,}"
              title="Must contain at least one number and one uppercase and lowercase letter, and at least 6 or more characters"
              className="form-control item"
              // id="password"
              placeholder="Password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              required
            />
          </div>
          <div id="message" className="container">
            <div className="col">
              <div className="row">
                <h3>Password must contain the following:</h3>
              </div>
              <div className="row">
                <p id="letter" class="invalid">
                  A <b>lowercase</b> letter
                </p>
              </div>
              <div className="row">
                <p id="capital" class="invalid">
                  A <b>capital (uppercase)</b> letter
                </p>
              </div>
              <div className="row">
                <p id="number" class="invalid">
                  A <b>number</b>
                </p>
              </div>
              <div className="row">
                <p id="length" class="invalid">
                  Minimum <b>6 characters</b>
                </p>
              </div>
              <div className="row">
                <p id="special-character" class="invalid">
                  Special character <b>(!,@,#,etc.).</b>
                </p>
              </div>
            </div>
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
              disabled={!isVerified || !isVerifiedPassword}
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
