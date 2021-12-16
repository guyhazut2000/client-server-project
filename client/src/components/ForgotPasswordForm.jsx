import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import UserDataService from "../services/User";
import Swal from "sweetalert2";

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  let history = useHistory();

  console.log("login is rendered");

    return (
        <>
        <div className="registration-form">
          <form>
        <h1>Forgot Your Password?</h1>     
        <div className="text-center">
           <p>We get it, stuff happens. Just enter your email address below and we'll send you a link to reset your password</p>
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
              <button
                type="button"
                className="btn btn-block create-account"
                onClick={(e) => {}}
              >
                Reset Password
              </button>
            </div> 
            <div className="mt-5 p-5 text-center links">
            <div className="forgot-password">
            <a href="/sign-up">Create an Account?</a>
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
    )
}

export default ForgotPasswordForm
