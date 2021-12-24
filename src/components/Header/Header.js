import { Link } from "react-router-dom";
import "./Header.css";
import { Component } from "react";
import Logo from "./Logo.jpg";

class Header extends Component {
  state = { sidebar: false, isBtnClicked: false };

  Sidebartoggle = () => {
    this.setState((prevState) => {
      let sidebar = !prevState.sidebar;
      return { sidebar };
    });
  };

  render() {
    const { sidebar } = this.state;
    return (
      <div>
        <div className="header-container header-desktop">
          <div className="header-image-container">
            <div className="logo-container">
              <Link to="/">
                <img className="header-image" src={Logo} alt="company logo" />
              </Link>
            </div>

            <div>
              <h1> FFTI</h1>
              <h3>Futures First Textiles India</h3>
            </div>
          </div>

          <div className="header-list-selection-container">
            <div>
              <ul className="header-list-items-container">
                <li>
                  <Link className="header-list-item" to="/">
                    Home
                  </Link>
                </li>
                <li>
                  <Link className="header-list-item" to="/achievements">
                    Achievements
                  </Link>
                </li>
                <li>
                  <Link className="header-list-item" to="/grow-with-us">
                    Grow with us
                  </Link>
                </li>
                <li>
                  <Link className="header-list-item" to="/management">
                    Management
                  </Link>
                </li>
                <li>
                  <Link className="header-list-item" to="/storelocation">
                    Store Location
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="dropdown dropdown-mobile">
            <img
              className="user-img"
              style={{ width: "50px", height: "50px" }}
              src="https://p.kindpng.com/picc/s/105-1055656_account-user-profile-avatar-avatar-user-profile-icon.png"
              alt="user"
            />
            <button
              className="dropbtn no-border-btn"
              onClick={() => {
                this.setState((prev) => {
                  let isBtnClicked = !prev.isBtnClicked;
                  return isBtnClicked;
                });
              }}
            >
              <i className="fas fa-caret-down"></i>
            </button>
            <div className="dropdown-content">
              <Link to="/admin/add-collection">Add New Collection</Link>
              <Link to="/admin/all-categories">Manage Collections</Link>
              <Link to="">
                <button className="no-border-btn"> Log out</button>
              </Link>
            </div>
          </div>
        </div>

        <div className="header-mobile">
          <div className={sidebar ? "sidebar_display" : "sidebar_hide"}>
            <div className="sidebar_button_container">
              <button onClick={this.Sidebartoggle} className="sidebar_button no-border-btn" >
              <i className="fas fa-times-circle"></i>
              </button>
            </div>
            <div className="sidebar-container">
              <p>
                <Link className="header-list-item" to="/">
                  Home
                </Link>
              </p>
              <p>
                <Link className="header-list-item" to="/achievements">
                  Achivements
                </Link>
              </p>
              <p>
                <Link className="header-list-item" to="/grow-with-us">
                  Grow with us
                </Link>
              </p>
              <p>
                <Link className="header-list-item" to="/management">
                  Management
                </Link>
              </p>

              <p>
                <Link className="header-list-item" to="/storelocation">
                  Store Location
                </Link>
              </p>

              <p>
                  <Link className="header-list-item" to="/admin/add-collection">
                    Add New Collection
                  </Link>
              </p>

              <p>
                  <Link className="header-list-item" to="/admin/all-categories">
                    Manage Collections
                  </Link>
              </p>

              <p>
              <Link className="header-list-item no-border-btn" to="">

              
                  <button className="no-border-btn" to="/admin/all-categories">
                    Log out
                  </button>
                  </Link>
              </p>



            </div>
          </div>

          <div className="header-container">
            <div className="header-image-container">
              <div className="logo-container">
                <Link to="/">
                  <img className="header-image" src={Logo} alt="company logo" />
                </Link>
              </div>

              <div>
                <h1> FFTI</h1>
                <h3>Futures First Textiles India</h3>
              </div>
            </div>

            <div>
              <button onClick={this.Sidebartoggle} className="header-button no-border-btn">
                <i className="fa fa-bars"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
