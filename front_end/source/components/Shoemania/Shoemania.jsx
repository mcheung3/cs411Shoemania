import React, { Component } from 'react'
import { Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { Form, Grid, Image, Message, Segment } from 'semantic-ui-react'
import styles from './Shoemania.scss'
import axios from 'axios'
import { Redirect } from 'react-router'
import Header from '../Header/Header.jsx'


class Shoemania extends Component {
	
	constructor(props) {
		super(props);
		
		this.state = {
			redirect: false,
			data: null,
			addedToWL: false
		};

		this.renderData = this.renderData.bind(this);
    	this.handleLikeClick = this.handleLikeClick.bind(this);
        this.handleDislikeClick = this.handleDislikeClick.bind(this);
        this.handleAddToWishlist = this.handleAddToWishlist.bind(this);

 	 }
	componentDidMount(){
		if( localStorage.getItem('username') == null){
			this.setState({redirect: true});
			return;
		}
		axios.get('http://ec2-13-59-119-199.us-east-2.compute.amazonaws.com:3000/shoemania/' + localStorage.getItem('username') ).then(response => {this.setState({data: response})});
	}

	handleLikeClick(event) {
		event.preventDefault();
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

		axios.post('http://ec2-13-59-119-199.us-east-2.compute.amazonaws.com:3000/shoemania/', postData, axiosConfig)
		.then((res) => {
			axios.get('http://ec2-13-59-119-199.us-east-2.compute.amazonaws.com:3000/shoemania/' + localStorage.getItem('username') ).then(response => {this.setState({data: response, addedToWL: false})});
		})
		.catch((err) => {
		  	console.log("AXIOS ERROR: ", err);
		})
	}

	handleAddToWishlist(event){
		var postData = {
		  username: localStorage.getItem('username'),
		  shoe_id: this.state.data.data.id,
		};

		let axiosConfig = {
		  headers: {
		      'Content-Type': 'application/json;charset=UTF-8',
		      "Access-Control-Allow-Origin": "*",
		  }
		};
		axios.post('http://ec2-13-59-119-199.us-east-2.compute.amazonaws.com:3000/wishlist/', postData, axiosConfig)
		.then((res) => {
			this.setState({addedToWL: true});
		})
		.catch((err) => {
		  	console.log("AXIOS ERROR: ", err);
		})
	}


    handleDislikeClick(event) {
    	event.preventDefault();
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
		axios.post('http://ec2-13-59-119-199.us-east-2.compute.amazonaws.com:3000/shoemania/', postData, axiosConfig)
		.then((res) => {
			axios.get('http://ec2-13-59-119-199.us-east-2.compute.amazonaws.com:3000/shoemania/' + localStorage.getItem('username') ).then(response => {this.setState({data: response, addedToWL: false})});
		})
		.catch((err) => {
		  	console.log("AXIOS ERROR: ", err);
		})
	}

 	renderData(){
 		console.log("Here")
		if( this.state.data != null ){
			if(this.state.addedToWL){
				return (<div className='ShoemaniaFlexer'> 
							<img className='shoePic' src={this.state.data.data.photo}></img>
					        <div className='shoeBrand'> {this.state.data.data.brand} </div>
					        <div className='shoeName'> {this.state.data.data.name} </div>
							<div className='shoeType'> {this.state.data.data.type} </div>
							<div className='shoeColor'> {this.state.data.data.color} </div>
							<div className='shoeDesc'> {this.state.data.data.description} </div>
							<div className='shoePrice'> {'$' + this.state.data.data.price} </div>
							<div className='flexer2'>
									<div className='buttonContainer1'>
										<Button inverted id='bd' onClick={this.handleDislikeClick}> 
												Dislike!
										</Button>
									</div>
									<div className='buttonContainer2'>
										<Button inverted id='bl' onClick={this.handleLikeClick}>
												Like!
										</Button>
									</div>
							</div>
						</div>

						)
			}else{
				return (<div className='ShoemaniaFlexer'> 
					<img className='shoePic' src={this.state.data.data.photo}></img>
			        <div className='shoeBrand'> {this.state.data.data.brand} </div>
			        <div className='shoeName'> {this.state.data.data.name} </div>
					<div className='shoeType'> {this.state.data.data.type} </div>
					<div className='shoeColor'> {this.state.data.data.color} </div>
					<div className='shoeDesc'> {this.state.data.data.description} </div>
					<div className='shoePrice'> {'$' + this.state.data.data.price} </div>
					<div className='flexer2'>
							<div className='buttonContainer1'>
								<Button inverted id='bd' onClick={this.handleDislikeClick}> 
										Dislike!
								</Button>
							</div>
							<div className='buttonContainer2'>
								<Button inverted id='bl' onClick={this.handleLikeClick}>
										Like!
								</Button>
							</div>
					</div>
					<Button inverted id='wl' onClick={this.handleAddToWishlist}>
							ADD TO WISHLIST!
					</Button>
				</div>

				);
			}
		}	
 	 }

	render(){
		if( localStorage.getItem('username') == null ){
	    	return (<Redirect to={"/"} />);
	    }
	    if(this.state.redirect){
	    	return (<Redirect to={"/"} />);
	    }
		return( 
				<div >
				<Header></Header>
        			<div className="Display">
        				{this.renderData()}
        			</div>
        		</div>

	    	);
	}

}

export default Shoemania