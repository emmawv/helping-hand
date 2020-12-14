import React, { Component } from 'react'
import AppointmentService from './../../../service/appointments.service'

import { Container, Row, Col, Form, Button } from 'react-bootstrap'

class AppointmentForm extends Component {

    constructor() {
        super()
        this.state = {
            psychId: '',
            time: '',
            date: ''
        }
        this.appointmentService = new AppointmentService()
    }

    handleInputChange = e => this.setState({ [e.target.name]: e.target.value })

    handleSubmit = e => {
        e.preventDefault()

        this.appointmentService
            .makeNewAppointment(this.state)
            .then(res => {
                console.log(res)
                this.props.closeModal()
                this.props.toggleButton()
            })
            .catch(err => console.log(err))
    }

    componentDidMount = () => this.setState({psych: this.props.psych})


    render() {

        return (
            <>
                {this.props.psych ?
                    <>
                        <h1>Nueva cita con {this.props.psych.name} {this.props.psych.surname}</h1>
                        <hr />

                        <Form onSubmit={this.handleSubmit}>
                            <Form.Group controlId="time">
                                <Form.Label>Time</Form.Label>
                                <Form.Control as="select" name='time' onChange={this.handleInputChange}>
                                    <option selected>Select one...</option>
                                    {this.props.psych.timetable.map(elm => <option>{elm}</option>)}
                                </Form.Control>
                            </Form.Group>
                            <Form.Group controlId="date">
                                <Form.Label>Date</Form.Label>
                                <Form.Control type="date" name="date" value={this.state.date} onChange={this.handleInputChange} />
                            </Form.Group>
                            <Button type="submit">Pedir cita</Button>
                        </Form>
                    </>
                    : <p>Loading</p>
                }
            </>
        )
    }
}

export default AppointmentForm