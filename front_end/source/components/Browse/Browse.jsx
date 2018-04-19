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
			recommend: false
		};

    	this.handleShoemaniaClick = this.handleShoemaniaClick.bind(this);
        this.handleRecommendClick = this.handleRecommendClick.bind(this);
 	 }

	handleShoemaniaClick(event) {
	    this.setState({shoemania: true});
	}

    handleRecommendClick(event) {
	    this.setState({recommend: true});
	}
	render(){
		if( localStorage.getItem('username') == null){
	    	return (<Redirect to={"/"} />);
	    }
	   	if( this.state.shoemania ){
	    	return (<Redirect to={"/shoemania"} />);
	    }
	    if( this.state.recommend){
	    	return (<Redirect to={"/recommend"} />);
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
									<Button inverted id='b2' onClick={this.handleRecommendClick}>
											Recommend!
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