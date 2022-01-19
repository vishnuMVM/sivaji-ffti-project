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
        <a class="navbar-brand" href="#">
          {" "}
          <Link to="/">
            <img className="logo-img" src={Logo} alt="logo" />
          </Link>
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavDropdown">
          <ul class="navbar-nav">
            <li class="nav-item">
              <a class="nav-link" href="#">
                <Link to="/achievements">Achievements</Link>
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">
                <Link to="/grow-with-us">Grow With Us</Link>
              </a>
            </li>
            <a class="nav-link" href="#">
            <li class="nav-item">
              <Link to="/storelocation">Store Location</Link>
            </li>
            </a>

            <a class="nav-link" href="#">
            <li class="nav-item">
              <Link to="/management">Management</Link>
            </li>
            </a>

            <li class="nav-item dropdown">
              <a
                class="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdownMenuLink"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Dropdown link
              </a>
              <ul
                class="dropdown-menu"
                aria-labelledby="navbarDropdownMenuLink"
              >
                <li>
                  <a class="dropdown-item" href="#">
                  <Link to="/admin/add-collection">Add New Collection</Link>
                  </a>
                </li>
                <li>
                  <a class="dropdown-item" href="#">
                  <Link to="/admin/all-categories">Manage Collections</Link>
                
                  </a>
                </li>
                <li>
                  <a class="dropdown-item" href="#">
                  <Link to="/admin/manage-carousel">Manage Carousel</Link>
                  </a>
                </li>

                <li>
                  <a class="dropdown-item" href="#">
                  <Link to=""><button className="logout" onClick={onLogOutClicked}>Log out</button></Link>
                  </a>
                </li>



              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
