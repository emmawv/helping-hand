import { Switch, Route } from 'react-router-dom'
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

export default class App extends Component {
  
  constructor() {
    super()
    this.state = { loggedInUser: undefined }
    this.authServices = new AuthServices()
  }

  componentDidMount = () => {

    this.authServices
      .isLoggedIn()
      .then(response => this.setTheUser(response.data))
      .catch(err => this.setTheUser(undefined))
  }


  setTheUser = user => this.setState({ loggedInUser: user }, () => console.log('El nuevo estado de App es:', this.state))
  
  
  render() {
  return(
    <>
      <Navigation storeUser={this.setTheUser} loggedUser={this.state.loggedInUser} />
      <Switch>
        <Route path='/' exact render={() => <HomePage />} />
        <Route path='/psychologists' exact render={() => <PsychList loggedUser={this.state.loggedInUser}/>} />
        <Route path='/psychologists/:psych_id' render={props => <PsychDetails {...props} loggedUser={this.state.loggedInUser} />}/>
        <Route path='/sign-up' render={props => <SignUp storeUser={this.setTheUser} {...props} />} />
        <Route path='/log-in' render={props => <Login storeUser={this.setTheUser} {...props} />} />
        {/* <Route path='/perfil' render={() => this.state.loggedInUser ? <Profile loggedUser={this.state.loggedInUser} /> : <Redirect to='/inicio-sesion' />} /> */}
      </Switch>
    </>
  )
  }
}
