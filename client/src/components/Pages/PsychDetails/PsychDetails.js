import React, { Component } from 'react'
import { Container, Row, Col, Card, Button, Modal } from 'react-bootstrap'
import Geocode from "react-geocode"


import PsychService from '../../../service/psychologists.service'
import MapContainer from './DetailsMap'
import AppointmentForm from '../AppointmentForm/AppointmentForm'
import Loader from '../../Shared/Loader/Loader'
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

    toggleButton = () => this.setState({ appointmentButtonInactive: true })

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
                            <small>Psicólogo Especializado</small>
                        </div>
                        < hr />
                        {!this.state.psych.meetType.includes('presencial')
                            ?
                            <p className='alert'><small>Este psicólogo solo realiza consultas online.</small></p>
                            : null
                        }
                        <Row>
                            <Col md={4} lg={3} >
                                <div className='details-img'>
                                    <img src={this.state.psych.profileImg} alt={this.state.psych.name} />
                                </div>
                                {this.props.loggedUser
                                    ?
                                    this.props.loggedUser.role === 'PATIENT'
                                        ?
                                        <>
                                            {!this.state.appointmentButtonInactive
                                                ?
                                                <Button onClick={() => this.handleAppointmentModal(true)} className='infobtn' block>Pedir cita</Button>
                                                :
                                                <Button onClick={() => this.handleAppointmentModal(true)} id='infobtn-off' disabled block>Cita pedida</Button>
                                            }

                                            <Button onClick={() => this.handleContactModal(true)} className='contact-btn' block>Contactar</Button>
                                        </>
                                        : null
                                    :
                                    <p className='login-msg'>Inicia sesión para poder contactar y pedir cita con especialistas.</p>
                                    }
                            </Col>
                            <Col md={8} lg={9}>
                                <Row>
                                    <Col xs={7}>
                                        {this.state.psych.shortBio
                                            ?
                                            <>
                                                <h3>Sobre mi:</h3><p>{this.state.psych.shortBio}</p>
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
                                        {this.state.psych.practice.name ?
                                            <Card style={{ width: '100%' }}>
                                                <MapContainer psych={this.state.psych} />
                                                <Card.Text style={{ padding: '10px' }}>
                                                    {this.state.address ? this.state.address : null}
                                                </Card.Text>
                                            </Card>
                                            : null}
                                        <h4 style={{ marginTop: '10px' }}>Horario:</h4>
                                        <p>{this.state.psych.timetable.map(elm => `${elm} | `)}</p>
                                        <h4 style={{ marginTop: '10px' }}>Precio:</h4>
                                        <p>{`${this.state.psych.price} €/hora`}</p>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </>
                    :
                    <Loader />
                }
                <Modal show={this.state.showAppointmentModal} onHide={() => this.handleAppointmentModal(false)}>
                    <Modal.Body>
                        <AppointmentForm closeModal={() => this.handleAppointmentModal(false)} toggleButton={() => this.toggleButton()} psych={this.state.psych} loggedUser={this.props.loggedUser} />
                    </Modal.Body>
                </Modal>
                <Modal show={this.state.showContactModal} onHide={() => this.handleContactModal(false)}>
                    <Modal.Body>
                        {this.state.psych ?
                            <>
                                <a className='wpp' rel='noreferrer' target="_blank" href={`https://api.whatsapp.com/send?phone=34${this.state.psych.telephone}`}>WhatsApp</a>
                                <a className='tlf' href={`tel:+34${this.state.psych.telephone}`}>Llamar</a>
                            </>
                            : null}
                    </Modal.Body>
                </Modal>
            </Container>
        )
    }
}

export default PsychDetails



