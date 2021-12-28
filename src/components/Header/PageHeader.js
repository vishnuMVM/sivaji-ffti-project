import React from "react";
import "./PageHeader.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import Logo from "./Logo.jpg";
import { useAuth,logout } from '../firebase/config';


export default function PageHeader() {
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
    <>
      <div className={isClicked ? "topnav responsive" : "topnav"} id="myTopnav">
        <Link to="/">
          <img className="logo-img" src={Logo} alt="logo" />
        </Link>
        <Link to="/achievements">Achievements</Link>
        <Link to="/grow-with-us">Grow With Us</Link>
        <Link to="/storelocation">Store Location</Link>
        <Link to="/management">Management</Link>
       { currentUser && <div className="sidebarItems">
        
        <Link to="/admin/add-collection">Add New Collection</Link>
         <Link  to="/admin/all-categories">Manage Collections</Link>
         <Link to="/admin/manage-carousel">Manage Carousel</Link>
        <Link onClick={onLogOutClicked} to=""><button className="logout" >Log out</button></Link>
       </div>}
        <a
          href="#"
          styles={{ fontSize: "15px" }}
          className="icon"
          onClick={handleClick}
        >
          <i className="fas fa-bars"></i>
        </a>

        {currentUser && <div className="dropdownn rightside ">
          <button className="dropbtn rightside">
          <i className="far fa-user"></i>
            <i className="fa fa-caret-down"></i>
          </button>

          <div className="dropdown-content">
            <Link to="/admin/add-collection">Add New Collection</Link>
            <Link to="/admin/all-categories">Manage Collections</Link>
            <Link to="/admin/manage-carousel">Manage Carousel</Link>
            <Link to=""><button className="logout" onClick={onLogOutClicked}>Log out</button></Link>
          </div>
        </div> }
      </div>

      {/* <div style="padding-left:16px">
  <h2>Responsive Topnav with Dropdown</h2>
  <p>Resize the browser window to see how it works.</p>
  <p>Hover over the dropdown button to open the dropdown menu.</p>
</div> */}
    </>
  );
}
