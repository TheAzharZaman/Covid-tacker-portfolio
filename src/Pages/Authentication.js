import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import "./Authentication.css";
import { Button } from "@material-ui/core";
import GoogleIcon from "./google.png";
import { auth, provider, db } from "../Files/firebase";
import firebase from "firebase";
import { useStateValue } from "../Files/StateProvider";

const Authentication = () => {
  const [displayName, setDisplayName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  let [{ user }, dispatch] = useStateValue();

  let history = useHistory();

  const signUpHandler = async (e) => {
    e.preventDefault();
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authResponse) => {
        db.collection("users").doc(authResponse?.user.uid).set({
          userID: authResponse?.user.uid,
          displayName: displayName,
          email: email,
          password: password,
          registeredSince: firebase.firestore.FieldValue.serverTimestamp(),
        });
        if (authResponse) {
          history.push("/");
        }
      })
      .catch((error) => alert(error.message));
  };

  const continueWithGoogle = () => {
    auth
      .signInWithPopup(provider)
      .then((user) => {
        console.log("Google Signed In User =>>>", user);
        if (user) {
          history.push("/");
        }
      })
      .catch((error) => alert(error.message));
  };

  return (
    <div className="authentication__page">
      <div className="authentication__cont flexColumn between center">
        <h1 className="auth__taglineUp">SIGNUP</h1>

        <form onSubmit={signUpHandler} className="flexColumn evenly center">
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
          <input className="auth__btns signup" type="submit" value="SignUp" />
        </form>
        <div className="authAction__btns flexColumn evenly center">
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
