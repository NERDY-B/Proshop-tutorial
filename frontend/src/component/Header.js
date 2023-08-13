import React from 'react';
import { LinkContainer } from 'react-router-bootstrap'
import { Navbar, Nav, Container } from 'react-bootstrap'

const Header = () => {
    return (
        <header>
            <Navbar expand="lg" className="bg-body-tertiary" bg='dark' data-bs-theme='dark' collapseOnSelect>
                <Container>
                    <LinkContainer to='/'>
                        <Navbar.Brand>Proshop</Navbar.Brand>
                    </LinkContainer>

                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className='ml-auto'>
                            <LinkContainer to='/cart'>
                                <Nav.Link >
                                    <i className='fas fa-shopping-cart'></i>Cart
                                </Nav.Link>
                            </LinkContainer>

                            <LinkContainer to='/login'>
                                <Nav.Link>
                                    <i className="fa fa-user" aria-hidden="true"></i>Sign in
                                </Nav.Link>
                            </LinkContainer>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}

export default Header