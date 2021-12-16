import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import UserDataService from "../services/User";
import validator from 'validator';
import Swal from "sweetalert2";
import 'bootstrap'

const SignUpForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  let history = useHistory();

  console.log("login is rendered");

const validateString = (string) => {
  function validate(){
    var regName = /^[a-zA-Z]+ [a-zA-Z]+$/;
    var name = document.getElementById('name').value;
    if(!regName.test(name)){
        alert('Please enter your full name (first & last name).');
        document.getElementById('name').focus();
        return false;
    }else{
        alert('Valid name given.');
        return true;
    }
}
return validate(string);
}

  const validateFields = () => {
var fieldsValidator = true;
var isEmail = validator.isEmail(email);
var isString = validateString(firstName);

  };

  const handleSignUpClick = (e) => {
    e.preventDefault();
    var isValid = validateFields()

  };
  
//   // login
//   const login = async (e) => {
//     e.preventDefault();
//     // check if fields not empty
//     if (password === "" || email === "") {
//       Swal.fire(
//         "Error!",
//         "Login failed! Please fill all of your fields.",
//         "error"
//       );
//       return;
//     }
   
//     try {
//       console.log("start login process");
//       var user;
//       var userOnline = false;
//       //  user object data
//       var data = { email: email ,password: password};
//       // check if the user exist in db.
//       var res = await UserDataService.getUser(data);
//       // console.log(res, res.data);
//       if (res.data === null) {
//         Swal.fire("Error!", "Login failed! User is Not Exists.", "error");
//         return;
//       } else {
//         user = res.data;
//         // console.log("User Login data:", res.data);
//         if (user.isOnline) {
//           userOnline = true;
//           Swal.fire({
//             icon: "error",
//             title: "Oops...",
//             text: "User is already online.",
//           });
//         }
//         // check if user exists.
//         if (userOnline) {
//           console.log("user is online already");
//           return;
//         }
//         // login user
//         res = await UserDataService.login(data);
//         console.log(res.data);
//         if (res.data !== null) {
//           user = res.data;
//           console.log("user login successfully.");
//           Swal.fire("Welcome!", "You Logged in successfully!", "success");
//           history.push("/home");
//         }
//       }
//     } catch (error) {
//       console.log(error.message);
//     }
//   };
  return (
    <>
      <div className="registration-form">
           <form>
          <h1>Creat an Account!</h1>       
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
          
          <div className="form-group">
            <button
              type="button"
              className="btn btn-block create-account"
              onClick={(e) => {handleSignUpClick()}}
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