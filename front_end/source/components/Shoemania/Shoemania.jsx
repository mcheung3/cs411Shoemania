import React, { Component } from 'react'
import { button } from 'semantic-ui-react'
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
			redirect: false,
			data: null
		};

		this.renderData = this.renderData.bind(this);
    	this.handleLikeClick = this.handleLikeClick.bind(this);
        this.handleDislikeClick = this.handleDislikeClick.bind(this);
 	 }
	componentDidMount(){
		if( localStorage.getItem('username') == null){
			this.setState({redirect: true});
			return;
		}
		axios.get('http://localhost:3000/shoemania/mcheung3').then(response => {this.setState({data: response})});
	}

	handleLikeClick(event) {
		var postData = {
		  username: localStorage.getItem('username'),
		  shoe_id: this.state.data.data.id,
		  liked: true
		};

		let axiosConfig = {
		  headers: {
		      'Content-Type': 'application/json;charset=UTF-8',
		      "Access-Control-Allow-Origin": "*",
		  }
		};

		axios.post('http://localhost:3000/shoemania/', postData, axiosConfig)
		.then((res) => {
			this.setState({redirect: true});
		})
		.catch((err) => {
		  	console.log("AXIOS ERROR: ", err);
		})
	}

    handleDislikeClick(event) {
		var postData = {
		  username: localStorage.getItem('username'),
		  shoe_id: this.state.data.data.id,
		  liked: false
		};

		let axiosConfig = {
		  headers: {
		      'Content-Type': 'application/json;charset=UTF-8',
		      "Access-Control-Allow-Origin": "*",
		  }
		};
		axios.post('http://localhost:3000/shoemania/', postData, axiosConfig)
		.then((res) => {
			this.setState({redirect: true});
		})
		.catch((err) => {
		  	console.log("AXIOS ERROR: ", err);
		})
	}

 	renderData(){
 		console.log("Here")
		if( this.state.data != null ){
			console.log(this.state.data);
			return (<div className='ShoemaniaFlexer'> 
						<img className='shoePic' src={this.state.data.data.photo}></img>
				        <div className='shoeBrand'> {this.state.data.data.brand} </div>
						<div className='shoeDesc'> {this.state.data.data.description} </div>
						<div className='shoeColor'> {this.state.data.data.color} </div>
						<div className='shoeName'> {this.state.data.data.name} </div>
						<div className='shoeType'> {this.state.data.data.type} </div>
						<div className='shoePrice'> {'$' + this.state.data.data.price} </div>
						<div className='flexer2'>
								<div className='buttonContainer1'>
									<button className="ui inverted button" id='bd' onClick={this.handleDislikeClick}> 
											Dislike!
									</button>
								</div>
								<div className='buttonContainer2'>
									<button className="ui inverted button" id='bl' onClick={this.handleLikeClick}>
											Like!
									</button>
								</div>
					</div>
					</div>

					)
		}	
 	 }

	render(){
		if( localStorage.getItem('username') == null ){
	    	return (<Redirect to={"/"} />);
	    }
	    if(this.state.redirect){
	    	return (<Redirect to={"/Shoemania"} />);
	    }
		return( 
				<div>
				<Header></Header>
        			<div className="Display">
        				{this.renderData()}
        			</div>
				</div>
	    	);
	}

}

export default Shoemania