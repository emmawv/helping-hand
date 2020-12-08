import {Switch, Route} from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

import HomePage from './Pages/HomePage/HomePage'
import PsychList from './Pages/PsychList/PsychList'
import Navigation from './Layout/Navigation/Navbar'

function App() {
  return (
    <>
      <Navigation />
      <Switch>
        <Route path="/" exact render={() => <HomePage />} />
        <Route path="/psychologists" render={() => <PsychList />} />
      </Switch>
    </>
  )
}

export default App
