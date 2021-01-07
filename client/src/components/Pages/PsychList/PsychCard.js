import { Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import './PsychCard.css'

const PsychCard = ({ profileImg, _id, meetType, name, surname, shortBio, problems, agesTreated }) => {
    return (
        <Row className='psych-card'>
            
            <Col xs={12} md={3} lg={2}>
                <img src={profileImg} alt='Profile' />
                
                <Link to={`/psychologists/${_id}`} className='infobtn'>Ver más</Link>

                {!meetType.includes('presencial')
                    ?
                    <p className='alert'><small>Este psicólogo solo realiza consultas online.</small></p>
                    : null
                }
                
            </Col>

            <Col xs={12} md={9} lg={10}>
                <div className='psychcard-info'>
                    
                    <h3>{name} {surname}</h3>
                    <hr />

                    {shortBio ? <p>{shortBio}</p> : null}

                    <Row>
                        <Col xs={6}>
                            <strong>Trastornos y problemas tratados:</strong>
                            <ul>
                                {problems.map((elm, idx) => <li key={idx}>{elm.name}</li>)}
                            </ul>
                            
                        </Col>
                        <Col xs={6}>
                            <strong>Edades tratadas:</strong>
                            <ul>
                                {agesTreated.map((elm, idx) => <li key={idx}>{elm}</li>)}
                            </ul>
                        </Col>
                    </Row>
                </div>
            </Col>
        </Row>

    )
}

export default PsychCard