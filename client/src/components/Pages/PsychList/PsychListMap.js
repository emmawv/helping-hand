import React, { Component } from 'react'
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react'

const mapStyles = {
    width: '100%',
    height: '350px'
}

const API_KEY = process.env.REACT_APP_API_KEY

export class MapContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showingInfoWindow: false,  // Hides or shows the InfoWindow
            activeMarker: {},          // Shows the active marker upon click
            selectedPlace: {},         // Shows the InfoWindow to the selected place upon a marker
            psych: this.props.psych
        };
    }

    //componentDidMount = () => this.setState({psych: this.props.psych})


    onMarkerClick = (props, marker, e) => {
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true
        })
    }

    onClose = () => {
        if (this.state.showingInfoWindow) {
            this.setState({
                showingInfoWindow: false,
                activeMarker: null
            });
        }
    }

    render() {

        return (
            <>
                {this.props.psych ?
                    <Map
                        google={this.props.google}
                        zoom={8}
                        style={mapStyles}
                        initialCenter={{ lat: 40.364728375, lng: -3.4563729 }}
                    >
                        {this.state.psych ? this.state.psych.map(elm => {
                            return (
                                <Marker
                                    position={{ lat: elm.practice.location.coordinates[0], lng: elm.practice.location.coordinates[1] }}
                                    onClick={this.onMarkerClick}
                                    name={elm.name}
                                    surname={elm.surname}
                                    image={elm.profileImg}
                                    id={elm._id}
                                />
                            )
                        }) : null}

                        <InfoWindow
                            marker={this.state.activeMarker}
                            visible={this.state.showingInfoWindow}
                            onClose={this.onClose}>
                            <div className='marker'>
                                <img src={this.state.selectedPlace.image} alt='chosen psychologist' />
                                <div>
                                    {this.state.selectedPlace.name} <br />
                                    {this.state.selectedPlace.surname}
                                </div>

                            </div>

                        </InfoWindow>
                    </Map >
                    : null
                }
            </>
        )
    }
}

export default GoogleApiWrapper({
    apiKey: API_KEY
})(MapContainer)