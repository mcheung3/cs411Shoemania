import React, { Component } from 'react'
import { Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { Form, Grid, Image, Message, Segment } from 'semantic-ui-react'
//import LinkedStateMixin from 'react-linked-state-adapter';
import styles from './Wishlist.scss'
import axios from 'axios'
import { Redirect } from 'react-router'
import Header from '../Header/Header.jsx'


class Wishlist extends Component {
	
	constructor(props) {
		super(props);
		
		this.state = {
			data: null
		};
		//this.renderData = this.renderData.bind(this);
 	 }

	render(){
		if( localStorage.getItem('username') == null){
	    	return (<Redirect to={"/"} />);
	    }
	   	if(this.state.redirect){
	    	return (<Redirect to={"/"} />);
	    }
		return( 
				<div className='BrowserWrapper'>
					<Header></Header>
					<div className='Browse'>
						<div className='transparentBlue'>
						</div>
					</div>
				</div>
	    	);
	}

}
export default Wishlist