import React from 'react';
import TopNavBar from '../navigation/NavBar';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class Register extends React.Component {

    render() {
        return (
            <div>
                <Container style={{ paddingTop: 60 }} fluid>
                    <Row>
                        <Col>
                            <h1>Register</h1>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }

}

export default Register;
