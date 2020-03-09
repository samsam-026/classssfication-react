import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import logo from '../assets/images/logo.svg';
import { Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { connect } from 'react-redux';

class TopNavBar extends React.Component {

    constructor(props) {
        super(props);

        var links = ["Login", "Register"];

        this.state = {
            links: links,
            home: "/"
        }
    }

    render() {
        const { isAuthenticated } = this.props;
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
                        !isAuthenticated && this.state.links &&
                        this.state.links.map(link => {
                            var linkDest = "/" + link.toLowerCase();
                            return (<LinkContainer key={linkDest} to={linkDest}><Nav.Item>{link}</Nav.Item></LinkContainer>)
                        })
                    }
                </Navbar.Collapse>
            </Navbar>
        )
    }
}

function mapStateToProps(state) {
    return {
        isAuthenticated: state.auth.isAuthenticated,
    };
}
export default connect(mapStateToProps)(TopNavBar);