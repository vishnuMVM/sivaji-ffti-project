import { Button, Card, Input, Typography } from "@material-tailwind/react";
import React, { useEffect, useRef, useState } from "react";
import { login, logout, signup, useAuth } from "../../firebase/config";

import { useNavigate } from "react-router-dom";

const Login = () => {
  const currentUser = useAuth();
  const navigate = useNavigate();
  const [isClicked, setIsClicked] = useState(false);

  const emailRef = useRef();
  const passwordRef = useRef();

  // ✅ Redirect to homepage if user is already logged in
  useEffect(() => {
    if (currentUser) {
      navigate("/");
    }
  }, [currentUser, navigate]);

  async function handleSignup() {
    await signup(emailRef.current.value, passwordRef.current.value);
  }

  const onLoginClicked = async () => {
    setIsClicked(true);
    try {
      await login(emailRef.current.value, passwordRef.current.value);
      navigate("/"); // ✅ Redirect to homepage after successful login
    } catch {
      alert("Error!");
    }
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
  }

  return (
    <div className="flex items-center justify-center h-screen w-screen bg-gradient-to-br from-purple-600 to-blue-500">
      <Card className="w-full max-w-md p-8 shadow-xl rounded-lg bg-white/20 backdrop-blur-lg">
        <Typography variant="h4" className="text-white text-center">
          {currentUser ? "Welcome Back" : "Login"}
        </Typography>
        <Typography className="text-white text-center opacity-75 mb-6">
          {currentUser ? `Logged in as: ${currentUser.email}` : "Enter your credentials"}
        </Typography>

        <div className="space-y-4">
          <Input
            type="email"
            placeholder="Email"
            ref={emailRef}
            className="bg-white/30 placeholder-white text-white"
            disabled={!!currentUser}
          />
          <Input
            type="password"
            placeholder="Password"
            ref={passwordRef}
            className="bg-white/30 placeholder-white text-white"
            disabled={!!currentUser}
          />
        </div>

        <div className="mt-6 flex flex-col space-y-3">
          {currentUser ? (
            <Button
              color="red"
              onClick={handleLogout}
              disabled={isClicked}
              className="hover:scale-105 transition-transform duration-200"
            >
              Log Out
            </Button>
          ) : (
            <Button
              color="blue"
              onClick={onLoginClicked}
              disabled={isClicked}
              className="hover:scale-105 transition-transform duration-200"
            >
              Log In
            </Button>
          )}
        </div>

        <Typography className="text-white text-sm text-center mt-4">
          Don't have an account?{" "}
          <span
            onClick={handleSignup}
            className="text-yellow-300 cursor-pointer hover:underline"
          >
            Sign up here
          </span>
        </Typography>
      </Card>
    </div>
  );
};

export default Login;
