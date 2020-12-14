import React, { Component } from 'react'
import { Container, Row, Col, Accordion, Card, Button, Toast } from 'react-bootstrap'

import PsychService from './../../../service/psychologists.service'
import PsychCard from './PsychCard'
import MapContainer from './PsychListMap'
import './PsychList.css'

class PsychList extends Component {

    constructor() {
        super()
        this.state = {
            psych: [],
            showModal: false
        }
        this.psychService = new PsychService()
    }

    componentDidMount = () => this.refreshPsych()

    refreshPsych = () => {
        this.psychService
            .getAllPsych()
            .then(res => {
                this.setState({ psych: res.data })
            })
            .catch((err) => new Error(err))
    }

    handleModal = visible => this.setState({ showModal: visible })

    render() {
        return (
            <>
                <Container className='psych-page'>
                    <Row>
                        <Col xs={12}>
                            <h1 className='title'>Listado de psicologos</h1>
                            <hr />
                        <Accordion>
                            <Card>
                                <Card.Header>
                                    <Accordion.Toggle as={Button} variant="link" eventKey="0">
                                        Mostrar el mapa
                                </Accordion.Toggle>
                                </Card.Header>
                                <Accordion.Collapse eventKey="0">
                                    <Card.Body style={{height: '350px'}}>
                                            <MapContainer className='list-map' psych={this.state.psych}/>
                                    </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                            </Accordion>
                        </Col>
                        <Col xs={12}>
                            <Row>
                                {
                                    this.state.psych.length ? this.state.psych.map(elm => {
                                        return (

                                            <>
                                                <Col xs={12}>
                                                    <PsychCard key={elm._id} psych={elm}/>
                                                </Col>
                                                <hr />
                                            </>
                                        )
                                    }) : <p>Please wait...loading</p>
                                }
                            </Row>
                        </Col>
                    </Row>
                </Container>

                {/* <Toast
                    style={{
                        position: 'fixed',
                        top: '8%',
                        left: '35%',
                    }}
                    show={true} delay={3000} autohide>
                    <Toast.Header>
                        <strong>Log In was succesful!</strong>
                    </Toast.Header>
                </Toast> */}
            </>
        )
    }
}

export default PsychList