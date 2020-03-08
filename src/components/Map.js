import React from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import env from '../../env';

class MapContainer extends React.Component {

    displayMarkers = () => {
        return this.props.sightings.map((sight, index) => {
            return <Marker
                key={index} id={index} position={sight.location}
                icon={require("../../assets/images/marker-sm.png")}
                style={{ width: 40, height: 40 }}
                onClick={() => this.handleMarkerClick(sight.id)}
            />
        });
    }

    handleMarkerClick = (id) => {
        this.props.onMarkerClick(id);
    }

    render() {
        return (
            <div style={{ height: '90vh', width: '100%', textAlign: "center" }}>
                {this.props.userPos ? <Map
                    google={this.props.google}
                    onClick={(mapProps, map, clickEvent) => this.mapClicked(clickEvent)}
                    onDragend={this.centerMoved.bind(this)}
                    onBounds_changed={this.boundChanged.bind(this)}
                    zoom={15}
                    initialCenter={this.props.userPos}
                >

                    <Marker position={this.props.userPos}
                        name="Your location"
                        title="Your location"
                        icon={require("../../assets/images/user-map-marker.png")}
                        style={{ width: 40, height: 40 }}
                    />

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