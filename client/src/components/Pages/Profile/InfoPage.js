import { Container, Row, Col, Button, Modal } from 'react-bootstrap'
import React, { Component } from 'react'
import ProfileService from '../../../service/profile.service'
import AuthService from '../../../service/auth.service'

import './Profile.css'

class InfoPage extends Component {
    constructor() {
        super()
        this.state = {
            user: undefined,
            showDeleteModal: false
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

    handleDeleteModal = visible => this.setState({ showDeleteModal: visible })

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
                                <Col xs={{ span: 10, offset: 1 }} lg={3}>
                                    <img className='profilepic-info' src={loggedUser.profileImg} style={{ marginBottom: '20px' }} alt='profile pic' />
                                </Col>
                                <Col xs={{ span: 10, offset: 1 }} lg={3}>
                                    <p><strong>Nombre:</strong> {loggedUser.name}</p>
                                    <p><strong>Apellido:</strong> {loggedUser.surname}</p>
                                    <p><strong>Email:</strong> {loggedUser.email}</p>
                                    <p><strong>Telefono:</strong> {loggedUser.telephone}</p>
                                    <p><strong>Sobre ti:</strong> {loggedUser.shortBio}</p>
                                    <p><strong>Tarifa:</strong> {loggedUser.price} €/hora</p>
                                </Col>
                                <Col xs={{ span: 10, offset: 1 }} lg={3}>
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
                                <Col xs={{ span: 9, offset: 1 }} lg={4}>
                                    <Button type='button' variant='outline-danger' style={{ margin: '10px 10px 50px 0' }} onClick={this.handleContactModal}> Eliminar cuenta</Button>
                                </Col>

                            </>
                            :
                            <>
                                <Col xs={{ span: 10, offset: 1 }} sm={{ span: 3, offset: 3 }}>
                                    <img className='profilepic-info' src={loggedUser.profileImg} alt='profile pic' />
                                </Col>
                                <Col xs={{ span: 10, offset: 1 }} sm={3}>
                                    <p><strong>Nombre:</strong> {loggedUser.name}</p>
                                    <p><strong>Apellido:</strong> {loggedUser.surname}</p>
                                    <p><strong>Email:</strong> {loggedUser.email}</p>
                                </Col>
                                <Col xs={{ span: 9, offset: 1 }} sm={{ span: 4, offset: 3 }}>
                                    <Button type='button' variant='outline-danger' style={{ margin: '10px 10px 50px 0' }} onClick={() => this.handleDeleteModal(true)}> Eliminar cuenta</Button>
                                </Col>
                            </>
                        }


                    </Row>
                    <Modal show={this.state.showDeleteModal} onHide={() => this.handleDeleteModal(false)} centered='true' >
                        <Modal.Body>
                            <p>¿Estás seguro de que quieres eliminar tu cuenta?</p>
                            <div style={{ textAlign: 'right' }}>
                                <Button variant='outline-info' size='sm' style={{ marginRight: '10px' }} onClick={() => this.handleDeleteModal(false)}>Cancelar</Button>
                                <Button variant='outline-danger' size='sm' onClick={this.onDeleteClick}>Eliminar</Button>
                            </div>
                        </Modal.Body>
                    </Modal>
                </Container>
            </>
        )
    }
}

export default InfoPage