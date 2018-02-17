import React, { Component } from 'react';
import {browserHistory} from 'react-router';
import Cookies from 'universal-cookie';

//import redux, actions
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import actions from '../actions/actions.js';

class Login extends Component{
  constructor(props){
    super(props);
    this.submitForm = this.submitForm.bind(this);
  }
  submitForm(e){
    //define cookies
    const cookies = new Cookies();
    //prevent default action
    e.preventDefault();
    //get form values and store them in variables
    let username = e.target.username.value,
        password = e.target.password.value;

    //if detauls are equal to admin & admin
    if(username === 'admin' && password === 'admin'){
      //fire action to login user
      this.props.loginUser(true);
      cookies.set("status", {loggedIn:true});
      //redirect to dashboard
      browserHistory.replace('/dashboard');
    }else{
      //if details are not correct display alert message
      cookies.remove("status");
      alert('Wrong Details, please try again!');
    }
  }
  render(){
      return (
        <div>
        <h1>Login Page</h1>
        <form onSubmit={this.submitForm}>
        <input type="text" name="username" placeholder="Enter Username" className="form-control search-bar" />
        <input type="password" name="password" placeholder="Enter Password" className="form-control search-bar" />
        <input type="submit" className="create-button" style={{border:'0', width:'100%', background:'#2ecc71'}} defaultValue="LOGIN"/>
        </form>
        </div>
      );
  }
}

function mapDispatchToProps(dispatch) {
  return { loginUser: bindActionCreators(actions.loginUser, dispatch) }
}
export default connect(null, mapDispatchToProps) (Login);
