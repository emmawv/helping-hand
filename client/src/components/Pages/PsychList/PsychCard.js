import { Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import './PsychCard.css'

const PsychCard = ({ psych }) => {
    console.log(psych.problems)
    return (
        <Row className='psych-card'>
            <Col sm={10} md={4}>
                <img src={psych.profileImg} alt="Profile" />
            </Col>
            <Col sm={10} md={6}>
                <h3>{psych.name}</h3>
                <p>
                    {
                        psych.description ? psych.description : null
                    }
                </p>
                <p>
                    Trastornos y problemas tratados:
                    <ul>
                        {psych.problems.map((elm, idx) => <li key={idx}>{elm}</li>)}
                    </ul>
                </p>
                </Col>
        </Row>

    )
}

export default PsychCard