import React from 'react';
import { connect } from 'react-redux';
import { Card, Form, Button, Row, Col } from 'react-bootstrap';
import { classifySnake } from '../actions/classify';

class Classify extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isSubmitting: false
        }
    }

    handleSubmit = (e) => {

        const { dispatch, user } = this.props;

        e.preventDefault();

        if (e.target.input.files.length) {
            const upload_file = e.target.input.files[0];
            dispatch(classifySnake(upload_file, user.uid))
        }
    }

    render() {
        const { isSubmitting } = this.state;
        const { isClassifying, classification } = this.props;
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
                            <Button variant="primary" type="submit" disabled={isSubmitting || isClassifying}>Submit</Button>
                        </div>
                    </Form>
                    {classification && classification.className &&
                        <Row style={{ paddingTop: "2em" }}>
                            <Col>
                                <ul className="class-results">
                                    <li><strong>Species: </strong>{classification.className}</li>
                                    <li><strong>Common name: </strong>{classification.commonName}</li>
                                    <li><strong>Venomous: </strong>{classification.isVenomous}</li>
                                    <li><strong>Confidence: </strong>{classification.confidence}</li>
                                </ul>
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
