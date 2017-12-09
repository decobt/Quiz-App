import React, { Component } from 'react';
import {browserHistory} from 'react-router';

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
    //prevent default action
    e.preventDefault();
    //get form values and store them in variables
    let username = e.target.username.value,
        password = e.target.password.value;

    //if detauls are equal to admin & admin
    if(username === 'admin' && password === 'admin'){
      //fire action to login user
      this.props.loginUser(true);
      //redirect to dashboard
      browserHistory.replace('/dashboard');
    }else{
      //if details are not correct display alert message
      alert('Wrong Details, please try again!');
    }
  }
  render(){
      return (
        <div>
        <h1>Login Page</h1>
        <form onSubmit={this.submitForm}>
        <input type="text" name="username" placeholder="Username" className="form-control" />
        <input type="password" name="password" placeholder="Password" className="form-control" />
        <input type="submit" className="btn btn-default" />
        </form>
        </div>
      );
  }
}

function mapDispatchToProps(dispatch) {
  return { loginUser: bindActionCreators(actions.loginUser, dispatch) }
}
export default connect(null, mapDispatchToProps)(Login);
