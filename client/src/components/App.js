import {Switch, Route} from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

import HomePage from './Pages/HomePage/HomePage'
import Navigation from './Layout/Navigation/Navbar'

function App() {
  return (
    <>
      <Navigation />
      <Switch>
        <Route path="/" render={() => <HomePage />}/>
      </Switch>
    </>
  )
}

export default App
