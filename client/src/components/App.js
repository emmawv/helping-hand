import { Switch, Route, Redirect } from 'react-router-dom'
import React, { Component } from 'react'

import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

import HomePage from './Pages/HomePage/HomePage'
import PsychList from './Pages/PsychList/PsychList'
import PsychDetails from './Pages/PsychDetails/PsychDetails'
import Navigation from './Layout/Navigation/Navbar'
import Login from './Pages/Login/Login'
import SignUp from './Pages/SignUp/SignUp'
import AuthServices from '../service/auth.service'
import PsychSignUp from './Pages/SignUp/PsychSignUp'
import AppointmentPage from './Pages/Profile/AppointmentPage'
import InfoPage from './Pages/Profile/InfoPage'
import Footer from './Layout/Footer/Footer'



export default class App extends Component {

  constructor() {
    super()
    this.state = {
      loggedInUser: undefined
    }

    this.authServices = new AuthServices()
  }

  componentDidMount = () => {

    this.authServices
      .isLoggedIn()
      .then(response => this.setTheUser(response.data))
      .catch(err => this.setTheUser(undefined))
  }


  setTheUser = user => this.setState({ loggedInUser: user })

  setNavBar = () => this.setState({ notIsMain: true })


  render() {
    return (
      <>
        <Navigation storeUser={this.setTheUser} loggedInUser={this.state.loggedInUser} />

        <main>
        <Switch>
          
          <Route path='/' exact render={() => <HomePage />} />

          <Route path='/psychologists' exact render={() => <PsychList loggedUser={this.state.loggedInUser} />} />

          <Route path='/psychologists/:psych_id' render={props => <PsychDetails {...props} loggedUser={this.state.loggedInUser} />} />

          <Route path='/signup' render={props => <SignUp storeUser={this.setTheUser} {...props} />} />

          <Route path='/psych-signup' render={props => <PsychSignUp storeUser={this.setTheUser} {...props} />} />

          <Route path='/login' render={props => <Login storeUser={this.setTheUser} {...props} />} />

          <Route path='/profile/appointments' render={props => this.state.loggedInUser ? <AppointmentPage loggedUser={this.state.loggedInUser} /> : <Redirect to="/login" />} />

          <Route path='/profile/info' render={props => this.state.loggedInUser ? <InfoPage loggedUser={this.state.loggedInUser} {...props} storeUser={this.setTheUser} /> : <Redirect to="/login" />} />
          
          </Switch>
        </main>
        <Footer />
      </>
    )
  }
}
