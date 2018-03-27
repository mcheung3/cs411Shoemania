import React from 'react'
import {render} from 'react-dom'
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import { Redirect } from 'react-router'
import { Container, Divider, Grid, Image } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'


import App from './Components/App/App.jsx'
import Login from './Components/Login/Login.jsx'
import Register from './Components/Register/Register.jsx'
import Browse from './Components/Browse/Browse.jsx'
import Profile from './Components/Profile/Profile.jsx'
import Shoemania from './Components/Shoemania/Shoemania.jsx'
import Popular from './Components/Popular/Popular.jsx'
import Location from './Components/Location/Location.jsx'
import Wishlist from './Components/Wishlist/Wishlist.jsx'


// Know Glitches to Fix:
// Shoemania has issues with rendering, this.renderData() must be called render for some reason...?
// Issue with user adding to wishlist then refreshing

require('./styles/main.scss')



render(
        <Router> 
        	<div className='wrapper'>
        		<Route exact path="/" render={(props) => ( localStorage.getItem('username') != null ? (<Redirect to="/browse"/>) : (<Redirect to="/login"/>))}/>
        		<Route path="/login" component={Login} />
        		<Route path="/register" component={Register} />
        		<Route path="/browse" component={Browse} />
        		<Route path="/profile" component={Profile} />
                        <Route path="/shoemania" component={Shoemania} />
                        <Route path="/popular" component={Popular} />
                        <Route path="/wishlist" component={Wishlist} />
                        <Route path="/location" component={Location} />
        	</div>
        </Router>
        , document.getElementById('app')
);
