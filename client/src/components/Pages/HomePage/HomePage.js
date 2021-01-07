import { Link } from 'react-router-dom'
import { Col, Row } from 'react-bootstrap'

import './HomePage.css'
import handshake from './handshake.png'
import schedule from './deadline.png'
import search from './loupe.png'

const HomePage = () => {
    return (
        <>
            <section className='hero'>
                <video playsInline autoPlay muted loop className='videoTag' poster='https://res.cloudinary.com/djqsmqs26/image/upload/v1608267152/helping-hand/Screenshot_2020-12-09_at_20.37.53_klmbhz.png'>
                    <source src='https://res.cloudinary.com/djqsmqs26/video/upload/v1607365473/helping-hand/Pexels_Videos_1723017_1_rtp1hb.mp4' type='video/mp4' />
                </video>
                <div>
                    <h1>Bienvenido a Helping Hand</h1>
                    <p>A veces la vida se complica, pero pedir ayuda puede ser fácil. Queremos ayudarte a encontrar la persona que pueda acompañarte.</p>
                    <Link to='/psychologists' className='button'>Busca un profesional</Link>
                </div>
            </section>
            <Row className='info'>
                    <Col xs={12} md={4}>
                        <img src={search} alt='magnifying glass icon' className='icon' />
                        <h3>Busca un profesional</h3>
                        <p>Busca el profesional que mas se adapte a tus necesidades. </p>
                    </Col>
                    <Col xs={12} md={4}>
                        <img src={schedule} alt='schedule icon' className='icon' />
                        <h3>Contacta</h3>
                    <p>Ponte en contacto en el profesional que elijas o pide cita a traves de la página.</p>
                    </Col>
                    <Col xs={12} md={4}>
                        <img src={handshake} alt='handshake icon' className='icon' />
                        <h3>Empieza el proceso</h3>
                        <p>Comienza a recibir la ayuda que mereces.</p>
                    </Col>
            </Row>
        </>
    )
}


export default HomePage