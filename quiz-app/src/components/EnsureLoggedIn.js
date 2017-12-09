import { Component } from 'react';
import {browserHistory} from 'react-router';

//import connect
import {connect} from 'react-redux';

class EnsureLoggedIn extends Component {
  componentWillMount() {
    //check if user is logged in
    if(!this.props.login){
      //if not redirect to login form
      browserHistory.replace('/login');
    }else{
      //if yes, redirect to dashboard
      browserHistory.replace('/dashboard');
    }
  }

  render() {
    if(this.props.login){
      return this.props.children;
    }else{
      return null;
    }
  }
}

function mapStateToProps(state) {
  return {
    login: state.loggedIn
  }
}
export default connect(mapStateToProps)(EnsureLoggedIn)
