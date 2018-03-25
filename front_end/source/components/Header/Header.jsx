import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import { Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { Container, Divider, Grid, Input } from 'semantic-ui-react'

import styles from './Header.scss'

class Header extends Component {

  constructor(props) {
    super();
    this.state = {};
  }

  deleteStorage(){
    var data = localStorage.getItem('username')
    if(data != null) {
       localStorage.removeItem('username');
    }
  }




  render() {
    if(localStorage.getItem('username') != null ){
      return (
        <div className="Header">				
  				<div className="trap">
  					<div className="links">
  						<ul>
  							<Link to={"/browse"}>Browse</Link>
  							<span className="divider">|</span>
  							<Link to={'/profile'}>Profile</Link>
  							<span className="divider">|</span>
  							<span className="logout" onClick= { () => {this.deleteStorage()}}> <Link to={"/login"}>Logout</Link></span>
  						</ul>
  					</div>
  				</div>
  			</div>
      );
    }
    return (<Redirect to={"/"} />);
  }

}


export default Header