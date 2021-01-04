import React, { Component } from 'react'
import { Container } from 'react-bootstrap'

import AppointmentService from '../../../service/appointments.service'
import AppointmentCard from './AppointmentCard'
import Schedule from './Schedule'
import Loader from '../Loader/Loader'


export default class AppointmentPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: undefined,
            appointments: undefined
        }
        this.appointmentService = new AppointmentService()
    }

    componentDidMount = () => {
        this.setState({ user: this.props.loggedUser })

        this.appointmentService
            .getAppointments()
            .then(res => {
                const docAppointments = res.data.filter(elm => elm.psychId._id === this.props.loggedUser._id)

                const patientAppointments = res.data.filter(elm => elm.userId._id === this.props.loggedUser._id)

                this.props.loggedUser.role === 'DOC' ? this.setState({ appointments: docAppointments }) : this.setState({ appointments: patientAppointments })
            })
            .catch(err => new Error(err))
    }

    render() {
        return (
            <>
                {
                    (this.state.user && this.state.appointments)
                        ?
                        <Container className='profile-page'>
                            <h2>Tus citas:</h2>
                            <hr/>
                            <Schedule appointments={this.state.appointments} loggedUser={this.state.user} />

                            {
                                this.state.appointments.sort((a, b) => a.dateStart.localeCompare(b.dateStart)).map(elm =>
                                    <>
                                        <AppointmentCard {...elm} loggedUser={this.state.user} />
                                        <hr />
                                    </>
                                )}
                        </Container>
                        :
                        <Loader />
                }
            </>
        )
    }
}