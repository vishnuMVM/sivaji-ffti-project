import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";

import { signup, login, logout, useAuth } from "../firebase/config";
import "./login.css";

const Login = () => {
  const currentUser = useAuth();
  const [isClicked, setIsClicked] = useState(false);

  const emailRef = useRef();
  const passwordRef = useRef();

  async function handleSignup() {
    // setIsClicked(true);
    // try {
    await signup(emailRef.current.value, passwordRef.current.value);
    // } catch {
    // alert("Error!");
    // }
    // setIsClicked(false);
  }
  const onLoginClicked = async () => {
    setIsClicked(true);
    try {
      await login(emailRef.current.value, passwordRef.current.value);
    } catch {
      alert("Error!");
    }
    emailRef.current.value = "";
    passwordRef.current.value = "";
    setIsClicked(false);
    
  };

  async function handleLogout() {
    setIsClicked(true);
    try {
      await logout();
    } catch {
      alert("Error!");
    }
    setIsClicked(false);
    emailRef.current.value = "";
    passwordRef.current.value = "";
  }

  return (
    <div id="loginform">
      <h2 id="headerTitle">Log in</h2>
      <div className="row">
        <label>Email</label>
        <input
          style={
            !currentUser ? { pointerEvents: "auto" } : { pointerEvents: "none" }
          }
          type="text"
          ref={emailRef}
          placeholder="Enter Your Email"
        />
      </div>
      <div className="row">
        <label>Password</label>
        <input
          style={
            !currentUser ? { pointerEvents: "auto" } : { pointerEvents: "none" }
          }
          type="password"
          ref={passwordRef}
          placeholder="Enter Your Password"
        />
      </div>
      <div id="button" className="row">
        {currentUser && <button onClick={handleLogout}>Log Out</button>}
         {!currentUser && <button onClick={onLoginClicked}>Log In</button> }
      </div>
      {/* <OtherMethods /> */}
      {currentUser && <p>loggedin as : {currentUser.email}</p>}
    </div>
  );
};

// const OtherMethods = (props) => (
//   <div id="alternativeLogin">
//     <label>.</label>
//     <div id="iconGroup">
//       <Facebook />
//       <Twitter />
//       <Google />
//     </div>
//   </div>
// );

// const Facebook = (props) => <a href="#" id="facebookIcon"></a>;

// const Twitter = (props) => <a href="#" id="twitterIcon"></a>;

// const Google = (props) => <a href="#" id="googleIcon"></a>;

export default Login;
