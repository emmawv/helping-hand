import React, { Component } from 'react'
import AppointmentService from './../../../service/appointments.service'
import Geocode from "react-geocode"

import { Form, Button } from 'react-bootstrap'

class AppointmentForm extends Component {

    constructor() {
        super()
        this.state = {
            psychId: '',
            time: '',
            date: '',
            message: '',
            meetType: '',
            availableTimes: undefined,
            address: undefined
        }
        this.appointmentService = new AppointmentService()
    }


    componentDidMount = () => {
        this.setState({
            psychId: this.props.psych._id
        }, () => this.setGeocode())
    }

    handleDateInputChange = e => {
        this.setState({
            date: e.target.value
        }, () => {
            this.filterTimes()
        })

    }

    filterTimes = () => {
        this.appointmentService
            .getAppointments()
            .then(res => {
                const docAppointments = res.data.filter(elm => elm.psychId._id === this.props.psych._id)

                const bookedTimes = []

                docAppointments.filter(elm => {
                    const date = new Date(elm.dateStart)
                    let month = date.getMonth() + 1
                    let dt = date.getDate()

                    if (dt < 10) {
                        dt = '0' + dt;
                    }
                    if (month < 10) {
                        month = '0' + month;
                    }

                    const formattedDate = (date.getFullYear() + '-' + month + '-' + dt)

                    return (formattedDate === this.state.date)
                }).forEach(dateelm => bookedTimes.push(dateelm.time))
                    
                const availableTimes = [...this.props.psych.timetable].filter(elm => !bookedTimes.includes(elm))

                return (availableTimes)
            })
            .then(availableTimes => this.setState({ availableTimes: [...availableTimes] }))
            .catch(err => new Error(err))
    }

    setGeocode = () => {

        Geocode.setApiKey(process.env.REACT_APP_API_KEY);

        Geocode.setLanguage("es")

        Geocode.setRegion("es");

        Geocode
            .fromLatLng(this.props.psych.practice.location.coordinates[0], this.props.psych.practice.location.coordinates[1])
            .then(response => this.setState({ address: response.results[0].formatted_address }))
            .catch((err) => new Error(err))

    }

    handleInputChange = e => this.setState({ [e.target.name]: e.target.value })

    handleSubmit = e => {
        e.preventDefault()

        this.appointmentService
            .makeNewAppointment(this.state)
            .then(res => {
                this.props.closeModal()
                this.props.toggleButton()
            })
            .catch(err => new Error(err))
    }


    render() {

        return (
            <>
                {this.props.psych ?
                    <>
                        <h1>Nueva cita con {this.props.psych.name} {this.props.psych.surname}</h1>
                        <hr />

                        <Form onSubmit={this.handleSubmit}>
                            <Form.Group controlId="date">
                                <Form.Label>Fecha</Form.Label>
                                <Form.Control type="date" name="date" value={this.state.date} onChange={this.handleDateInputChange} />
                            </Form.Group>
                            {(this.state.date && this.state.availableTimes) ?
                                <>
                                    {this.props.psych.meetType.includes('presencial')
                                        ?
                                        <Form.Group>
                                            <Form.Label>Forma de terapia</Form.Label>
                                            <Form.Check value="presencial" label="Presencial" type='radio' id='presencial' name='meetType' onChange={this.handleInputChange} />
                                            <Form.Check value="remota" label="Remota" type='radio' id='remota' name='meetType' onChange={this.handleInputChange} />
                                        </Form.Group>
                                        : null}
                                    <Form.Group controlId="time">
                                        <Form.Label>Hora</Form.Label>
                                        <Form.Control as="select" name='time' onChange={this.handleInputChange}>
                                            <option selected>Select one...</option>
                                            {this.state.availableTimes.map(elm => <option>{elm}</option>)}
                                        </Form.Control>
                                    </Form.Group>
                                    <Form.Group controlId="message">
                                        <Form.Label>Mensaje</Form.Label>
                                        <Form.Control as="textarea" rows={3} name="message" value={this.state.message} onChange={this.handleInputChange} placeholder={'Si hay algo que creas que necesite saber este especialista antes de acudir a tu cita hazselo saber...'} />
                                    </Form.Group>
                                </>
                                : <p>Please select a date to continue</p>
                            }
                            <Button type="submit" variant='info'>Pedir cita</Button>
                        </Form>
                    </>
                    : <p>Loading</p>
                }
            </>
        )
    }
}

export default AppointmentForm