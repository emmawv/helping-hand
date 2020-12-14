import { Component, React } from 'react'
import { Navbar, Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import './Navbar.css'

export default class Navigation extends Component {

    constructor() {
        super()
        this.state = {
            background: 'transparent',
            variant: 'light',
            collapse: false
        }
    }

    listenScrollEvent = e => {
        window.scrollY >= 50 ? this.setState({ background: '#6289D9', variant: 'dark' }) : this.setState({ background: 'transparent', variant: 'light' })
    }

    componentDidMount() {
        window.addEventListener('scroll', this.listenScrollEvent);
    }

    setCollapseColour = () => {
        this.state.collapse ? this.setState({ background: 'transparent', variant: 'light' }) :  this.setState({ background: '#6289D9', variant: 'dark' })
    }

    toggleCollapse = () => {
        this.setCollapseColour()
        this.state.collapse ? this.setState({ collapse: false }) : this.setState({ collapse: true })
        
    }

    logOut = () => {
        this.authService
            .logout()
            .then(res => {
                this.props.history.push('/')
                this.props.storeUser(undefined)
            })
            .catch(err => console.log(err))
    }

    render() {
        return (
            <div id='navbar'>
                <Navbar variant={this.state.variant} style={{ background: `${this.state.background}` }} fixed='top' expand='md'>
                    <Navbar.Brand href='/'>Navbar</Navbar.Brand>
                    <Navbar.Toggle aria-controls='basic-navbar-nav' onClick={ this.toggleCollapse}/>
                    <Navbar.Collapse id='basic-navbar-nav' >
                        <Nav className='ml-auto'>
                            <Link to='/psychologists'>
                                <Nav.Link as='div'>See all psychologists</Nav.Link>
                            </Link>
                            {
                                this.props.loggedInUser
                                    ?
                                    <>
                                        <Nav.Link as='div' onClick={this.logOut}>Cerrar sesión</Nav.Link>
                                        <Link to='/profile'>
                                            <Nav.Link as='div'>Hola, {this.props.loggedInUser.name}</Nav.Link>
                                        </Link>
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


