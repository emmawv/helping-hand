import { Component, React } from 'react'
import { Navbar, Nav, NavDropdown } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import './Navbar.css'
import AuthService from '../../../service/auth.service'

export default class Navigation extends Component {

    constructor() {
        super()
        this.state = {
            background: 'transparent',
            variant: 'light',
            collapse: false
        }
        this.authService = new AuthService()
    }

    listenScrollEvent = e => {
        window.scrollY >= 50 ? this.setState({ background: '#6289D9', variant: 'dark' }) : this.setState({ background: 'transparent', variant: 'light' })
    }

    componentDidMount() {
        window.addEventListener('scroll', this.listenScrollEvent);
    }

    setCollapseColour = () => {
        this.state.collapse ? this.setState({ background: 'transparent', variant: 'light' }) : this.setState({ background: '#6289D9', variant: 'dark' })
    }

    toggleCollapse = () => {
        this.setCollapseColour()
        this.state.collapse ? this.setState({ collapse: false }) : this.setState({ collapse: true })

    }

    logOut = () => {
        this.authService
            .logout()
            .then(res => this.props.storeUser(undefined))
            .catch(err => new Error(err))
    }

    render() {
        return (
            <div id='navbar'>
                <Navbar variant={this.state.variant} style={{ background: `${this.state.background}` }} fixed='top' expand='md'>
                    <Navbar.Brand href='/'>Inicio</Navbar.Brand>
                    <Navbar.Toggle aria-controls='basic-navbar-nav' onClick={this.toggleCollapse} />
                    <Navbar.Collapse id='basic-navbar-nav' >
                        <Nav className='ml-auto'>
                            <Link to='/psychologists'>
                                <Nav.Link as='div'>Ver psicologos</Nav.Link>
                            </Link>
                            {
                                this.props.loggedInUser
                                    ?
                                    <>
                                        <Link to='/'>
                                            <Nav.Link as='div' onClick={this.logOut}>Cerrar sesión</Nav.Link>
                                        </Link>
                                        <NavDropdown title={`Hola, ${this.props.loggedInUser.name}`} id="basic-nav-dropdown">
                                            <Link to='/profile/appointments'>
                                                <NavDropdown.Item as='div'>Mis citas</NavDropdown.Item>
                                            </Link>
                                            <Link to='/profile/info'>
                                                <NavDropdown.Item as='div'>Mi perfil</NavDropdown.Item>
                                            </Link>
                                            
                                        </NavDropdown>
                                    </>
                                    :
                                    <>
                                        <Link to='/signup'>
                                            <Nav.Link as='div'>Registro</Nav.Link>
                                        </Link>
                                        <Link to='/login'>
                                            <Nav.Link as='div'>Inicio sesión</Nav.Link>
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


