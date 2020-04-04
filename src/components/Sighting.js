import React from 'react';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import ClassResults from './ClassResults';
import { Col } from 'react-bootstrap';
import env from '../env';
import { getFormatedDate } from '../utils/dateFormatter';

class Sighting extends React.Component {

    handleClear = () => {
        this.props.onSelectClear();
    }

    render() {
        const { expandedSight } = this.props;
        let activeClass = expandedSight && expandedSight.classId ? "active" : "";
        var formattedDate = expandedSight && expandedSight.time ? getFormatedDate(expandedSight.time) : ""
        let streetviewImage = "https://maps.googleapis.com/maps/api/streetview?size=700x250&location=" + expandedSight.location.lat + "," + expandedSight.location.lng + "&key=" + env.googleApi;

        return (
            <>
                <Container id="sightDetails" className={"text-left " + activeClass}>
                    <Row style={{ marginBottom: "1.5em" }}>
                        <Col>
                            <h3>Location: <span style={{ fontWeight: "normal" }}>{expandedSight.location.lat + ", " + expandedSight.location.lng}</span></h3>
                            <h4>Time: <span style={{ fontWeight: "normal" }}>{formattedDate}</span></h4>
                        </Col>
                    </Row>

                    <Row id="imageRow">
                        <Col className="text-center">
                            <img src={streetviewImage} alt={"Sighting Street View"} />
                        </Col>
                    </Row>
                    <div id="sightScrollDetails">
                        {expandedSight && expandedSight.classId && <ClassResults classification={expandedSight} />}
                    </div>
                </Container>
                <div className={"overlay " + activeClass} onClick={this.handleClear} />
            </>
        )
    }
}

export default Sighting;