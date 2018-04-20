import React, { Component } from 'react'
import { Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { Form, Grid, Image, Message, Segment, Loader, Dimmer } from 'semantic-ui-react'
//import LinkedStateMixin from 'react-linked-state-adapter';
import styles from './AiRecommend.scss'
import axios from 'axios'
import { Redirect } from 'react-router'
import Header from '../Header/Header.jsx'


class AiRecommend extends Component {
	
	constructor(props) {
		super(props);
		
		this.state = {
			redirect: false,
			data: null,
			back: false
		};
		this.renderData = this.renderData.bind(this);
	    this.handleAnotherClick = this.handleAnotherClick.bind(this);
        this.handleBackClick = this.handleBackClick.bind(this);
 	 }


 	handleAnotherClick(event) {
		event.preventDefault();
		if( localStorage.getItem('username') == null){
			this.setState({redirect: true});
			return;
		}
		axios.get('http://localhost:3000/aiRecommendation/' + localStorage.getItem('username') ).then(response => {this.setState({data: response})});
	}

	handleBackClick(event) {
		event.preventDefault();
		this.setState({back: true})
	}

 	componentDidMount(){
		if( localStorage.getItem('username') == null){
			this.setState({redirect: true});
			return;
		}
		axios.get('http://localhost:3000/aiRecommendation/' + localStorage.getItem('username') ).then(response => {this.setState({data: response})});
	}

	renderData(){
		if(this.state.data != null){
			return (<div className='ShoemaniaFlexer'> 
					<img className='shoePic' src={this.state.data.data.photo}></img>
			        <div className='shoeBrand'> {this.state.data.data.brand} </div>
			        <div className='shoeName'> {this.state.data.data.name} </div>
					<div className='shoeType'> {this.state.data.data.type} </div>
					<div className='shoeColor'> {this.state.data.data.color} </div>
					<div className='shoeDesc'> {this.state.data.data.description} </div>
					<div className='shoePrice'> {'$' + this.state.data.data.price} </div>

							<div className='test'>
								<Button inverted id='back' onClick={this.handleBackClick}> 
										Back To Recommendations!
								</Button>
							</div>

				</div>
				);
		}else{
			return(
				<div>      <Dimmer active>
        <Loader>Loading</Loader>
      </Dimmer> </div>
				)
		}

	}

	render(){
		if( localStorage.getItem('username') == null ){
	    	return (<Redirect to={"/"} />);
	    }
	    if(this.state.redirect){
	    	return (<Redirect to={"/"} />);
	    }
	    if(this.state.back){
	    	return (<Redirect to={"/recommend"} />);
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

export default AiRecommend