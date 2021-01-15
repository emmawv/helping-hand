import React, { Component } from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import AuthService from '../../../service/auth.service'
import './SignUp.css'
import Alert from '../../Shared/Alert/Alert'

class Signup extends Component {

    constructor() {
        super()
        this.state = {
            formInfo: {
                email: '',
                password: '',
                name: '',
                surname: ''
            },
            showToast: false,
            alertText: ''
        }
        this.authService = new AuthService()
    }

    handleInputChange = e => this.setState({ formInfo: { ...this.state.formInfo, [e.target.name]: e.target.value } })

    handleSubmit = e => {

        e.preventDefault()

        this.authService
            .signup(this.state.formInfo)
            .then(theLoggedInUser => {
                this.props.storeUser(theLoggedInUser.data)
                this.props.history.push('/psychologists')
            })
            .catch(err => this.setState({ showToast: true, alertText: err.response.data.message }))
    }

    handleToast = (visible, text) => this.setState({ showToast: visible, alertText: text })


    render() {

        return (
            <>

                <Container>

                    <Row className='signup-form'>
                        <Col xs={{ span: 10, offset: 1 }} md={5}>
                            <h1>Registro de usuario</h1>
                            <Link to='/psych-signup'>Eres un psicólogo?</Link>
                            <hr />
                            <Form onSubmit={this.handleSubmit}>
                                <Row>
                                    <Col xs={6}>
                                        <Form.Group controlId='name'>
                                            <Form.Label>Nombre</Form.Label>
                                            <Form.Control type='text' name='name' value={this.state.formInfo.name} onChange={this.handleInputChange} required />
                                        </Form.Group>
                                    </Col>
                                    <Col xs={6}>
                                        <Form.Group controlId='surname'>
                                            <Form.Label>Apellido</Form.Label>
                                            <Form.Control type='text' name='surname' value={this.state.formInfo.surname} onChange={this.handleInputChange} required />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Form.Group controlId='email'>
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type='text' name='email' value={this.state.formInfo.email} onChange={this.handleInputChange} required />
                                </Form.Group>
                                <Form.Group controlId='password'>
                                    <Form.Label>Contraseña</Form.Label>
                                    <Form.Control type='password' name='password' value={this.state.formInfo.password} onChange={this.handleInputChange} required />
                                    <small>La contraseña deber tener una longitud mínima de 6 e incluir al menos una mayúscula, un número y un carácter especial.</small>
                                </Form.Group>
                                <Button className='login-submit' type='submit'>Registrarme</Button>
                            </Form>
                        </Col>
                        <Col xs={12} md={6}>
                            <div>
                                <img src='https://res.cloudinary.com/djqsmqs26/image/upload/v1607520324/helping-hand/11098_kfvqo1.jpg' alt='illustration tiny people watering head full of flowers' />
                            </div>
                        </Col>
                    </Row>
                </Container>
                <Alert show={this.state.showToast} handleToast={this.handleToast} toastText={this.state.toastText} />
            </>
        )
    }
}

export default Signup