import React, { Component } from 'react'
import { Container, Row, Col, Card, Button, Modal } from 'react-bootstrap'
import Geocode from "react-geocode"

import PsychService from '../../../service/psychologists.service'
import MapContainer from './DetailsMap'
import AppointmentForm from '../AppointmentForm/AppointmentForm'
import './PsychDetails.css'

class PsychDetails extends Component {

    constructor() {
        super()
        this.state = {
            psych: undefined,
            address: undefined,
            showAppointmentModal: false,
            showContactModal: false,
            appointmentButtonInactive: false
        }
        this.psychService = new PsychService()
    }

    componentDidMount = () => {

        const psych_id = this.props.match.params.psych_id

        this.psychService
            .getOnePsych(psych_id)
            .then(res => this.setState({ psych: res.data }))
            .then(() => this.setGeocode())
            .catch((err) => new Error(err))
    }

    handleAppointmentModal = visible => this.setState({ showAppointmentModal: visible })

    handleContactModal = visible => this.setState({ showContactModal: visible })

    toggleButton = () => this.setState({ appointmentButtonInactive: true})

    setGeocode = () => {

        Geocode.setApiKey(process.env.REACT_APP_API_KEY);

        Geocode.setLanguage("es")

        Geocode.setRegion("es");

        Geocode
            .fromLatLng(this.state.psych.practice.location.coordinates[0], this.state.psych.practice.location.coordinates[1])
            .then(response => this.setState({ address: response.results[0].formatted_address }))
            .catch((err) => new Error(err))

    }


    render() {
        return (
            <Container className="psych-details">
                {this.state.psych
                    ?
                    <>
                        <div className='header'>
                            <h1>{this.state.psych.name} {this.state.psych.surname}</h1>
                            <small>Psicologo Especializado</small>
                        </div>
                        < hr />
                        {!this.state.psych.meetType.includes('presencial')
                            ?
                            <p className='alert'><small>Este psicologo solo realiza consultas online</small></p>
                            : null
                        }
                        <Row>
                            <Col md={4} lg={3} >
                                <div className='details-img'>
                                    <img src={this.state.psych.profileImg} alt={this.state.psych.name} />
                                </div>
                                {this.props.loggedUser ?
                                    <>
                                    {!this.state.appointmentButtonInactive
                                        ?
                                        <Button onClick={() => this.handleAppointmentModal(true)} className='infobtn' block>Pedir cita</Button>
                                        :
                                        <Button onClick={() => this.handleAppointmentModal(true)} id='infobtn-off' disabled block>Cita pedida</Button>
                                    }
                                        
                                        <Button onClick={() => this.handleContactModal(true)} className='contact-btn' block>Contactar</Button>
                                    </>
                                    :
                                    <p className='login-msg'>Inicia sesion para poder contactar y pedir cita con especialistas</p>
                                }


                            </Col>
                            <Col md={8} lg={9}>
                                <Row>
                                    <Col xs={7}>
                                        {this.state.psych.description
                                            ?
                                            <>
                                                <h3>Sobre mi:</h3><p>{this.state.psych.description}</p>
                                            </>
                                            : null}
                                        <h4>Problemas y trastornos tratados: </h4>
                                        {this.state.psych.problems.map(elm => {
                                            return (
                                                <>
                                                    <strong>{elm.name}</strong>
                                                    <hr />
                                                    <ul>
                                                        {elm.subgroup.map(elm => <li>{elm}</li>)}
                                                    </ul>
                                                </>
                                            )
                                        })
                                        }
                                    </Col>
                                    <Col xs={5}>
                                        <Card style={{ width: '100%' }}>
                                            <MapContainer psych={this.state.psych} address={this.state.address} />
                                            <Card.Text style={{ padding: '10px' }}>
                                                {this.state.address ? this.state.address : null}
                                            </Card.Text>
                                        </Card>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </>
                    :
                    <p>please wait...loading</p>
                }
                <Modal show={this.state.showAppointmentModal} onHide={() => this.handleAppointmentModal(false)}>
                    <Modal.Body>
                        <AppointmentForm closeModal={() => this.handleAppointmentModal(false)} toggleButton={() => this.toggleButton()} psych={this.state.psych} loggedUser={this.props.loggedUSer}/>
                    </Modal.Body>
                </Modal>
            </Container>
        )
    }
}

export default PsychDetails



