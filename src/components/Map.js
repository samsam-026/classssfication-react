import React from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import env from '../env';

class MapContainer extends React.Component {

    displayMarkers = () => {
        return this.props.sightings.map((sight, index) => {
            return <Marker
                key={index} id={index} position={sight.location}
                icon={require("../assets/images/marker-sm.png")}
                style={{ width: 40, height: 40 }}
                onClick={() => this.handleMarkerClick(sight.time)}
            />
        });
    }

    handleMarkerClick = (time) => {
        this.props.onSightSelect(time);
    }

    render() {
        return (
            <div style={{ height: '87vh', textAlign: "center" }}>
                {this.props.userPos ? <Map
                    google={this.props.google}
                    // onClick={(mapProps, map, clickEvent) => this.mapClicked(clickEvent)}
                    // onDragend={this.centerMoved.bind(this)}
                    // onBounds_changed={this.boundChanged.bind(this)}
                    zoom={15}
                    initialCenter={this.props.userPos}
                >
                    {this.displayMarkers()}
                </Map> :
                    <h1 className="display-2" style={{ margin: "auto" }}>Loading...</h1>
                }
            </div>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: env.googleApi
})(MapContainer);