import { Component, React } from 'react'
import { Navbar, Nav } from 'react-bootstrap'

import './Navbar.css'

export default class Navigation extends Component {

    constructor() {
        super()
        this.state = {
            background: "transparent",
            variant: "dark"
        }
    }

    listenScrollEvent = e => {
        window.scrollY >= 30 ? this.setState({ background: "white", variant: "light" }) : this.setState({ background: "transparent", variant: "dark" })
    }

    componentDidMount() {
        window.addEventListener("scroll", this.listenScrollEvent);
    }

    render() {
        console.log(window.scrollY)
        return (
            <div id='navbar'>
                <Navbar bg={this.state.background} variant={this.state.variant} fixed="top">
                    <Navbar.Brand href="/">Navbar</Navbar.Brand>
                    <Nav className="mr-auto">
                        <Nav.Link href="#home">Home</Nav.Link>
                        <Nav.Link href="#features">Features</Nav.Link>
                        <Nav.Link href="#pricing">Pricing</Nav.Link>
                    </Nav>
                </Navbar>
            </div>
        )
    }
}


