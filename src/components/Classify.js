import React from 'react';
import { connect } from 'react-redux';
import { Card, Form, Button, Row, Col, Spinner } from 'react-bootstrap';
import { classifySnake } from '../actions/classify';
import ClassResults from './ClassResults';

class Classify extends React.Component {

    handleSubmit = (e) => {
        const { dispatch, user } = this.props;
        e.preventDefault();

        if (e.target.input.files.length) {
            const upload_file = e.target.input.files[0];
            dispatch(classifySnake(upload_file, user.uid))
        }
    }

    render() {
        const { isClassifying, classification, classifyError } = this.props;
        return (
            <Card>
                <Card.Body>
                    <h2>Classify</h2>
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Group controlId="formFile">
                            <Form.Label>Image File</Form.Label>
                            <Form.Control
                                type="file"
                                name="input"
                                placeholder="Choose image"
                            />
                        </Form.Group>
                        <div className="text-center">
                            {isClassifying ? <Spinner animation="border" variant="primary" /> : <Button variant="primary" type="submit" disabled={isClassifying}>Submit</Button>}
                        </div>
                    </Form>
                    {classification && classification.className &&
                        <Row>
                            <Col>
                                <ClassResults classification={classification} />
                            </Col>
                        </Row>
                    }
                    {
                        classifyError && classifyError.message &&
                        <Row>
                            <Col>
                                <p>{classifyError.message}</p>
                            </Col>
                        </Row>
                    }
                </Card.Body>
            </Card>
        );
    }

}

function mapStateToProps(state) {
    return {
        isClassifying: state.classify.isClassifying,
        classification: state.classify.classification,
        classifyError: state.classify.classifyError,
        user: state.auth.user
    };
}
export default connect(mapStateToProps)(Classify);
