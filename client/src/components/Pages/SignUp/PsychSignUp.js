import React, { Component } from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'

import AuthService from '../../../service/auth.service'
import ProblemService from '../../../service/problems.service'
import './SignUp.css'
import Alert from '../../Shared/Alert/Alert'

class PsychSignup extends Component {

    constructor() {
        super()
        this.state = {
            formInfo: {
                email: '',
                password: '',
                name: '',
                surname: '',
                problems: [],
                meetType: [],
                agesTreated: [],
                telephone: undefined,
                practiceName: '',
                latitude: undefined,
                longitude: undefined,
                time: undefined,
                timetable: [],
                profileImg: '',
                shortBio: '',
                price: ''
            },
            allProblems: [],
            showToast: false,
            alertText: ''

        }
        this.authService = new AuthService()
        this.problemService = new ProblemService()
    }

    componentDidMount = () => {
        this.problemService
            .getProblems()
            .then(res => this.setState({ allProblems: res.data }))
            .catch(err => new Error(err))
    }

    handleInputChange = e => this.setState({ formInfo: { ...this.state.formInfo, [e.target.name]: e.target.value } })

    handleRadioInputChange = e => e.target.value === 'ambas' ? this.setState({ meetType: ['remota', 'presencial'] }) : this.setState({ formInfo: { ...this.state.formInfo, [e.target.name]: e.target.value } })

    handleTimeSubmit = e => {
        e.preventDefault()
        this.state.timetable.push(this.state.formInfo.time)
        this.setState({ formInfo: { ...this.state.formInfo, time: undefined } })
        document.querySelector('#timetable').value = ''
    }

    handleSubmit = e => {

        e.preventDefault()

        this.authService
            .psychSignup(this.state.formInfo)
            .then(theLoggedInUser => {
                this.props.storeUser(theLoggedInUser.data)
                this.props.history.push('/psychologists')
            })
            .catch(err => this.setState({ showToast: true, alertText: err.response.data.message }))
    }

    handleToast = (visible, text) => this.setState({ showToast: visible, alertText: text })


    //Multiple select options, dynamic inputs (AGESTREATED)
    createUIAges() {
        return this.state.formInfo.agesTreated.map((elm, idx) =>
            <div key={idx} className='add-ages' style={{ marginTop: '10px' }}>

                <Form.Control as="select" name='agesTreated' value={elm || ''} onChange={this.handleChangeAges.bind(this, idx)} >
                    <option selected>Select one...</option>
                    <option>Niños pequeños/preescolares(0 a 6)</option>
                    <option>Preadolescentes(11 a 13)</option>
                    <option>Niños(6 a 10)</option>
                    <option>Adolescentes(14 a 19)</option>
                    <option>Adultos</option>
                    <option>Adultos mayores (65+)</option>
                </Form.Control>

                <Button type='button' size='sm' variant='outline-danger' onClick={this.removeClickAges.bind(this, idx)}> Eliminar </Button>
            </div>
        )
    }

    handleChangeAges(i, e) {
        let agesTreated = [...this.state.formInfo.agesTreated];
        agesTreated[i] = e.target.value
        this.setState({ formInfo: { ...this.state.formInfo, agesTreated } });
    }

    addClickAges() {
        this.setState(prevState => ({ formInfo: { ...this.state.formInfo, agesTreated: [...prevState.agesTreated, ''] } }))
    }

    removeClickAges(i) {
        let agesTreated = [...this.state.formInfo.agesTreated];
        agesTreated.splice(i, 1);
        this.setState({ formInfo: { ...this.state.formInfo, agesTreated } });
    }


    //Multiple select options, dynamic inputs (PROBLEMSTREATED)
    createUIProblems() {

        return this.state.formInfo.problems.map((elm, idx) =>
            <div key={idx} className='add-ages' style={{ marginTop: '10px' }}>

                <Form.Control as="select" name='problems' value={elm || ''} onChange={this.handleChangeProblems.bind(this, idx)} >
                    <option selected>Select one...</option>
                    {this.state.allProblems.map(elm => <option value={elm._id}>{elm.name}</option>)}
                </Form.Control>

                <Button type='button' size='sm' variant='outline-danger' onClick={this.removeClickProblems.bind(this, idx)}> Eliminar </Button>
            </div>
        )
    }

    handleChangeProblems(i, e) {
        let problems = [...this.state.formInfo.problems];
        problems[i] = e.target.value
        this.setState({ formInfo: { ...this.state.formInfo, problems } });
    }

    addClickProblems() {
        this.setState(prevState => ({ formInfo: { ...this.state.formInfo, problems: [...prevState.problems, ''] } }))
    }

    removeClickProblems(i) {
        let problems = [...this.state.formInfo.problems];
        problems.splice(i, 1);
        this.setState({ formInfo: { ...this.state.formInfo, problems } });
    }


    render() {

        return (
            <>
                <Container className='signup-form'>

                    <h1 className='psych-title'>Registro de psicólogo</h1>
                    <hr />

                    <Form onSubmit={this.handleSubmit}>
                        <Row>
                            <Col xs={12} sm={6}>
                                <Row>
                                    <Col xs={6}>
                                        <Form.Group controlId='name'>
                                            <Form.Label>Nombre</Form.Label>
                                            <Form.Control type='text' name='name' value={this.state.formInfo.name} onChange={this.handleInputChange} required />
                                        </Form.Group>
                                    </Col>
                                    <Col xs={6}>
                                        <Form.Group controlId='surname'>
                                            <Form.Label>Apellido</Form.Label>
                                            <Form.Control type='text' name='surname' value={this.state.formInfo.surname} onChange={this.handleInputChange} required />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Form.Group controlId='email'>
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type='text' name='email' value={this.state.formInfo.email} onChange={this.handleInputChange} required />
                                </Form.Group>
                                <Form.Group controlId='telephone'>
                                    <Form.Label>Teléfono</Form.Label>
                                    <Form.Control type='text' name='telephone' value={this.state.formInfo.telephone} onChange={this.handleInputChange} required />
                                    <small>Escribe tu número de teléfono sin prefijo.</small>
                                </Form.Group>
                                <Form.Group controlId='password'>
                                    <Form.Label>Contraseña</Form.Label>
                                    <Form.Control type='password' name='password' value={this.state.formInfo.password} onChange={this.handleInputChange} required />
                                    <small>La contraseña deber tener una longitud mínima de 6 e incluir al menos una mayúscula, un número y un carácter especial.</small>
                                </Form.Group>
                                <Form.Group controlId='profileImg'>
                                    <Form.Label>Imagen de perfil</Form.Label>
                                    <Form.Control type='text' name='profileImg' value={this.state.formInfo.profileImg} onChange={this.handleInputChange} placeholder='Direccion URL de la imagen' required />
                                </Form.Group>
                                <Form.Group controlId='shortBio'>
                                    <Form.Label>Cuéntanos un poco sobre ti</Form.Label>
                                    <Form.Control as='textarea' name='shortBio' value={this.state.formInfo.shortBio} onChange={this.handleInputChange} />
                                </Form.Group>
                            </Col>
                            <Col xs={12} sm={6}>
                                <Form.Group>
                                    <Form.Label>Forma de terapia</Form.Label><br />
                                    <Form.Check value="presencial" label="Presencial" type='radio' id='presencial' name='meetType' onChange={this.handleRadioInputChange} inline />
                                    <Form.Check value="remota" label="Remota" type='radio' id='remota' name='meetType' onChange={this.handleRadioInputChange} inline />
                                    <Form.Check value="ambas" label="Ambas" type='radio' id='ambas' name='meetType' onChange={this.handleRadioInputChange} inline />
                                </Form.Group>

                                {this.state.formInfo.meetType.includes('presencial')
                                    ?
                                    <Form.Group controlId='practiceInfo'>
                                        <Form.Label>Información sobre tu consulta</Form.Label><br />
                                        <Form.Label>Nombre</Form.Label>
                                        <Form.Control value={this.state.practiceName} type='text' name='practiceName' onChange={this.handleInputChange} />
                                        <Form.Label style={{ marginTop: '15px' }}>Ubicacion</Form.Label>
                                        <Row>
                                            <Col xs={6}>
                                                <Form.Label>Latitud</Form.Label>
                                                <Form.Control value={this.state.formInfo.latitude} type='text' name='latitude' onChange={this.handleInputChange} />
                                            </Col>
                                            <Col xs={6}>
                                                <Form.Label style={{ fontSize: '0.9em' }}>Longitud</Form.Label>
                                                <Form.Control value={this.state.formInfo.longitude} type='text' name='longitude' onChange={this.handleInputChange} />
                                            </Col>
                                        </Row>
                                    </Form.Group>
                                    : null}
                                <Form.Group controlId='price'>
                                    <Form.Label>Tarifa/hora:</Form.Label>
                                    <Form.Control type='number' name='price' value={this.state.formInfo.price} onChange={this.handleInputChange} min={0} step={5} required />
                                </Form.Group>
                                <Form.Group controlId='timetable'>
                                    <Form.Label>Horario</Form.Label><br />
                                    {this.state.timetable ? this.state.formInfo.timetable.map(elm => `${elm} | `) : null}
                                    <Row>
                                        <Col xs={9}>
                                            <Form.Control type='text' name='time' id='timetable' value={this.state.formInfo.time} onChange={this.handleInputChange} placeholder='Formato HH:mm (p. ej.: 20:30)' />
                                        </Col>
                                        <Col xs={3}>
                                            <Button type='button' variant='outline-info' onClick={this.handleTimeSubmit} >Añadir</Button>
                                        </Col>
                                    </Row>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Edades tratadas</Form.Label><br />
                                    <small>Añade al menos un rango de edad.</small><br />
                                    {this.createUIAges()}
                                    <Button style={{ marginTop: '10px' }} type='button' onClick={this.addClickAges.bind(this)} variant='outline-info'>Añadir</Button>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Problemas y trastornos tratados</Form.Label><br />
                                    <small>Añade al menos un trastorno o problema.</small><br />
                                    {this.createUIProblems()}
                                    <Button style={{ marginTop: '10px' }} type='button' onClick={this.addClickProblems.bind(this)} variant='outline-info'>Añadir</Button>
                                </Form.Group>

                            </Col>
                        </Row>
                        <Button className='login-submit' type='submit'>Registrarme</Button>
                    </Form>
                </Container>
                <Alert show={this.state.showToast} handleToast={this.handleToast} toastText={this.state.toastText} />
            </>
        )
    }
}

export default PsychSignup