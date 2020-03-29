import React from 'react';
import { Card } from 'react-bootstrap';
import CanvasJSReact from '../canvasjs.react';
// var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class Charts extends React.Component {

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
                    <CanvasJSChart options={options} />
                </Card.Body>
            </Card>
        );
    }
}

export default Charts;