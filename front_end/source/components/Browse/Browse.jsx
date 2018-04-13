import React, { Component } from 'react'
import { Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { Form, Grid, Image, Message, Segment } from 'semantic-ui-react'
//import LinkedStateMixin from 'react-linked-state-adapter';
import styles from './Browse.scss'
import axios from 'axios'
import { Redirect } from 'react-router'
import Header from '../Header/Header.jsx'

class Browse extends Component {

	constructor(props) {
		super(props);
		
		this.state = {
			shoemania: false,
			popular: false
		};

    	this.handleShoemaniaClick = this.handleShoemaniaClick.bind(this);
        this.handlePopularClick = this.handlePopularClick.bind(this);
 	 }

	handleShoemaniaClick(event) {
	    this.setState({shoemania: true});
	}

    handlePopularClick(event) {
	    this.setState({popular: true});
	}
	render(){
		if( localStorage.getItem('username') == null){
	    	return (<Redirect to={"/"} />);
	    }
	   	if( this.state.shoemania ){
	    	return (<Redirect to={"/shoemania"} />);
	    }
	    if( this.state.popular){
	    	return (<Redirect to={"/popular"} />);
	    }
		return( 
				<div className='BrowserWrapper'>
					<Header></Header>
					<div className='Browse'>
						<div className='transparentBlue'>
							<h1>Shoemania</h1>
							<div className='flexer'>
								<div className='buttonContainer1'>
									<Button inverted id='b1' onClick={this.handleShoemaniaClick}> 
											Shoemania!
									</Button>
								</div>
								<div className='buttonContainer2'>
									<Button inverted id='b2' onClick={this.handlePopularClick}>
											Popular!
									</Button>
								</div>
							</div>
							</div>
					</div>
				</div>
	    	);
	}
}

export default Browse