import React from 'react';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

class Sighting extends React.Component {

    render() {
        let activeClass = this.props.expandedSight && this.props.expandedSight.name ? "active" : "";return (
            <>
                <Container id="sightDetails" className={"text-left " + activeClass}>
                    <Row style={{ marginBottom: "1.5em" }}>
                        
                    </Row>
                    <div id="sightScrollDetails">
                        
                    </div>
                </Container>
                <div className={"overlay " + activeClass} onClick={this.handleClear} />
            </>
        )
    }
}

export default Sighting;