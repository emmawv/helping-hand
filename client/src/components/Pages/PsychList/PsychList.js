import React, { Component } from 'react'
import { Container, Row, Col } from 'react-bootstrap'

import PsychService from './../../../service/psychologists.service'
import PsychCard from './PsychCard'

import MapContainer from './PsychListMap'

class PsychList extends Component {

    constructor() {
        super()
        this.state = {
            psych: undefined,
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
            .catch(err => console.log(err))
    }

    handleModal = visible => this.setState({ showModal: visible })

    render() {
        return (
            <>
                {/* <div>
                    <MapContainer />
                </div> */}
            <Container>
                <h1 className='title'>Listado de psicologos</h1>
                <hr />
                <Row>
                    {
                    this.state.psych ? this.state.psych.map(elm => {
                        return (
                            
                                <>
                                <Col xs={12}>
                                    <PsychCard key={ elm._id} psych={elm} />
                                </Col>
                                <hr />
                                </>
                        )
                    }) : <p>Please wait...loading</p>
                    }
                </Row>
                </Container>
            </>
        )
    }
}

export default PsychList