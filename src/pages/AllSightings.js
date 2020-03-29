import React from 'react';
import Container from 'react-bootstrap/Container';
import Map from '../components/Map';
import Sighting from '../components/Sighting';
import { connect } from 'react-redux';
import Charts from '../components/Charts';

class AllSightings extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
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

    selectSighting(time) {
        let expandedSight = this.props.history.find(sight => sight.time === time);
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
        const { history } = this.props;

        return (
            <>
                <Sighting expandedSight={this.state.expandedSight} onSelectClear={this.clearSightSelection.bind(this)} />
                <Container style={{ paddingTop: 55 }} fluid>
                    <div className="tab-content row" id="mapPage">
                        <div role="tabpanel" className="tab-pane active col-md-6" style={{ paddingLeft: 0 }} id="mapTab">
                            <Map userPos={this.state.userPos} sightings={history} onSightSelect={this.selectSighting.bind(this)} />
                        </div>
                        <div role="tabpanel" className="tab-pane col-md-6" id="chartTab">
                            <Charts barValues={this.props.barValues}/>
                        </div>
                    </div>

                    <ul data-role="navbar" className="nav nav-tabs d-md-none" id="bottomTabs" role="tablist">
                        <li className="nav-item">
                            <a className="btn active" href="#mapTab" aria-controls="mapTab" data-toggle="tab">Map</a>
                        </li>
                        <li className="nav-item">
                            <a className="btn" href="#chartTab" aria-controls="chartTab" data-toggle="tab">List</a>
                        </li>
                    </ul>
                </Container>
            </>
        );
    }
}

function mapStateToProps(state) {
    return {
        history: state.classify.history,
        barValues: state.classify.barValues
    };
}
export default connect(mapStateToProps)(AllSightings);