import React from 'react';
import { connect } from 'react-redux';
import { Card, Form, Button, Row, Col, Spinner, Image } from 'react-bootstrap';
import { classifySnake } from '../actions/classify';
import ClassResults from './ClassResults';

class Classify extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            file: null,
            fileURL: null
        }
    }

    handleSubmit = (e) => {
        const { dispatch, user } = this.props;
        const { file } = this.state;
        e.preventDefault();

        if (file) {
            dispatch(classifySnake(file, user.uid))
        }else{
            alert("Please add an image to classify.");
        }
    }

    handleFileChange(event) {
        this.setState({
            fileURL: URL.createObjectURL(event.target.files[0]),
            file: event.target.files[0]
        })
    }

    render() {
        const { isClassifying, classification, classifyError } = this.props;
        const { fileURL } = this.state;
        return (
            <Card>
                <Card.Body>
                    <h2>Classify</h2>
                    <Form onSubmit={this.handleSubmit}>
                        <Row>
                            <Col lg={8} >
                                <Form.Group controlId="formFile">
                                    <Form.Label>Image File</Form.Label>
                                    <Form.Control
                                        type="file"
                                        name="input"
                                        placeholder="Choose image"
                                        onChange={this.handleFileChange.bind(this)}
                                    />
                                </Form.Group>
                            </Col>
                            <Col lg={4} >
                                {
                                    fileURL && <Image src={fileURL} fluid />
                                }
                            </Col>
                        </Row>
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
