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
            allSights: [],
            userPos: {
                lat: 6.933073,
                lng: 79.847517
            },
            expandedSight: {
                location: {}
            },
            speciesFilterValue: 0,
        }
    }

    componentDidMount() {
        this.setUserLocation();
    }

    changeFilter(speciesFilterValue) {
        this.setState({ speciesFilterValue });
    }

    getFilteredBarValues(barValues) {
        const { speciesFilterValue } = this.state;
        if (speciesFilterValue > 0) {
            var filteredList = barValues.filter(bar => bar.classId == speciesFilterValue)
            return filteredList
        }
        return barValues
    }

    getFilteredList(history) {
        const { speciesFilterValue } = this.state;
        if (speciesFilterValue > 0) {
            var filteredList = history.filter(sight => sight.classId == speciesFilterValue)
            return filteredList
        }
        return history
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
        const { history, barValues } = this.props;

        var filteredList = this.getFilteredList(history);
        var filteredBarValues = this.getFilteredBarValues(barValues)

        return (
            <>
                <Sighting expandedSight={this.state.expandedSight} onSelectClear={this.clearSightSelection.bind(this)} />
                <Container style={{ paddingTop: 55 }} fluid>
                    <div className="tab-content row" id="mapPage">
                        <div role="tabpanel" className="tab-pane active col-md-6" style={{ paddingLeft: 0 }} id="mapTab">
                            <Map userPos={this.state.userPos} sightings={filteredList} onSightSelect={this.selectSighting.bind(this)} />
                        </div>
                        <div role="tabpanel" className="tab-pane col-md-6" id="chartTab">
                            <Charts barValues={filteredBarValues} onFilterChange={this.changeFilter.bind(this)} />
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