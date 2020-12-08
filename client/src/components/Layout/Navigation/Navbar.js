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
                <Navbar bg={this.state.background} variant="light" fixed="top">
                    <Navbar.Brand href="/">Navbar</Navbar.Brand>
                    <Nav className="ml-auto">
                        <Link to="/psychologists">
                            <Nav.Link as='div'>See all psychologists</Nav.Link>
                        </Link>
                        <Nav.Link className='btn btn-outline-white' href="#pricing">Sign In</Nav.Link>
                        <Nav.Link className='btn btn-white' href="#pricing">Sign Up</Nav.Link>
                    </Nav>
                </Navbar>
            </div>
        )
    }
}


