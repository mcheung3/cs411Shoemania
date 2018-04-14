import React, { Component } from 'react'
import { Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { Form, Grid, Image, Message, Segment } from 'semantic-ui-react'
//import LinkedStateMixin from 'react-linked-state-adapter';
import styles from './Recommend.scss'
import axios from 'axios'
import { Redirect } from 'react-router'
import Header from '../Header/Header.jsx'


class Recommend extends Component {
	
	constructor(props) {
		super(props);
		
		this.state = {
			ai: false,
			regular: false,
			location: false
		};

    	this.handleAiClick = this.handleAiClick.bind(this);
        this.handleRegularClick = this.handleRegularClick.bind(this);
        this.handleLocationClick = this.handleLocationClick.bind(this);
 	 }

	handleAiClick(event) {
	    this.setState({ai: true});
	}

    handleRegularClick(event) {
	    this.setState({regular: true});
	}

	handleLocationClick(event) {
	    this.setState({location: true});
	}


	render(){
		if( localStorage.getItem('username') == null){
	    	return (<Redirect to={"/"} />);
	    }
	   	if( this.state.ai ){
	    	return (<Redirect to={"/aiRecommend"} />);
	    }
	    if( this.state.regular){
	    	return (<Redirect to={"/personalRecommend"} />);
	    }
	    if( this.state.location){
	    	return (<Redirect to={"/locationRecommend"} />);
	    }
		return( 
				<div className='BrowserWrapper'>
					<Header></Header>
					<div className='Browse'>
						<div className='transparentBlue'>
							<h1>Recommending Options:</h1>
							<div className='flexer'>
								<div className='buttonContainer1'>
									<Button inverted id='b1' onClick={this.handleAiClick}> 
											AI!
									</Button>
								</div>
								<div className='buttonContainer2'>
									<Button inverted id='b2' onClick={this.handleRegularClick}>
											Personal!
									</Button>
								</div>
								<div className='buttonContainer3'>
									<Button inverted id='b3' onClick={this.handleLocationClick}>
											Location!
									</Button>
								</div>
							</div>
							</div>
					</div>
				</div>
	    	);
	}

}

export default Recommend