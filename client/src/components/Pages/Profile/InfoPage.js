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
                        {loggedUser.role === 'DOC'
                            ?
                            <>
                                <Col xs={4}>
                                    <img className='profilepic-info' src={loggedUser.profileImg} alt='profile pic' />
                                </Col>
                                <Col xs={4}>
                                    <p><strong>Nombre:</strong> {loggedUser.name}</p>
                                    <p><strong>Apellido:</strong> {loggedUser.surname}</p>
                                    <p><strong>Email:</strong> {loggedUser.email}</p>
                                    <p><strong>Telefono:</strong> {loggedUser.telephone}</p>
                                    <p><strong>Sobre ti:</strong> {loggedUser.shortBio}</p>
                                    <p><strong>Tarifa:</strong> {loggedUser.price} €/hora</p>
                                </Col>
                                <Col xs={4}>
                                    <p><strong>Tipo de terapia:</strong> {loggedUser.meetType.length === 1 ? loggedUser.meetType[0] : loggedUser.meetType.map(elm => `${elm} | `)}</p>
                                    {loggedUser.practice.name ?
                                        <>
                                            <p><strong>Consulta:</strong></p>
                                            <p>Nombre: {loggedUser.practice.name}</p>
                                            <p>Ubicacion: {loggedUser.practice.location.coordinates}</p>
                                        </>
                                        : null
                                    }
                                    <p><strong>Horario:</strong> {loggedUser.timetable.map(elm => `${elm} | `)}</p>
                                    <p><strong>Edades tratadas:</strong></p>
                                    <ul>{loggedUser.agesTreated.map(elm => <li>{elm}</li>)}
                                    </ul>
                                </Col>

                            </>
                            :
                            <>
                                <Col xs={{ span: 4, offset: 1 }}>
                                    <img className='profilepic-info' src={loggedUser.profileImg} alt='profile pic' />
                                </Col>
                                <Col xs={4}>
                                    <p><strong>Nombre:</strong> {loggedUser.name}</p>
                                    <p><strong>Apellido:</strong> {loggedUser.surname}</p>
                                    <p><strong>Email:</strong> {loggedUser.email}</p>
                                </Col>
                            </>
                        }


                        <Button type='button' variant='outline-danger' onClick={this.onDeleteClick}> Eliminar cuenta</Button>

                    </Row>
                </Container>
            </>
        )
    }
}

export default InfoPage