import React, { Component } from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'

import AuthService from '../../../service/auth.service'
import './Login.css'

class Login extends Component {

    constructor() {
        super()
        this.state = {
            email: '',
            password: ''
        }
        this.authService = new AuthService()
    }

    handleInputChange = e => this.setState({ [e.target.name]: e.target.value })

    handleSubmit = e => {
        e.preventDefault()

        this.authService
            .login(this.state)
            .then(theLoggedInUser => {
                this.props.storeUser(theLoggedInUser.data)
                this.props.history.push('/psychologists')
            })
            .catch(err => console.log({ err }))
    }


    render() {

        return (
            <Container>
                <Row className='login-form'>
                    <Col xs={{span: 10, offset:1}} md={5}>
                        <h1>Inicio de sesión</h1>
                        <hr />
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Group controlId='email'>
                                <Form.Label>Email</Form.Label>
                                <Form.Control type='text' name='email' value={this.state.username} onChange={this.handleInputChange} />
                            </Form.Group>
                            <Form.Group controlId='password'>
                                <Form.Label>Contraseña</Form.Label>
                                <Form.Control type='password' name='password' value={this.state.password} onChange={this.handleInputChange} />
                            </Form.Group>
                            <Button className='login-submit' type='submit'>Iniciar sesión</Button>
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

export default Login