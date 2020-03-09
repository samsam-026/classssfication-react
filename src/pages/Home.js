import React from 'react';
import TopNavBar from '../navigation/NavBar';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class Home extends React.Component {

    render() {
        return (
            <div>
                <Container style={{ paddingTop: 60 }} fluid>
                    <Row>
                        <Col>
                            <h1>Home</h1>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }

}

export default Home;
