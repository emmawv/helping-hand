import React, { Component } from 'react'
import { Container } from 'react-bootstrap'

import PsychService from './../../../service/psychologists.service'
import PsychCard from './PsychCard'

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
            .then(res => this.setState({ psych: res.data }))
            .catch(err => console.log(err))
    }

    handleModal = visible => this.setState({ showModal: visible })

    render() {
        console.log(this.state.psych)
        return (
            <Container>
                <h1>Listado de psicologos</h1>
                    {
                    this.state.psych.length ? this.state.psych.map(elm => {
                        return (
                            <>
                            <PsychCard psych={elm} />
                                <hr />
                            </>
                        )
                    }) : <p>Please wait...loading</p>
                }
            </Container>
        )
    }
}

export default PsychList