import React from 'react';
import { Row, Col, Image } from 'react-bootstrap';

function ClassResults({ classification }) {
    const { className, commonName, isVenomous, confidence, imageUrl } = classification;
    return (
        <Row className="class-results">
            <Col lg={8} md={6}>
                <ul >
                    <li><strong>Species: </strong>{className}</li>
                    <li><strong>Common name: </strong>{commonName}</li>
                    <li><strong>Venomous: </strong>{isVenomous ? "Yes" : "No"}</li>
                    <li><strong>Confidence: </strong>{confidence.toFixed(2)}%</li>
                </ul>
            </Col>
            {imageUrl && <Col lg={4} md={6} className="image-div">
                <Image src={imageUrl} fluid />
            </Col>}
        </Row>
    )
}

export default ClassResults;