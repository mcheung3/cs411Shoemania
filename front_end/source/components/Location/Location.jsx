import React, { Component } from 'react'
import { Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { Form, Grid, Image, Message, Segment } from 'semantic-ui-react'
//import LinkedStateMixin from 'react-linked-state-adapter';
import styles from './Location.scss'
import axios from 'axios'
import { Redirect } from 'react-router'
import Header from '../Header/Header.jsx'


class Location extends Component {
	
	constructor(props) {
		super(props);
		
		this.state = {
			data: null,
			redirect: false,
			changed: false
		};
		this.handleSubmit = this.handleSubmit.bind(this);
 	 }

	componentDidMount(){
		if( localStorage.getItem('username') == null){
			this.setState({redirect: true});
			return;
		}
		axios.get('http://localhost:3000/users/name/' + localStorage.getItem('username') ).then(response => {console.log(response); this.setState({data: response})});
	}

	handleSubmit(event) {
		event.preventDefault();
		var location = document.getElementById("locationid").value;
		var putData = {
		  username: this.state.data.data[0].name,
		  password: this.state.data.data[0].password,
		  location: location
		};

		let axiosConfig = {
		  headers: {
		      'Content-Type': 'application/json;charset=UTF-8',
		      "Access-Control-Allow-Origin": "*",
		  }
		};

		axios.put('http://localhost:3000/users/' + this.state.data.data[0].id, putData, axiosConfig)
		.then((res) => {
			this.setState({changed: true});
		})
		.catch((err) => {
		  	console.log("AXIOS ERROR: ", err);
		})

	}
 	renderData(){
		if( this.state.data != null ){
			if(this.state.data.data[0].location != null ) {
				return (
					<div> 
						<h1> {'You Are Currently In: ' + this.state.data.data[0].location + '!'}</h1>
						<Form id='locationForm' onSubmit={this.handleSubmit}>
						    <Form.Field>
						      <label className='formTitle'>Set New Location</label>
						      <input id='locationid' placeholder='Location...' />
						    </Form.Field>
						    <Button type='submit'>Submit</Button>
						</Form>
					</div>
						);
			}else{
				return (
					<div> 
						<h1> You Don't Currently Have A Location! </h1>
						<Form id='locationForm' onSubmit={this.handleSubmit}>
						    <Form.Field>
						      <label className='formTitle'>Set Location</label>
						      <input id='locationid' placeholder='Location...' />
						    </Form.Field>
						    <Button type='submit'>Submit</Button>
						</Form>
					</div>
						);
			}
		}
	}
	render(){
		if( localStorage.getItem('username') == null){
	    	return (<Redirect to={"/"} />);
	    }
	   	if(this.state.redirect){
	    	return (<Redirect to={"/"} />);
	    }
	   	if(this.state.changed){
	    	return (<Redirect to={"/profile"} />);
	    }
		return( 
				<div className='BrowserWrapper'>
					<Header></Header>
					<div className='Browse'>
						<div className='transparentBlue'>
						<div className="Display">
        					{this.renderData()}
        				</div>
						</div>
					</div>
				</div>
	    	);
	}

}
export default Location