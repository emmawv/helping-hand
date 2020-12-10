import React, { Component } from 'react'
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react'

const { REACT_APP_APIKEY }  = process.env

const mapStyles = {
    width: '90%',
    height: '200px',
    margin: '0 auto',
    position: 'relative'
};

export class MapContainer extends Component {
    static defaultProps = {
        center: {
            lat: 59.95,
            lng: 30.33
        },
        zoom: 11
    }

    render() {
        console.log(REACT_APP_APIKEY)
        return (
        <Map
                google={this.props.google}
                zoom={8}
                style={mapStyles}
                initialCenter={{ lat: 47.444, lng: -122.176 }}>
            <Marker position={{ lat: 48.00, lng: -122.00}} />
        </Map >
        )
    }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyDrqyxE2ho0Doz9WF4CwgnTFEl_LF0DiB0'
})(MapContainer)