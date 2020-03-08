import React from 'react';
import './App.css';
import TopNavBar from './navigation/NavBar';
import Sighting from './components/Sighting';
import AllSightings from './pages/AllSightings';

class App extends React.Component {

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
    };
  }

  render() {
    return (
      <div className="App">
        <TopNavBar />
        <AllSightings />
      </div>
    );
  }

}

export default App;
