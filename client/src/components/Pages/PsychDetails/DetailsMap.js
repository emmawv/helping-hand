import React, { Component } from 'react'
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react'

import './PsychDetails.css'

const mapStyles = {
    width: '100%',
    height: '100%'
}

const API_KEY = process.env.REACT_APP_API_KEY

export class MapContainer extends Component {
    state = {
        showingInfoWindow: false,  // Hides or shows the InfoWindow
        activeMarker: {},          // Shows the active marker upon click
        selectedPlace: {}          // Shows the InfoWindow to the selected place upon a marker
    };

    onMarkerClick = (props, marker, e) =>
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true
        });

    onClose = () => {
        if (this.state.showingInfoWindow) {
            this.setState({
                showingInfoWindow: false,
                activeMarker: null
            });
        }
    };

    render() {
        return (
            <aside className='map'>
                <section>
                <Map
                    bootstrapURLKeys={{
                        key: process.env.REACT_APP_GOOGLE_KEY,
                    }}
                    google={this.props.google}
                    zoom={10}
                    style={mapStyles}
                    initialCenter={{ lat: this.props.psych.practice.location.coordinates[0], lng: this.props.psych.practice.location.coordinates[1] }}
                >
                    <Marker position={{ lat: this.props.psych.practice.location.coordinates[0], lng: this.props.psych.practice.location.coordinates[1] }}/>
                    </Map >
                </section>
                <p> {this.props.address} </p>
            </aside>
        )
    }
}

export default GoogleApiWrapper({
    apiKey: API_KEY
})(MapContainer)