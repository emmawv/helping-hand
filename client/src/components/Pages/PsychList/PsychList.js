import React, { Component } from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'

import PsychService from './../../../service/psychologists.service'
import PsychCard from './PsychCard'
import MapContainer from './PsychListMap'
import Loader from '../Loader/Loader'
import './PsychList.css'

class PsychList extends Component {

    constructor() {
        super()
        this.state = {
            psych: [],
            showModal: false,
            showMap: false
        }
        this.psychService = new PsychService()
    }

    componentDidMount = () => this.refreshPsych()

    refreshPsych = () => {
        this.psychService
            .getAllPsych()
            .then(res => {
                this.setState({ psych: res.data })
            })
            .catch((err) => new Error(err))
    }

    handleModal = visible => this.setState({ showModal: visible })

    toggleButton = () => this.setState({ appointmentInactive: true })

    toggleMapView = () => !this.state.showMap ? this.setState({ showMap: true }) : this.setState({ showMap: false })

    render() {
        return (
            <>
                <Container className='psych-page'>
                    <Row>
                        <Col xs={12}>
                            <h1 className='title'>Listado de psicólogos</h1>
                            <Button className='map-button' variant='outline-info' onClick={this.toggleMapView}>Ver mapa</Button>
                            <hr />
                            <section className='map-container' style={{ height: this.state.showMap ? '250px' : '0' }}>
                                <MapContainer className='list-map' psych={this.state.psych} />
                            </section>

                        </Col>
                        <Col xs={12}>
                            <Row>
                                {
                                    this.state.psych.length ? this.state.psych.map(elm => {
                                        return (

                                            <>
                                                <Col xs={12}>
                                                    <PsychCard key={elm._id} {...elm} />
                                                </Col>
                                                <hr />
                                            </>
                                        )
                                    })
                                        :
                                        <Loader />
                                }
                            </Row>
                        </Col>
                    </Row>
                </Container>

            </>
        )
    }
}

export default PsychList