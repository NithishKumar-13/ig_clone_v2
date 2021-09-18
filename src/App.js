import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import './App.scss'
import Signup from './components/Signup/Signup'
import Login from './components/Login/Login'
import Dashboard from './components/Dashboard/Dashboard'
import Profile from './components/Profile/Profile'
import ViewPost from './components/ViewPost/ViewPost'

const App = () => {
    return (
        <Router>
            <Switch>
                <Route exact path='/' component={Dashboard} />
                <Route exact path='/login' component={Login} />
                <Route exact path='/signup' component={Signup} />
                <Route exact path='/profile/:username' component={Profile} />
                <Route exact path='/p/:postId' component={ViewPost} />
            </Switch>
        </Router>
    )
}

export default App