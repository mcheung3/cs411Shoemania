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
			redirect: false,
			data: null
		};
		this.renderData = this.renderData.bind(this);
		this.handleRemoveClick = this.handleRemoveClick.bind(this);

 	 }

	componentDidMount(){
		if( localStorage.getItem('username') == null){
			this.setState({redirect: true});
			return;
		}
		axios.get('http://ec2-13-59-119-199.us-east-2.compute.amazonaws.com:3000/wishlist/' + localStorage.getItem('username') ).then(response => {this.setState({data: response})});
	}

	handleRemoveClick(event){
		event.preventDefault();

		let axiosConfig = {
		  headers: {
		      'Content-Type': 'application/json;charset=UTF-8',
		      "Access-Control-Allow-Origin": "*",
		  }
		};

		axios.delete('http://ec2-13-59-119-199.us-east-2.compute.amazonaws.com:3000/wishlist/', {params: {username: localStorage.getItem('username'), shoe_id: event.target.parentElement.parentElement.id}}, axiosConfig)
		.then((res) => {
			axios.get('http://ec2-13-59-119-199.us-east-2.compute.amazonaws.com:3000/wishlist/' + localStorage.getItem('username') ).then(response => {this.setState({data: response})});
		})
		.catch((err) => {
		  	console.log("AXIOS ERROR: ", err);
		})

	}


	renderData() {
		if( this.state.data != null ){

		    return( 
		            <div className="WishlistContainer">
		            	{this.state.data.data.map(shoeItem => {
		            		return(
					                  <div className="WishlistGalleryItem" key={shoeItem.id} id={shoeItem.id}>
					                    <img className="WishlistImage" src={shoeItem.photo}></img>
					                    <h3> {shoeItem.brand}</h3>
					                    <h3> {shoeItem.name}</h3>
					                    <h3> {'Color: ' + shoeItem.color}</h3>
					                    <h3> {'$' + shoeItem.price}</h3>
					                    <div className='removeButton' >
						                    <Button inverted id='rsb' onClick={this.handleRemoveClick}>
													Remove Shoe
											</Button>
										</div>
					                  </div>
				                  );
		            	})}
		            </div>
		          );
		}
	}

	render(){
		if( localStorage.getItem('username') == null){
	    	return (<Redirect to={"/"} />);
	    }
	   	if(this.state.redirect){
	    	return (<Redirect to={"/"} />);
	    }
		return( 
				<div >
					<Header></Header>
					<div>
						<h1 id='wishtlistTitle'> Your Wishlist: </h1>
						<div className="Display">{this.renderData()}</div>
					</div>
				</div>
	    	);
	}

}
export default Wishlist