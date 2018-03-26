import React, { Component } from 'react'
import { Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { Form, Grid, Image, Message, Segment } from 'semantic-ui-react'
//import LinkedStateMixin from 'react-linked-state-adapter';
import styles from './Shoemania.scss'
import axios from 'axios'
import { Redirect } from 'react-router'
import Header from '../Header/Header.jsx'


class Shoemania extends Component {
	
	constructor(props) {
		super(props);
		
		this.state = {
		};


 	 }

	render(){
		if( localStorage.getItem('username') == null){
	    	return (<Redirect to={"/"} />);
	    }
		return( 
				<div>
				<Header></Header>
				<div>Shoemania Page</div>
				</div>
	    	);
	}

}

export default Shoemania