import React, { Component } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import PsychService from '../../../service/psychologists.service'
import './PsychDetails.css'


class PsychDetails extends Component {

    constructor() {
        super()
        this.state = {
            psych: undefined
        }
        this.psychService = new PsychService()
    }

    componentDidMount = () => {

        const psych_id = this.props.match.params.psych_id

        this.psychService
            .getOnePsych(psych_id)
            .then(res => this.setState({ psych: res.data }))
            .catch(err => console.log(err))
    }

    render() {

        return (
            <Container className="psych-details">
                {this.state.psych
                    ?
                    <>
                        <h1>{this.state.psych.name} {this.state.psych.surname}</h1>
                        < hr/>
                        <Row>
                            <Col md={4} >
                                <div className='details-img'>
                                    <img src={this.state.psych.profileImg} alt={this.state.psych.name} />
                                </div>
                            </Col>
                            <Col md={8}>
                                {this.state.psych.description
                                    ? 
                                    <>
                                        <h3>Sobre mi:</h3><p>{this.state.psych.description}</p>
                                    </>
                                    : null}
                                <h4>Problemas y trastornos tratados: </h4>
                                    {this.state.psych.problems.map(elm => {
                                        return (
                                            <>
                                            <strong>{elm.name}</strong>
                                                <hr />
                                                <ul>
                                                    {elm.subgroup.map(elm => <li>{elm}</li>)}
                                                </ul>
                                            </>
                                        )
                                    })
                                    }
                                <Link to="/psychologists" className="btn btn-sm btn-dark">Volver</Link>
                            </Col>
                        </Row>
                    </>
                    :
                    <p>please wait...loading</p>
                }

            </Container>
        )
    }
}

export default PsychDetails



    