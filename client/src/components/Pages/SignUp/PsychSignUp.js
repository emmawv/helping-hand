import React, { Component } from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'

import AuthService from '../../../service/auth.service'
import ProblemService from '../../../service/problems.service'
import './SignUp.css'

class PsychSignup extends Component {

    constructor() {
        super()
        this.state = {
            email: '',
            password: '',
            name: '',
            surname: '',
            allProblems: [],
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

        }
        this.authService = new AuthService()
        this.problemService = new ProblemService()
    }

    componentDidMount = () => {
        this.problemService
            .getProblems()
            .then(res => this.setState({ allProblems: res.data }))
            .catch(err => console.log(err))
    }

    handleInputChange = e => this.setState({ [e.target.name]: e.target.value })

    handleRadioInputChange = e => e.target.value === 'ambas' ? this.setState({ meetType: ['remota', 'presencial'] }) : this.setState({ [e.target.name]: e.target.value })

    handleTimeSubmit = e => {
        e.preventDefault()

        this.state.timetable.push(this.state.time)
        this.setState({ time: undefined })
        document.querySelector('#timetable').value = ''
    }

    handleSubmit = e => {

        e.preventDefault()

        this.authService
            .psychSignup(this.state)
            .then(theLoggedInUser => {
                this.props.storeUser(theLoggedInUser.data)
                this.props.history.push('/psychologists')
            })
            .catch(err => new Error(err))
    }


    //Multiple select options, dynamic inputs (AGESTREATED)
    createUIAges() {
        return this.state.agesTreated.map((elm, idx) =>
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
        let agesTreated = [...this.state.agesTreated];
        agesTreated[i] = e.target.value
        this.setState({ agesTreated });
    }

    addClickAges() {
        this.setState(prevState => ({ agesTreated: [...prevState.agesTreated, ''] }))
    }

    removeClickAges(i) {
        let agesTreated = [...this.state.agesTreated];
        agesTreated.splice(i, 1);
        this.setState({ agesTreated });
    }


    //Multiple select options, dynamic inputs (PROBLEMSTREATED)
    createUIProblems() {

        return this.state.problems.map((elm, idx) =>
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
        let problems = [...this.state.problems];
        problems[i] = e.target.value
        this.setState({ problems });
    }

    addClickProblems() {
        this.setState(prevState => ({ problems: [...prevState.problems, ''] }))
    }

    removeClickProblems(i) {
        let problems = [...this.state.problems];
        problems.splice(i, 1);
        this.setState({ problems });
    }



    render() {

        console.log(this.state)


        return (
            <Container className='signup-form'>

                <h1 className='psych-title'>Registro de psicologo</h1>
                <hr />

                <Form onSubmit={this.handleSubmit}>
                    <Row>
                        <Col xs={12} sm={6}>
                            <Row>
                                <Col xs={6}>
                                    <Form.Group controlId='name'>
                                        <Form.Label>Nombre</Form.Label>
                                        <Form.Control type='text' name='name' value={this.state.name} onChange={this.handleInputChange} />
                                    </Form.Group>
                                </Col>
                                <Col xs={6}>
                                    <Form.Group controlId='surname'>
                                        <Form.Label>Apellido</Form.Label>
                                        <Form.Control type='text' name='surname' value={this.state.surname} onChange={this.handleInputChange} />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Form.Group controlId='email'>
                                <Form.Label>Email</Form.Label>
                                <Form.Control type='text' name='email' value={this.state.email} onChange={this.handleInputChange} />
                            </Form.Group>
                            <Form.Group controlId='telephone'>
                                <Form.Label>Telephone</Form.Label>
                                <Form.Control type='text' name='telephone' value={this.state.telephone} onChange={this.handleInputChange} />
                            </Form.Group>
                            <Form.Group controlId='password'>
                                <Form.Label>Contraseña</Form.Label>
                                <Form.Control type='password' name='password' value={this.state.password} onChange={this.handleInputChange} />
                                <small>La contraseña debe incluir al menos una mayuscula, un numero y un caracter especial</small>
                            </Form.Group>
                            <Form.Group controlId='profileImg'>
                                <Form.Label>Imagen de perfil</Form.Label>
                                <Form.Control type='text' name='profileImg' value={this.state.profileImg} onChange={this.handleInputChange} placeholder='Direccion URL de la imagen' />
                            </Form.Group>
                            <Form.Group controlId='shortBio'>
                                <Form.Label>Cuentanos un poco sobre ti</Form.Label>
                                <Form.Control as='textarea' name='shortBio' value={this.state.shortBio} onChange={this.handleInputChange} />
                            </Form.Group>
                        </Col>
                        <Col xs={12} sm={6}>
                            <Form.Group>
                                <Form.Label>Forma de terapia</Form.Label><br />
                                <Form.Check value="presencial" label="Presencial" type='radio' id='presencial' name='meetType' onChange={this.handleRadioInputChange} inline />
                                <Form.Check value="remota" label="Remota" type='radio' id='remota' name='meetType' onChange={this.handleRadioInputChange} inline />
                                <Form.Check value="ambas" label="Ambas" type='radio' id='ambas' name='meetType' onChange={this.handleRadioInputChange} inline />
                            </Form.Group>

                            {this.state.meetType.includes('presencial')
                                ?
                                <Form.Group controlId='practiceInfo'>
                                    <Form.Label>Informacion sobre tu consulta</Form.Label><br />
                                    <Form.Label>Nombre</Form.Label>
                                    <Form.Control value={this.state.practiceName} type='text' name='practiceName' onChange={this.handleInputChange} />
                                    <Form.Label style={{ marginTop: '15px' }}>Ubicacion</Form.Label>
                                    <Row>
                                        <Col xs={6}>
                                            <Form.Label>Latitud</Form.Label>
                                            <Form.Control value={this.state.latitude} type='text' name='latitude' onChange={this.handleInputChange} />
                                        </Col>
                                        <Col xs={6}>
                                            <Form.Label style={{ fontSize: '0.9em' }}>Longitud</Form.Label>
                                            <Form.Control value={this.state.longitude} type='text' name='longitude' onChange={this.handleInputChange} />
                                        </Col>
                                    </Row>
                                </Form.Group>
                                : null}
                            <Form.Group controlId='price'>
                                <Form.Label>Tarifa/hora:</Form.Label>
                                <Form.Control type='number' name='price' value={this.state.price} onChange={this.handleInputChange} min={0} step={5}/>
                            </Form.Group>
                            <Form.Group controlId='timetable'>
                                <Form.Label>Horario</Form.Label><br />
                                {this.state.timetable ? this.state.timetable.map(elm => `${elm} | `) : null}
                                <Row>
                                    <Col xs={9}>
                                        <Form.Control type='text' name='time' id='timetable' value={this.state.time} onChange={this.handleInputChange} placeholder='Formato HH:mm (p. ej.: 20:30)'/>
                                    </Col>
                                    <Col xs={3}>
                                        <Button type='button' variant='outline-info' onClick={this.handleTimeSubmit} >Añadir</Button>
                                    </Col>
                                </Row>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Edades tratadas</Form.Label><br />
                                <small>Elige al menos un rango de edad</small><br />
                                {this.createUIAges()}
                                <Button style={{ marginTop: '10px' }} type='button' onClick={this.addClickAges.bind(this)} variant='outline-info'>Añadir</Button>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Problemas y trastornos tratados</Form.Label><br />
                                {this.createUIProblems()}
                                <Button style={{ marginTop: '10px' }} type='button' onClick={this.addClickProblems.bind(this)} variant='outline-info'>Añadir</Button>
                            </Form.Group>

                        </Col>
                    </Row>
                    <Button className='login-submit' type='submit'>Registrarme</Button>
                </Form>
            </Container>
        )
    }
}

export default PsychSignup