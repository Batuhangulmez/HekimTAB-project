import React, { useEffect } from "react";
import { Button, Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { logout } from "../actions/userActions.js";
import Logo from "../images/Logo.png";
import styles from "../mystyle.module.css";

const Header = ({ onhandleUser, user }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const exit = async (id) => {
    await dispatch(logout(id));
    onhandleUser(null);
    navigate("/auth");
  };

  useEffect(async () => {
    if (localStorage.getItem("user") && !user) {
      onhandleUser(JSON.parse(localStorage.getItem("user")));
    }
  }, [location, user]);

  return (
    <Navbar style={{ backgroundColor: "#089BAB" }} expand="lg" collapseOnSelect>
      <Container>
        <Link to="/" className="text-white text-decoration-none">
          <Navbar.Brand
            style={{
              color: "#078a96",
              backgroundColor: "#ceebee",
              paddingInline: "8px",
              borderRadius: "12px",
            }}
          >
            Hekim<span style={{ color: "#D32525" }}>TAB</span>
          </Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/" className="text-white">
              Anasayfa
            </Nav.Link>
            {user ? (
              <Nav>
                <Nav.Link as={Link} to="/post" className="text-white">
                  Paylaş
                </Nav.Link>
                <Nav.Link as={Link} to="/profile" className="text-white">
                  Profil
                </Nav.Link>
              </Nav>
            ) : undefined}
          </Nav>
        </Navbar.Collapse>
        {user ? (
          <Link className="text-white text-decoration-none" to="/auth">
            <Button
              onClick={(e) => {
                exit(user.user._id);
              }}
              variant="outline-light"
              block
            >
              Çıkış yap
            </Button>
          </Link>
        ) : (
          <Link className="text-white text-decoration-none" to="/auth">
            <Button variant="outline-light" block>
              Giriş Yap
            </Button>
          </Link>
        )}
      </Container>
    </Navbar>
  );
};

export default Header;
