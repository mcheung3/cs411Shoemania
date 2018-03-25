import React from 'react'
import {render} from 'react-dom'
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import { Redirect } from 'react-router'
import { Container, Divider, Grid, Image } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'


import App from './Components/App/App.jsx'
import Login from './Components/Login/Login.jsx'
import Register from './Components/Register/Register.jsx'



require('./styles/main.scss')

render(
        <Router> 
        	<div>
        		<Route exact path="/" render={(props) => ( false ? (<App/>) : (<Redirect to="/login"/>))}/>
        		<Route path="/login" component={Login} />
        		<Route path="/register" component={Register} />
        	</div>
        </Router>
        , document.getElementById('app')
);
