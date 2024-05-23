import React from "react";
import { useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import {firebase} from "../../config/Firebase"

import classes from "../../styling/Login.module.css";

const Login = ({member, findMember}) => {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const history = useHistory();

  function submitHandler(event) {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    const loginData = {
      email: enteredEmail,
      password: enteredPassword,
    };

    firebase.auth().signInWithEmailAndPassword(loginData.email, loginData.password)
    .then((u) => {
      console.log("Success");
      history.push("/home")
    })
    .catch((err) => {
      console.log("Error: " + err.toString());
      alert("Invalid Email/Password Combination");
      emailInputRef.current.value = "";
      passwordInputRef.current.value = "";
    })

  }


  return (
    <div className={classes.container}>
      <h1 className={classes.welcome}>Login</h1>
      <form onSubmit={submitHandler} className={classes.form}>
        <input
          type="text"
          name="email"
          placeholder="Email"
          ref={emailInputRef}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          ref={passwordInputRef}
        />
        <div>
          <button className={classes.lgnBtn}>Login</button>
        </div>
        <Link className={classes.link} to="/create-account">
          No Account? Create an Account
        </Link>
      </form>
    </div>
  );
};

export default Login;
