import React from 'react';
import logo from './logo.svg';
import './App.css';
import TopNavBar from './navigation/NavBar';
import Map from './components/Map';
import Sighting from './components/Sighting';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      allSightings: [],
      filteredSights: [],
      userPos: {},
      expandedSight: {
        location: {}
      },
      speciesFilterValue: -1,
    };
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
      <div className="App">
        <Sighting expandedSight={this.state.expandedSight} onSelectClear={this.clearSightSelection.bind(this)} />
        <TopNavBar />
        <Map userPos={this.state.userPos} sightings={this.state.filteredSights} onSightSelect={this.selectSighting.bind(this)} />
      </div>
    );
  }

}

export default App;
