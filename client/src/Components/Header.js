import React from 'react'
import { Button, Container, Nav, Navbar, NavDropdown } from 'react-bootstrap'
import { Link } from 'react-router-dom'
const Header = () => {
    return (
        <Navbar bg="primary" expand="lg">
            <Container>
                <Link to='/' className='text-white text-decoration-none'>
                    <Navbar.Brand >HekimTAB</Navbar.Brand>
                </Link>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link className='text-white'>Anasayfa</Nav.Link>
                        <Nav.Link className='text-white'>Profil</Nav.Link>
                        <NavDropdown
                            title={<span className='text-white'> Hakkımızda</span>}
                            id="basic-nav-dropdown"
                        >
                            <NavDropdown.Item >Duyurular</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item >İletişim</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
                <Link
                    className='text-white text-decoration-none'
                    to='/auth'
                >
                    <Button variant='outline-light'>
                        Giriş Yap
                    </Button>
                </Link>
            </Container>
        </Navbar>
    )
}

export default Header