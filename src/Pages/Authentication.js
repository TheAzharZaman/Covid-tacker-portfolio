import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import "./Authentication.css";
import { Button } from "@material-ui/core";
import GoogleIcon from "./google.png";
import { auth, provider, db } from "../Files/firebase";
import { actionTypes } from "../Files/reducer";
import { useStateValue } from "../Files/StateProvider";

const Authentication = () => {
  let history = useHistory();
  const [displayName, setDisplayName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  let [state, dispatch] = useStateValue();

  const signUp = (e) => {
    console.log(
      "Visitors FullName =>",
      displayName,
      "Visitors Email =>",
      email,
      "Visitors Password",
      password
    );

    db.collection("usersData").add({
      userDisplayName: displayName,
      userEmail: email,
      userPassword: password,
    });

    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authResponse) => {
        console.log(authResponse);

        dispatch({
          type: actionTypes.SET_USER,
          user: authResponse.user,
        });
      })
      .catch((error) => alert(error.message));
  };

  const continueWithGoogle = () => {
    auth
      .signInWithPopup(provider)
      .then((result) => {
        console.log(result);

        dispatch({
          type: actionTypes.SET_USER,
          user: result.user,
        });
      })
      .catch((error) => alert(error.message));
  };

  return (
    <div className="authentication__page">
      <div className="authentication__cont flexColumn between center">
        <h1 className="auth__taglineUp">SIGNUP</h1>

        <form className="flexColumn evenly center">
          <input
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            type="text"
            placeholder="Your Fullname"
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your Email"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Create a strong Password"
          />
        </form>
        <div className="authAction__btns flexColumn evenly center">
          <Button
            onClick={signUp}
            variant="outlined"
            className="auth__btns signup"
          >
            SignUp
          </Button>
          <Link to="/auth/login">
            <Button variant="outlined" className="auth__btns login">
              LogIn Instead
            </Button>
          </Link>
        </div>

        <a
          onClick={continueWithGoogle}
          className="googleSign flexRow between center pointer"
        >
          <img src={GoogleIcon} /> Continue with Google
        </a>
        <Link className="skip" to="/">
          Skip
        </Link>
      </div>
    </div>
  );
};

export default Authentication;
