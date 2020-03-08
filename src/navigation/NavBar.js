import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import logo from '../assets/images/logo.svg';

class TopNavBar extends React.Component {

    render() {
        return (
            <Navbar collapseOnSelect expand="lg" variant="dark" fixed="top">
                <Navbar.Brand>
                    <img
                        alt=""
                        src={logo}
                        width="30"
                        height="30"
                        className="d-inline-block align-top"
                    />{' '}
                    Classssfication!
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsiveNavbar" />
                <Navbar.Collapse id="responsiveNavbar" >
                </Navbar.Collapse>
            </Navbar>
        )
    }
}

export default TopNavBar;