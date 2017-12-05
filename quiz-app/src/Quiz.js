import React, { Component } from 'react';

import {connect} from 'react-redux';

class Quiz extends Component {
  constructor(props){
    super(props);
    this.state = {
      prompt: this.props.questions[this.props.progress]
    }
    //this.onSubmitFormClick = this.onSubmitFormClick.bind(this);
  }
  componentWillMount(){
    this.setState({
      prompt: this.props.questions[this.props.progress]
    });
  }
  render(){
    console.log(this.props.questions)
    return (
      <div>
      <h1>Quiz</h1>
      <span>Score: {this.props.score}</span>
      <span>Progress: {this.props.progress}</span>

      <h4>{this.state.prompt}</h4>

      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    progress: 0,
    score: 0,
    questions: state.byHash,
    isFetching: state.isFetching};
}
export default connect(mapStateToProps, null)(Quiz);;
