import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import './App.scss'
import Signup from './components/Signup/Signup'
import Login from './components/Login/Login'
import Dashboard from './components/Dashboard/Dashboard'

const App = () => {
    return (
        <Router>
            <Switch>
                <Route exact path='/' component={Dashboard} />
                <Route exact path='/login' component={Login} />
                <Route exact path='/signup' component={Signup} />
            </Switch>
        </Router>
    )
}

export default App