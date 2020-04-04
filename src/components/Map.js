import React from 'react';
import { Map, GoogleApiWrapper, Marker, Polygon } from 'google-maps-react';
import env from '../env';
import { allPolygonCoords } from "../data";

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

    displayPolygons = (polygons) => {
        return polygons.map((poly, index) => {
            return <Polygon
                paths={poly.coords}
                strokeColor={poly.color}
                strokeOpacity={0.8}
                strokeWeight={2}
                fillColor={poly.color}
                fillOpacity={0.35} />
        });
    }

    handleMarkerClick = (time) => {
        this.props.onSightSelect(time);
    }

    boundChanged(mapProps, map) {
        let bounds = map.getBounds();
        if (bounds) {
            let newBounds = {
                latBounds: {
                    lower: bounds.Ya.g,
                    upper: bounds.Ya.i
                },
                lngBounds: {
                    lower: bounds.Ta.g,
                    upper: bounds.Ta.i
                }
            }
        }
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
                    {/* {this.displayPolygons(allPolygonCoords)} */}

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