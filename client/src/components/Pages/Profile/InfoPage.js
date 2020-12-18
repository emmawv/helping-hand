import { Container, Row, Col, Button } from 'react-bootstrap'
import React, { Component } from 'react'
import ProfileService from '../../../service/profile.service'
import AuthService from '../../../service/auth.service'

class InfoPage extends Component {
    constructor() {
        super()
        this.state = {
            user: undefined
        }
        this.profileService = new ProfileService()
        this.authService = new AuthService()
    }

    componentDidMount = () => this.setState({ user: this.props.loggedUser })

    onDeleteClick = () => {
        this.profileService
            .deleteUser(this.state.user._id)
            .then(() => {
                this.props.history.push('/')
                this.props.storeUser(undefined)
            })
            .catch(err => new Error(err))
    }

    render() {
        const { loggedUser } = this.props
        return (
            <>
                <Container className='profile-page'>
                    <h2 className='info-title'>Tus datos</h2>
                    <hr />
                    <Row>
                        <Col xs={{ span: 6, offset: 1 }}>
                            <p><strong>Nombre:</strong> {loggedUser.name}</p>
                            <p><strong>Apellido:</strong> {loggedUser.surname}</p>
                            <p><strong>Email:</strong> {loggedUser.email}</p>
                            <p><strong>Foto de perfil:</strong></p>
                            <img className='profilepic-info' src={loggedUser.profileImg} alt='profile pic' />
                        </Col>
                        <Col xs={4}>
                            <Button type='button' variant='outline-danger' onClick={this.onDeleteClick}> Eliminar cuenta</Button>
                        </Col>
                    </Row>
                </Container>
            </>
        )
    }
}

export default InfoPage