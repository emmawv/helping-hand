import React, { Component } from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'

import AuthService from '../../../service/auth.service'
import './Login.css'

class Login extends Component {

    constructor() {
        super()
        this.state = {
            formInfo: {
                username: '',
                password: ''
            },
            alertText: ''
        }
        this.authService = new AuthService()
    }

    handleInputChange = e => this.setState({ formInfo: { ...this.state.formInfo, [e.target.name]: e.target.value } })

    handleSubmit = e => {
        e.preventDefault()

        this.authService
            .login(this.state.formInfo)
            .then(theLoggedInUser => {
                this.props.storeUser(theLoggedInUser.data)
                this.props.history.push('/')
            })
            .catch(err => this.setState({ alertText: err.response.data.message }))
    }

    handleToast = (visible, text) => this.setState({ showToast: visible, toastText: text })

    render() {

        return (
            <>
                <Container>
                    <Row className='login-form'>
                        <Col xs={{ span: 10, offset: 1 }} md={5}>
                            <h1>Inicio de sesión</h1>
                            <hr />
                            <Form onSubmit={this.handleSubmit}>
                                <Form.Group controlId='email'>
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type='text' name='username' value={this.state.username} onChange={this.handleInputChange} />
                                </Form.Group>
                                <Form.Group controlId='password'>
                                    <Form.Label>Contraseña</Form.Label>
                                    <Form.Control type='password' name='password' value={this.state.password} onChange={this.handleInputChange} />
                                </Form.Group>
                                {this.state.alertText ?
                                    <div className='error-message'>{this.state.alertText}
                                    </div>
                                    : null}

                                <Button className='login-submit' type='submit'>Iniciar sesión</Button>
                            </Form>

                        </Col>
                        <Col xs={12} md={6}>
                            <div>
                                <img src='https://res.cloudinary.com/djqsmqs26/image/upload/v1607520416/helping-hand/4824_ylo6fb.jpg' alt='illustration person attending a therapy session' />
                            </div>
                        </Col>
                    </Row>
                </Container>
            </>
        )
    }
}

export default Login