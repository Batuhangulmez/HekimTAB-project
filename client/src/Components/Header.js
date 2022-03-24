import React, { useEffect, useState } from "react";
import { Button, Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { logout } from "../actions/userActions.js";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState();

  const exit = async (id) => {
    await dispatch(logout(id));
    setUser(null);
    navigate("/");
  };

  useEffect(() => {
    if (localStorage.getItem("user") && !user) {
      setUser(JSON.parse(localStorage.getItem("user")));
    }
  }, [location, user]);

  return (
    <Navbar bg="primary" expand="lg" collapseOnSelect>
      <Container>
        <Link to="/" className="text-white text-decoration-none">
          <Navbar.Brand>HekimTAB</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link className="text-white">Anasayfa</Nav.Link>
            <Nav.Link className="text-white">Profil</Nav.Link>
            {user ? (
              <Nav.Link as={Link} to="/post" className="text-white">
                Paylaş
              </Nav.Link>
            ) : undefined}
            <NavDropdown
              title={<span className="text-white"> Hakkımızda</span>}
              id="basic-nav-dropdown"
            >
              <NavDropdown.Item>Duyurular</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item>İletişim</NavDropdown.Item>
            </NavDropdown>
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
