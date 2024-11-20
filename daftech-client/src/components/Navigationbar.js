import React, { useState, useContext } from "react";
import Logo from "../Assets/Logo.jpg";
import { LinkContainer } from "react-router-bootstrap";
import "@fortawesome/fontawesome-free/css/all.min.css";
import TokenChecker from "./TokenChecker";
import { DarkModeContext } from "../components/DarkModeContext"; 
import "../components/style.css";
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBBtn,
  MDBCollapse,
  MDBNavbarLink,
} from "mdb-react-ui-kit";

function Header() {
  const [showBasic, setShowBasic] = useState(false);
  const { isDarkMode, setIsDarkMode } = useContext(DarkModeContext); 
  
  const isLoggedIn = TokenChecker();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    window.location.href = "/LoginForm";
  };

  const toggleDarkMode = () => {
    setIsDarkMode((prevDarkMode) => !prevDarkMode);
  };

  return (
    <div >
      <MDBNavbar
        expand="lg"
        light
        id="navbar"
         
      >
        <MDBContainer >
          <LinkContainer to="/">
            <MDBNavbarBrand>
              <img src={Logo} alt="Daf Tech Logo" />
            </MDBNavbarBrand>
          </LinkContainer>

          <MDBNavbarToggler
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
            onClick={() => setShowBasic(!showBasic)}
          >
            <MDBIcon icon="bars" fas />
          </MDBNavbarToggler>

          <MDBCollapse navbar show={showBasic}>
            <MDBNavbarNav className="mr-auto mb-2 mb-lg-0" >
              <LinkContainer to="/">
                <MDBNavbarItem >
                  <MDBNavbarLink active>Home</MDBNavbarLink>
                </MDBNavbarItem>
              </LinkContainer>
              <LinkContainer to="/">
                <MDBNavbarItem>
                  {/* <MDBNavbarLink>Live Chat</MDBNavbarLink> */}
                </MDBNavbarItem>
              </LinkContainer>
              <LinkContainer to="/SimpleFAQ">
                <MDBNavbarItem>
                  <MDBNavbarLink>FAQs</MDBNavbarLink>
                </MDBNavbarItem>
              </LinkContainer>
              <MDBNavbarItem></MDBNavbarItem>
            </MDBNavbarNav>

            <span
              color="none"
              onClick={toggleDarkMode}
              className="toggle-dark-mode mx-4"
              style={{fontSize:"25px", transition:"0.3s", cursor:"pointer"}}
            >
              {isDarkMode ? <MDBIcon icon="sun" /> : <MDBIcon icon="moon" />}
            </span>

            {isLoggedIn ? (
              <div className="d-flex align-items-center ">
                <i
                  className="fas fa-bell mr-3"
                  style={{ marginRight: "25px", fontSize: "24px" }}
                  id="bell"
                ></i>
                <MDBBtn color="danger" onClick={handleLogout} style={{ marginRight: '3px' }}>
                  <i className="fa-solid fa-right-from-bracket"></i>
                </MDBBtn>
              </div>
            ) : null}
            {!isLoggedIn ? (
              // Show login button if not logged in
              <LinkContainer to="/LoginForm">
                <MDBBtn color="success" className="px-3"><i class="fa-regular fa-user d-inline me-2" ></i>Login</MDBBtn>
              </LinkContainer>
            ) : null}
          </MDBCollapse>
        </MDBContainer>
      </MDBNavbar>
    </div>
  );
}

export default Header;
