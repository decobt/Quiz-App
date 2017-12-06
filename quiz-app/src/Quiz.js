import React, { Component } from 'react';

import axios from 'axios';
import { bindActionCreators } from 'redux';
import actions from './actions/actions.js';
import {connect} from 'react-redux';

class Quiz extends Component {
  constructor(props){
    super(props);
    this.state = {
      progress: this.props.progress,
      score: this.props.score
    }
    this.onSubmitQuestion = this.onSubmitQuestion.bind(this);
  }
  componentWillMount(){
    let self = this;
    //dispatch action that you are about to fetch data
    self.props.fetchingQuiz();
    //make a get call to the api
    axios.get('/api/quiz/random')
    .then(function (response) {
      //when you get the response data
      var byId = [], byHash=[];
      //loop through it
      for(var i in response.data){
        //organize the data
        byHash.push({
          id:response.data[i]._id,
          question: response.data[i].question,
          options: response.data[i].options,
          answer: response.data[i].answer
        });
        byId.push(response.data[i].id);
      }
      //after 2 seconds fire proba function
      setTimeout(proba, 2000);
      function proba(){
        //dispatch action that the data has been received
        self.props.fetchedQuiz({byId:byId, byHash:byHash});
      }
    })
  }
  onSubmitQuestion(answer,e){
      // eslint-disable-next-line
      if(answer == e.target.value){
        //console.log('equal');
        this.setState({
          progress: this.state.progress + 1,
          score: this.state.score + 1
        });
      }else{
        this.setState({
          progress: this.state.progress + 1,
        });
      }
      e.target.checked = false;
  }
  resetQuiz(){
    this.setState({
      progress: 0,
      score: 0
    })
  }
  render(){
    let pom = this.state.progress*10;
    if(this.props.isFetching){
      return (
        //render the loader icon if true
        <div className="loader">
          <i className="fa fa-circle-o-notch fa-spin fa-5x fa-fw"></i>
          <span className="sr-only">Loading...</span>
        </div>
      );
    }else{
      let prompt = this.props.questions[this.state.progress];
      if(prompt !== undefined){
        return (
          <div className="container">

          <div className="row" style={{background:'#333'}}>
            <div className="col-xs-12 col-sm-9" style={{padding:'20px', color:'white', fontSize:'32px'}}>
              <span>Quiz-Co App</span>
            </div>
            <div className="col-xs-5 col-sm-1 text-center create-button" data-toggle="collapse" href="#collapseExample">
              {this.state.score}
            </div>
            <div className="col-xs-7 col-sm-2 text-center delete-button" onClick={this.onSubmitFormClick}>
              Points
            </div>
          </div>

          <div className="row text-left" style={{background:'#f5f5f5'}}>

            <div className="display" style={{padding:'50px 10px'}}>
              <h1>Question {this.state.progress+1}: {prompt.question}</h1>
            </div>
            <form onSubmit={this.onSubmitQuestion}>
              <Option data={prompt.options[0]} onChangeFunc={this.onSubmitQuestion.bind(this, prompt.answer)} />
              <Option data={prompt.options[1]} onChangeFunc={this.onSubmitQuestion.bind(this, prompt.answer)}/>
              <Option data={prompt.options[2]} onChangeFunc={this.onSubmitQuestion.bind(this, prompt.answer)}/>
              <Option data={prompt.options[3]} onChangeFunc={this.onSubmitQuestion.bind(this, prompt.answer)}/>
            </form>
          </div>

          <div className="row" style={{background:'#333', padding:'20px 20px 0px'}}>
              <div className="progress">
                <div className="progress-bar  progress-bar-striped active" role="progressbar" aria-valuenow={this.state.progress} aria-valuemin="0" aria-valuemax="10" style={{width:pom+'%'}}>
                  <span className="sr-only">{pom}% Complete (danger)</span>
                </div>
              </div>
          </div>

          </div>
        );
      }else{
        return (
          <div className="scoreDis text-center">
          <h1>Your score: {this.state.score}</h1>
          <i className="fa fa-play-circle-o fa-5x" onClick={this.resetQuiz.bind(this)} aria-hidden="true"></i>
          </div>
        );
      }
    }
  }
}

class Option extends Component{
  render(){
    return (
      <div className="radio-boxes col-sm-6">
        <div className="panel panel-primary">
        <div className="panel-body answer">
          <label>
            <input type="radio" name="optionsRadios" id={this.props.data} value={this.props.data} onChange={this.props.onChangeFunc} />
            <span style={{fontSize:'16px', margin:'0px 20px'}}>{this.props.data}</span>
          </label>
        </div>
        </div>
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
function mapDispatchToProps(dispatch) {
  return { fetchingQuiz: bindActionCreators(actions.fetchingQuiz, dispatch),
           fetchedQuiz: bindActionCreators(actions.fetchedQuiz, dispatch) }
}
export default connect(mapStateToProps, mapDispatchToProps)(Quiz);;
