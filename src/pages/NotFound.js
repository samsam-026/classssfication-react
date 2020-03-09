import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class NotFound extends React.Component {

    render() {
        return (
            <div>
                <Container style={{ paddingTop: 60 }} fluid>
                    <Row>
                        <Col>
                            <h1>404 Not Found</h1>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }

}

export default NotFound;
