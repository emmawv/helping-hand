import React, { Component } from 'react'

export default class Profile extends Component {
    constructor() {
        super()
        this.state = {
            user: undefined
        }
    }

    componentDidMount = () => this.setState({ user: this.props.loggedUser })

    render() {
        return (
            <>
                {
                    !this.state.user
                        ?
                        <h2>Gracias por tu paciencia, estamos cargando la informacion de tu perfil</h2>
                        :
                        <h1>Bienvenid@, {this.state.user.name}</h1>


                }
            </>

        )
    }
}