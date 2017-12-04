import React, { Component } from 'react';
import {Link} from 'react-router';
import './App.css';

import axios from 'axios';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import actions from './actions/actions.js';

class App extends Component {
  constructor(props){
    super(props);
    this.submitForm = this.submitForm.bind(this);
  }
  componentWillMount(){
    //axios.get
  }
  submitForm(e){
    e.preventDefault();
    var name = e.target.name.value;
    var description = e.target.description.value;
    //console.log(this.props);
    var self = this;
    axios.post('/api/quiz', {name:name, description:description})
    .then(function (response) {
      self.props.addQuiz(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  render() {
    //console.log(this.props);
    var rows = [];
    for(var quiz in this.props.byHash){
      rows.push(
        <div key={quiz}>
        <Link to={'/quiz/'+quiz}>View</Link>
        <Link to={'/quiz/edit/'+quiz}>Edit</Link>
        <Link to={'/quiz/delete/'+quiz}>Delete</Link>
        <p>{this.props.byHash[quiz].name}, {this.props.byHash[quiz].description}</p>
        </div>
       )
    }
    return (
      <div>
      <h1>Created Quiz</h1>
      {rows}

      <h1>Create Quiz Form</h1>
      <form onSubmit={this.submitForm}>
        <div className="form-group">
          <input name="name" defaultValue={this.props.name} className="form-control"  placeholder="Author" />
        </div>
        <div className="form-group">
          <textarea name="description" className="form-control" defaultValue={this.props.description} placeholder="Description"></textarea>
        </div>
        <input type="submit" className="btn btn-default btn-lg" defaultValue="Create Quiz" />
      </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return state;
}
function mapDispatchToProps(dispatch) {
  return { addQuiz: bindActionCreators(actions.setQuiz, dispatch) }
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
