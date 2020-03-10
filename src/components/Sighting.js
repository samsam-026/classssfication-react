import React from 'react';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import ClassResults from './ClassResults';

class Sighting extends React.Component {

    handleClear = () =>{
        this.props.onSelectClear();
    }

    render() {
        const { expandedSight } = this.props;
        let activeClass = expandedSight && expandedSight.classId ? "active" : "";
        return (
            <>
                <Container id="sightDetails" className={"text-left " + activeClass}>
                    <Row style={{ marginBottom: "1.5em" }}>

                    </Row>
                    <div id="sightScrollDetails">
                        <ClassResults classification={expandedSight} />
                    </div>
                </Container>
                <div className={"overlay " + activeClass} onClick={this.handleClear} />
            </>
        )
    }
}

export default Sighting;