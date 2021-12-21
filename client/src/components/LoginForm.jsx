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
  const [isChecked, setIsChecked] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [isVerifiedPassword, setIsVerifiedPassword] = useState(false);

  // re captcha on change
  const onChange = (value) => {
    // console.log("Captcha value:", value);
    setIsVerified(true);
  };

  useEffect(() => {
    // check cookie data
    var tempCookie = JSON.parse(getCookie("rememberMe"));
    if (tempCookie !== null) {
      document.getElementById("email").value = tempCookie.email;
      document.getElementById("password").value = tempCookie.password;
      setEmail(tempCookie.email);
      setPassword(tempCookie.password);
      // handle password validator code
      var myInput = document.getElementById("password");
      myInput.value = tempCookie.password;
    } else {
      myInput = document.getElementById("password");
    }

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

    passwordValidator();
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
  // console.log(isVerified);

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
    setIsChecked(e.target.checked);
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
          msg: "Please fill Email correctly. for example - isVerifiedPassword@gmail.com",
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
              required
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
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
          <div className="form-group remember-me d-inline-block m-0 p-0">
            <input
              type="checkbox"
              value="rememberMe"
              id="rememberMe"
              onClick={(e) => {
                handleRememberMeClick(e);
              }}
            />
            <label className="remember-me-text">
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
              disabled={!isVerified || !isVerifiedPassword}
              type="button"
              className="btn btn-block create-account"
              id="submit-btn"
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
