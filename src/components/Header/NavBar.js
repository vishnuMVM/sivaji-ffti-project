import React from "react";
import Logo from "./Logo.jpg";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useAuth,logout } from '../firebase/config';


export default function NavBar() {
  const [isClicked, setIsClicked] = useState(false);
  const currentUser = useAuth();

  function handleClick() {
    setIsClicked(!isClicked);
  }
  async function onLogOutClicked () {
    try {
      await logout();
    } catch {
      alert("Error!");
    }
  }




  return (
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Navbar</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav">
          <a class="nav-link active" aria-current="page" href="#">Home</a>
          <a class="nav-link" href="#">Features</a>
          <a class="nav-link" href="#">Pricing</a>
          <a class="nav-link disabled">Disabled</a>
        </div>
      </div>
    </div>
  </nav>
  );
}
