import React, { Component } from 'react'
import { Container, Accordion, Card, Button } from 'react-bootstrap'

import AppointmentService from '../../../service/appointments.service'
import AppointmentCard from './AppointmentCard'
import Schedule from './Schedule'
import './Profile.css'





export default class Profile extends Component {
    constructor() {
        super()
        this.state = {
            user: undefined,
            appointments: undefined
        }
        this.appointmentService = new AppointmentService()
    }

    componentDidMount = () => {
        this.setState({ user: this.props.loggedUser })
        this.appointmentService
            .getPatientAppointments()
            .then(res => this.setState({ appointments: res.data }))
            .catch(err => console.log(err))
    }

    render() {

        return (
            <Container className='profile-page'>
                {
                    (this.state.user && this.state.appointments)
                        ?
                        <>
                            <h1>Bienvenid@, {this.state.user.name}</h1>
                            <h2>Tus citas:</h2>
                            <Accordion>
                                <Card>
                                    <Card.Header>
                                        <Accordion.Toggle as={Button} variant="link" eventKey="0">
                                            Mostrar el calendario
                                </Accordion.Toggle>
                                    </Card.Header>
                                    <Accordion.Collapse eventKey="0">
                                        <Card.Body style={{ height: '100%' }}>
                                            <Schedule appointments={this.state.appointments} />
                                        </Card.Body>
                                    </Accordion.Collapse>
                                </Card>
                            </Accordion>
                            {/* <Schedule appointments={this.state.appointments} /> */}
                            
                            {this.state.appointments.sort((a, b) => a.dateStart.localeCompare(b.dateStart)).map(elm =>
                                <>
                                    <AppointmentCard {...elm} />
                                    <hr />
                                </>)}
                        </>
                        :
                        <h2>Gracias por tu paciencia, estamos cargando la informacion de tu perfil</h2>
                }
            </Container>

        )
    }
}