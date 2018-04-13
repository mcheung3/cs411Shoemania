import React, { Component } from 'react'
import { Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { Form, Grid, Image, Message, Segment } from 'semantic-ui-react'
//import LinkedStateMixin from 'react-linked-state-adapter';
import styles from './Profile.scss'
import axios from 'axios'
import { Redirect } from 'react-router'
import Header from '../Header/Header.jsx'


class Profile extends Component {
	
	constructor(props) {
		super(props);
		
		this.state = {
			wishlist: false,
			location: false
		};

    	this.handleWishlistClick = this.handleWishlistClick.bind(this);
    	this.handleLocationClick = this.handleLocationClick.bind(this);
 	 }

	handleWishlistClick(event) {
	    this.setState({wishlist: true});
	}

	handleLocationClick(event) {
	    this.setState({location: true});
	}

	render(){
		if( localStorage.getItem('username') == null){
	    	return (<Redirect to={"/"} />);
	    }
	   	if( this.state.wishlist ){
	    	return (<Redirect to={"/wishlist"} />);
	    }
	   	if( this.state.location ){
	    	return (<Redirect to={"/location"} />);
	    }
		return( 
				<div className='BrowserWrapper'>
					<Header></Header>
					<div className='Browse'>
						<div className='transparentBlue'>
							<h1>{'Welcome ' +  localStorage.getItem('username')+'!'}</h1>
							<div className='flexer'>
								<div className='buttonContainer1'>
									<Button inverted id='wlb' onClick={this.handleWishlistClick}> 
											View Your Wishlist!
									</Button>
								</div>
								<div className='buttonContainer2'>
									<Button inverted id='clb' onClick={this.handleLocationClick}>
											Change Locations!
									</Button>
								</div>
							</div>
						</div>
					</div>
				</div>
	    	);
	}

}

export default Profile