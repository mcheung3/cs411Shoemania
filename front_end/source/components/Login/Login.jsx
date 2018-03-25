import React, { Component } from 'react'
import { Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { Form, Grid, Image, Message, Segment } from 'semantic-ui-react'
//import LinkedStateMixin from 'react-linked-state-adapter';
import styles from './Login.scss'
import axios from 'axios'
import { Redirect } from 'react-router'



class Login extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
			username: '',
			password: '',
			error: '',
			redirect: false
		};
		
		this.handleUsernameChange = this.handleUsernameChange.bind(this);
		this.handlePasswordChange = this.handlePasswordChange.bind(this);
		this.login = this.login.bind(this);

  }

	handleUsernameChange(event) {
		this.setState({username: event.target.value});
	}

	handlePasswordChange(event) {
		this.setState({password: event.target.value});
	}


	login(event) {
		event.preventDefault();

		axios.post('http://ec2-13-59-119-199.us-east-2.compute.amazonaws.com:3000/account/login', {
			username: this.state.username,
			password: this.state.password
		})
		.then(function (response) {
			localStorage.setItem('username', response.data.user)
			this.setState({redirect:true})
		}.bind(this))
		.catch(function (error) {
			this.setState({error: "The username or password is incorrect."});
		}.bind(this));

	}

	render() {
		if(this.state.redirect) {
	        return (<Redirect to={"/"} />);
	    }
	    if(localStorage.getItem('username') != null){
	    	return (<Redirect to={"/"} />);
	    }
		return(
			 <div>     
				<div className="Login">
					<form role='form'>
						<h1>Shoemania</h1>

						<input className="username" type='text' value={this.state.username}  onChange={this.handleUsernameChange} placeholder='Username' />
						<span className="underline"></span>

						<input type='password' value={this.state.password}  onChange={this.handlePasswordChange} placeholder='Password' />
						<span className="underline"></span>

						<Link to={"/register"}>Register</Link>
						<button type='submit' onClick={this.login.bind(this)}>LOGIN</button>

						<p className="error">{this.state.error}</p>
					</form>
				</div>
			</div>
		)
	}
}

export default Login
