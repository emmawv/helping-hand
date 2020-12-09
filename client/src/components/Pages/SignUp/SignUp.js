import React, { Component } from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'

import AuthService from '../../../service/auth.service'
import './SignUp.css'

class Signup extends Component {

    constructor() {
        super()
        this.state = {
            username: '',
            password: ''
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
            .catch(err => console.log('HA HABIDO UN ERROR FUCK', err))
    }


    render() {

        return (

            <Container>

                <Row className='signup-form'>
                    <Col xs={{ span: 10, offset: 1 }} md={5}>
                        <h1>Registro de usuario</h1>
                        <hr />
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Group controlId='email'>
                                <Form.Label>Usuario</Form.Label>
                                <Form.Control type='text' name='email' value={this.state.username} onChange={this.handleInputChange} />
                            </Form.Group>
                            <Form.Group controlId='password'>
                                <Form.Label>Contraseña</Form.Label>
                                <Form.Control type='password' name='password' value={this.state.password} onChange={this.handleInputChange} />
                            </Form.Group>
                            <Button className='login-submit' type='submit'>Registrarme</Button>
                        </Form>
                    </Col>
                    <Col xs={12} md={6}>
                        <div>
                            <img src='https://res.cloudinary.com/djqsmqs26/image/upload/v1607520416/helping-hand/4824_ylo6fb.jpg' alt='illustration person attending a therapy session' />
                        </div>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default Signup