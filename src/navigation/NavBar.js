import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import logo from '../assets/images/logo.svg';
import { Link } from 'react-router-dom'
import { Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

class TopNavBar extends React.Component {

    constructor(props) {
        super(props);

        var links = ["Login", "Register"];
        var home = "/"

        if (props.isLoggedIn) {
            links = [];
            home = "/home"
        }

        this.state = {
            links: links,
            home: home
        }
    }

    render() {
        return (
            <Navbar collapseOnSelect expand="lg" variant="dark" fixed="top">
                <LinkContainer to={this.state.home}>
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
                </LinkContainer>
                <Navbar.Toggle aria-controls="responsiveNavbar" />
                <Navbar.Collapse id="responsiveNavbar" className="justify-content-end" >
                    {
                        this.state.links && this.state.links.length > 0 &&
                        this.state.links.map(link => {
                            var linkDest = "/" + link.toLowerCase();
                            return (<LinkContainer to={linkDest}><Nav.Item>{link}</Nav.Item></LinkContainer>)
                        })
                    }
                </Navbar.Collapse>
            </Navbar>
        )
    }
}

export default TopNavBar;