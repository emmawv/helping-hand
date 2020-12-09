import { Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import './PsychCard.css'

const PsychCard = ({ psych }) => {
    console.log(psych.problems)
    return (
        <Row className='psych-card'>
            <Col xs={12} md={3}>
                <img src={psych.profileImg} alt="Profile" />
            </Col>
            <Col xs={12} md={9}>
                <div className='psychcard-info'>
                    <h3>{psych.name} {psych.surname}</h3>
                    <hr />
                <p>
                    {
                        psych.description ? psych.description : null
                    }
                </p>
                    Trastornos y problemas tratados:
                    <ul>
                        {psych.problems.map((elm, idx) => <li key={idx}>{elm}</li>)}
                    </ul>
                </div>
                </Col>
        </Row>

    )
}

export default PsychCard