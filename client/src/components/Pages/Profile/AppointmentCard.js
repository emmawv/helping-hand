import { Col, Row } from 'react-bootstrap'
import Moment from 'react-moment'
import 'moment/locale/es'

import './Profile.css'

const AppointmentCard = ({ userId, psychId, dateStart, dateEnd, message, meetType, loggedUser }) => {

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
                                {meetType === 'presencial' ? <p><strong>Direccion:</strong> </p> : null}
                            </Col>
                        </Row>
                    </Col>
                </Row>
                :
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
            }
        </>
    )
}

export default AppointmentCard