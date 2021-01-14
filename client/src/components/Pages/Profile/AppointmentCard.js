import { Col, Row } from 'react-bootstrap'
import Moment from 'react-moment'
import 'moment/locale/es'

import './Profile.css'

const AppointmentCard = ({ userId, psychId, dateStart, dateEnd, message, meetType, loggedUser, address, status }) => {

    return (
        <>
            {loggedUser.role === 'PATIENT'
                ?
                <Row className='app-card'>
                    <Col xs={12} sm={4}>
                        <img src={psychId.profileImg} alt='psychologist' />
                    </Col>
                    <Col xs={12} sm={8}>
                        <Row>
                            <Col xs={6} sm={12}>
                                <p><strong>Psicologo:</strong> {psychId.name} {psychId.surname}</p>
                                <p><strong>Fecha:</strong> <Moment format="ddd D MMM YYYY" locale="es">{dateStart}</Moment></p>
                                <p><strong>Hora:</strong> <Moment format="HH:mm" subtract={{ hours: 1 }}>{dateStart}</Moment> - <Moment format="HH:mm" subtract={{ hours: 1 }}>{dateEnd}</Moment></p>
                            </Col>
                            <Col xs={6} sm={12}>
                                <p><strong>Tu mensaje:</strong> {message}</p>
                                <p><strong>Tipo de terapia:</strong> {meetType}</p>
                                {meetType === 'presencial' ? <p><strong>Direccion:</strong> {address}</p> : null}
                            </Col>
                        </Row>
                    </Col>
                </Row>
                :
                <div className='container-div'>
                    <div className='inactive' style={{ display: status === 'inactive' ? 'block' : 'none' }}>
                        <p>Esta cita ha sido eliminada por el usuario.</p>
                    </div>
                    <div style={{padding: '0.02px'}}>
                        <Row className='app-card'>
                            <Col xs={12} sm={4}>
                                <img src={userId.profileImg} alt='user' />
                            </Col>
                            <Col xs={12} sm={8}>
                                <Row>
                                    <Col xs={6} sm={12}>
                                        <p><strong>Paciente:</strong> {userId.name} {userId.surname}</p>
                                        <p><strong>Fecha:</strong> <Moment format="ddd D MMM YYYY" locale="es">{dateStart}</Moment></p>
                                        <p><strong>Hora:</strong> <Moment format="HH:mm" subtract={{ hours: 1 }}>{dateStart}</Moment> - <Moment format="HH:mm" subtract={{ hours: 1 }}>{dateEnd}</Moment></p>
                                    </Col>
                                    <Col xs={6} sm={12}>
                                        <p><strong>Su mensaje:</strong> {message}</p>
                                        <p><strong>Tipo de terapia:</strong> {meetType}</p>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </div>
                </div>
            }
        </>
    )
}

export default AppointmentCard