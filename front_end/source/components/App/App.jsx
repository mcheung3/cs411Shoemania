import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Route } from 'react-router-dom';
import { Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Container, Divider, Grid, Input } from 'semantic-ui-react';

import Header from '../Header/Header.jsx'

class App extends Component {


	render(){
		return( 
				<div>
				<Header></Header>
				<div>Cs 411 Shoemania project</div>
				</div>
	    	);
	}

}

export default App;