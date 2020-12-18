import React, { Component } from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import AuthService from '../../../service/auth.service'
import './SignUp.css'

class Signup extends Component {

    constructor() {
        super()
        this.state = {
            email: '',
            password: '',
            name: '',
            surname: ''
        }
        this.authService = new AuthService()
    }

    handleInputChange = e => this.setState({ [e.target.name]: e.target.value })

    handleSubmit = e => {

        e.preventDefault()

        this.authService
            .signup(this.state)
            .then(theLoggedInUser => {
                this.props.storeUser(theLoggedInUser.data)
                this.props.history.push('/psychologists')
            })
            .catch(err => new Error(err))
    }


    render() {

        return (

            <Container>

                <Row className='signup-form'>
                    <Col xs={{ span: 10, offset: 1 }} md={5}>
                        <h1>Registro de usuario</h1>
                        <Link to='/psych-signup'>Eres un psicologo?</Link>
                        <hr />
                        <Form onSubmit={this.handleSubmit}>
                            <Row>
                                <Col xs={6}>
                                    <Form.Group controlId='name'>
                                        <Form.Label>Nombre</Form.Label>
                                        <Form.Control type='text' name='name' value={this.state.name} onChange={this.handleInputChange} />
                                    </Form.Group>
                                </Col>
                                <Col xs={6}>
                                    <Form.Group controlId='surname'>
                                        <Form.Label>Apellido</Form.Label>
                                        <Form.Control type='text' name='surname' value={this.state.surname} onChange={this.handleInputChange} />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Form.Group controlId='email'>
                                <Form.Label>Email</Form.Label>
                                <Form.Control type='text' name='email' value={this.state.email} onChange={this.handleInputChange} />
                            </Form.Group>
                            <Form.Group controlId='password'>
                                <Form.Label>Contraseña</Form.Label>
                                <Form.Control type='password' name='password' value={this.state.password} onChange={this.handleInputChange} />
                                <small>La contraseña debe incluir al menos una mayuscula, un numero y un caracter especial</small>
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
        )
    }
}

export default Signup