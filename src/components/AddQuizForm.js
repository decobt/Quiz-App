import React, { Component } from 'react';

import axios from 'axios';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import actions from '../actions/actions.js';

class AddQuizForm extends Component {
  constructor(props){
    super(props);
    this.submitForm = this.submitForm.bind(this);
  }
  submitForm(e){
    //prevent default action
    e.preventDefault();
    //get form values
    var question = e.target.question.value;
    var options = e.target.options.value;
    var answer = e.target.answer.value;

    //reset values of fields
    e.target.question.value = "";
    e.target.options.value = "";
    e.target.answer.value = "";

    var self = this;
    //make api post request, send data
    axios.post('/api/quiz', {question:question, options:options.split(','), answer:answer})
    .then(function (response) {
      //get the response
      //console.log(response);
      //dispatch action with the response
      self.props.addQuiz(response.data);
      //display alert to notify user
      alert('SUCCESSFULLY ADDED QUESTION!');
    })
    .catch(function (error) {
      //check for error and display them in console
      console.log(error);
    });
  }
  render() {
    //render the form
    return (
    <form onSubmit={this.submitForm}>
      <input className="form-control search-bar" name="question" placeholder="Question:" />
      <input className="form-control search-bar" name="options" placeholder="Options (separated by ,): " defaultValue="" />
      <input className="form-control search-bar" name="answer" placeholder="Answer:" defaultValue="" />
      <input type="submit" className="create-button" style={{border:'0', width:'100%', background:'#2ecc71'}} defaultValue="Add Question" />
    </form>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return { addQuiz: bindActionCreators(actions.setQuiz, dispatch)}
}
export default connect(null, mapDispatchToProps)(AddQuizForm);
