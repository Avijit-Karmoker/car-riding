import React, { useContext, useState } from "react";
import firebaseConfig from "../firebase.config";
import firebase from "firebase/app";
import "firebase/auth";
import google from "../../images/google.png";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Login.css";
import { UserContext } from "../../App";
import { useHistory, useLocation } from "react-router";

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const Login = () => {
  let history = useHistory();
  let location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };

  let [newUser, setNewUser] = useState(true);
  let [user, setUser] = useState({
    isSignedIn: false,
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    picture: "",
    success: false,
  });
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);

  const handleGoogleSignIn = () => {
    var googleProvider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(googleProvider)
      .then((result) => {
        const { name, email } = result.additionalUserInfo.profile;
        const IsSignedInUser = {
          name: name,
          email: email,
          success: true,
        };
        setLoggedInUser(IsSignedInUser);
        setUser(IsSignedInUser);
        history.replace(from);
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        var credential = error.credential;
        console.log(errorMessage, errorCode, email, credential);
      });
  };

  const handleType = (event) => {
    let isFieldValid = true;
    if (event.target.name === "email") {
      isFieldValid = /\S+@\S+\.\S+/.test(event.target.value);
    }
    if (event.target.name === "password") {
      const isPasswordValid = event.target.value.length > 7;
      const passwordHasNumber = /\d{1}/.test(event.target.value);
      isFieldValid = isPasswordValid && passwordHasNumber;
    }
    if (isFieldValid) {
      const newUserInfo = { ...user };
      newUserInfo[event.target.name] = event.target.value;
      setUser(newUserInfo);
      setLoggedInUser(newUserInfo);
      console.log(loggedInUser);
    }
  };

  const handleSubmit = (event) => {
    if (newUser && user.name && user.password) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(user.email, user.password)
        .then((res) => {
          const newUserInfo = { ...user };
          newUserInfo.success = true;
          setUser(newUserInfo);
          setLoggedInUser(newUserInfo);
          history.replace(from);
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          console.log(errorMessage, errorCode);
        });
      event.preventDefault();
    }

    if (!newUser && user.email && user.password) {
      firebase
        .auth()
        .signInWithEmailAndPassword(user.email, user.password)
        .then((res) => {
          const newUserInfo = { ...user };
          newUserInfo.success = true;
          updateUserName(user.name);
          setUser(newUserInfo);
          setLoggedInUser(newUserInfo);
          history.replace(from);
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          console.log(errorMessage, errorCode);
        });
      event.preventDefault();
    }
  };
  const updateUserName = (name) => {
    let user = firebase.auth().currentUser;

    user
      .updateProfile({
        displayName: name,
      })
      .then(function () {
        console.log("user name updated successfully");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div>
      <div className="create-account">
        <div className="new-user">
          <h4>{newUser ? "Create an Account" : "Login"}</h4>
          <form onSubmit={handleSubmit}>
            {newUser && (
              <input
                type="text"
                onBlur={handleType}
                name="name"
                placeholder="Your Name"
                required
              />
            )}
            <br />
            <input
              type="text"
              name="email"
              onBlur={handleType}
              placeholder="Your Email"
              required
            />
            <br />
            <input
              type="password"
              name="password"
              onBlur={handleType}
              placeholder="Password"
              required
            />
            <br />
            {newUser && (
              <input
                type="password"
                name="confirm password"
                onBlur={handleType}
                placeholder="Confirm Password"
                required
              />
            )}
            <br />
            {newUser ? (
              <input
                type="submit"
                value="Create an account"
                className="submit-btn"
              />
            ) : (
              <input type="submit" value="Login" className="submit-btn" />
            )}
          </form>
        </div>

        <div className="already-login">
          <label htmlFor="newUser" id="newuser">
            Already have an account?
          </label>
          <input
            type="checkbox"
            name="newUser"
            id="newuser"
            onChange={() => setNewUser(!newUser)}
          />
          <label htmlFor="newUser" id="newuser" style={{ marginLeft: "10px" }}>
            Login
          </label>
        </div>

        <div className="or">
          <div className="hr"></div>
          <p style={{ margin: "0 10px 5px 10px" }}>or</p>
          <div className="hr"></div>
        </div>

        <div style={{ textAlign: "center" }}>
          <button className="googlebtn" onClick={handleGoogleSignIn}>
            <img src={google} alt="" />
            Continue with Google
          </button>

          <br />

          {/* <button className="facebookbtn" onClick={handlefacebookSignIn}>
            <img src={facebook} alt="" />
            Continue with facebook
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default Login;
