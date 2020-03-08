import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Map from '../components/Map';
import Sighting from '../components/Sighting';

class AllSightings extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            allSightings: [],
            filteredSights: [],
            userPos: {
                lat: 6.933073,
                lng: 79.847517
            },
            expandedSight: {
                location: {}
            },
            speciesFilterValue: -1,
        }
    }

    componentDidMount() {
        this.setUserLocation();
        // this.setSightings();
    }

    setSightings() {
        // TODO:
    }

    setUserLocation() {
        navigator.geolocation.getCurrentPosition(currPos => {
            this.setState({ userPos: { lat: currPos.coords.latitude, lng: currPos.coords.longitude } });
        }, (error) => {
            console.error(error);
        }, { timeout: 20000 });
    }

    selectSighting(id) {
        let expandedSight = this.state.allSightings.find(sight => sight.id === id);

        this.setState({ expandedSight });
    }

    clearSightSelection() {
        this.setState({
            expandedSight: {
                location: {}
            }
        });
    }

    render() {
        return (
            <>
                <Sighting expandedSight={this.state.expandedSight} onSelectClear={this.clearSightSelection.bind(this)} />
                <Container style={{ paddingTop: 30 }} fluid>
                    <Row>
                        <Col style={{ paddingLeft: 0, paddingRight: 0 }}>
                            <Map userPos={this.state.userPos} sightings={this.state.filteredSights} onSightSelect={this.selectSighting.bind(this)} />
                        </Col>
                    </Row>
                </Container>
            </>
        );
    }
}

export default AllSightings