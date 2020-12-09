import { Link } from 'react-router-dom'
import { Col, Row} from 'react-bootstrap'

import './HomePage.css'

const HomePage = () => {
    return (
        <>
            <section className="hero">
            <video playsInline autoPlay muted loop className="videoTag">
            <source src="https://res.cloudinary.com/djqsmqs26/video/upload/v1607365473/helping-hand/Pexels_Videos_1723017_1_rtp1hb.mp4" type="video/mp4" />
            </video>
            <div>
                <h1>Bienvenido a helping-hand</h1>
                <p>A veces la vida se complica, pero pedir ayuda puede ser facil. Queremos ayudarte a encontrar la persona que pueda acompanarte.</p>
                <Link to='/psychologists' className="button">Start searching for a professional</Link>
            </div>
            </section>
            <Row className="info">
                <Col xs={12} md={4}>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>
                </Col>
                <Col xs={12} md={4}>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>
                </Col>
                <Col xs={12} md={4}>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>
                </Col>
            </Row>
        </>
    )
}

export default HomePage