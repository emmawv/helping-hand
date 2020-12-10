import { Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import './PsychCard.css'

const PsychCard = ({ psych }) => {
    console.log(psych)
    return (
        <Row className='psych-card'>
            
            <Col xs={12} md={3} lg={2}>
                <img src={psych.profileImg} alt='Profile' />
                
                <Link to={`/psychologists/${psych._id}`} className='infobtn'>See more info</Link>
            </Col>

            <Col xs={12} md={9} lg={10}>
                <div className='psychcard-info'>
                    
                    <h3>{psych.name} {psych.surname}</h3>
                    <hr />

                    {psych.description ? <p>psych.description</p> : null}

                    <Row>
                        <Col xs={6}>
                            <strong>Trastornos y problemas tratados:</strong>
                            <ul>
                                {psych.problems.map((elm, idx) => <li key={idx}>{elm.name}</li>)}
                            </ul>
                        </Col>
                        <Col xs={6}>
                            <strong>Edades tratadas:</strong>
                            <ul>
                                {psych.agesTreated.map((elm, idx) => <li key={idx}>{elm}</li>)}
                            </ul>
                        </Col>
                    </Row>
                </div>
            </Col>
        </Row>

    )
}

export default PsychCard