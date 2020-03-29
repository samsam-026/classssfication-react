import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import CanvasJSReact from '../canvasjs.react';
import Form from 'react-bootstrap/Form';

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

class Charts extends React.Component {

    handleFilterChange = (e) => {
        let { onFilterChange } = this.props;
        onFilterChange(parseInt(e.target.value));
    };

    render() {
        const { barValues } = this.props;
        const options = {
            animationEnabled: true,
            theme: "light2",
            title: {
                text: "Snake species sighting distribution"
            },
            axisX: {
                title: "Species",
            },
            axisY: {
                title: "Number of Sightings",
            },
            data: [{
                type: "bar",
                dataPoints: barValues
            }]
        }
        return (
            <Card id="chartCard">
                <Card.Body>
                    <Row>
                        <Col>
                            <Form>
                                <Form.Group>
                                    <Form.Label>Snake Species</Form.Label>
                                    <Form.Control ref={rateSelect => this.rateSelect} as="select" id="speciesFilterVal" onChange={this.handleFilterChange}>
                                        <option value={0}>All Species</option>
                                        <option value={1}>Northern water snake</option>
                                        <option value={2}>Common garter snake</option>
                                        <option value={3}>DeKay's brown snake</option>
                                        <option value={4}>Black rat snake</option>
                                        <option value={5}>Western diamondback rattlesnake</option>
                                    </Form.Control>
                                </Form.Group>
                            </Form>
                        </Col>
                    </Row>
                    <CanvasJSChart options={options} />
                </Card.Body>
            </Card>
        );
    }
}

export default Charts;