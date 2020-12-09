import { Component, React } from 'react'
import { Navbar, Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import './Navbar.css'

export default class Navigation extends Component {

    constructor() {
        super()
        this.state = {
            background: "transparent"
        }
    }

    listenScrollEvent = e => {
        window.scrollY >= 50 ? this.setState({ background: "white" }) : this.setState({ background: "transparent" })
    }

    componentDidMount() {
        window.addEventListener("scroll", this.listenScrollEvent);
    }

    render() {
        return (
            <div id='navbar'>
                <Navbar bg={this.state.background} variant="light" fixed="top" expand="md">
                    <Navbar.Brand href="/">Navbar</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ml-auto">
                            <Link to="/psychologists">
                                <Nav.Link as='div'>See all psychologists</Nav.Link>
                            </Link>
                            {
                                this.props.loggedUser
                                    ?
                                    <>
                                        <Nav.Link as="div" onClick={this.logOut}>Cerrar sesión</Nav.Link>
                                        <Link to='/profile'>
                                            <Nav.Link as='div'>Hola, {this.props.loggedUser.name}</Nav.Link>
                                        </Link>
                                    </>
                                    :
                                    <>
                                        <Link to="/sign-up">
                                            <Nav.Link as="div">Registro</Nav.Link>
                                        </Link>
                                        <Link to="/log-in">
                                            <Nav.Link as="div">Inicio sesión</Nav.Link>
                                        </Link>
                                    </>

                            }
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        )
    }
}


