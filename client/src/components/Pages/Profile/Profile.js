import React, { Component } from 'react'

export default class Profile extends Component {
    constructor() {
        super()
        this.state = {
            user: this.loggedUser
        }
    }

    render() {
        console.log(this.state.user)
        return (<h1>Hiya {}</h1>)
    }
}