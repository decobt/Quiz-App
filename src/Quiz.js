import React, { Component } from 'react';
import {browserHistory} from 'react-router';

//import axios, actions, and connect
import axios from 'axios';
import { bindActionCreators } from 'redux';
import actions from './actions/actions.js';
import {connect} from 'react-redux';

class Quiz extends Component {
  constructor(props){
    super(props);
    //define state, progress and score will change
    this.state = {
      progress: this.props.progress,
      score: this.props.score
    }
    //bind onSubmitQuestion event
    this.onSubmitQuestion = this.onSubmitQuestion.bind(this);
    //bind onClick event on signin button
    this.toDashboard = this.toDashboard.bind(this);
  }

  //On click event that fires when user clicks on sign in button
  toDashboard(){
    //go to dashboard
    browserHistory.replace('/dashboard');
  }

  //Makes a get request to get 10 random question
  componentWillMount(){
    let self = this;
    //dispatch action that you are about to fetch data
    self.props.fetchingQuiz();
    //make a get call to the api
    axios.get('/api/quiz/random')
    .then(function (response) {
      //when you get the response data
      var byHash=[];
      //loop through it
      // eslint-disable-next-line
      if(response.data!=undefined){
        for(var i in response.data){
          //organize the data
          byHash.push({
            id:response.data[i]._id,
            question: response.data[i].question,
            options: response.data[i].options,
            answer: response.data[i].answer
          });
        }
      }
      //after 2 seconds fire proba function
      setTimeout(proba, 2000);
      function proba(){
        //dispatch action that the data has been received
        self.props.fetchedQuiz({byHash:byHash});
      }
    })
  }

  //function that fires when a user answers a question
  onSubmitQuestion(answer,e){
      //check the db answer and the user clicked
      // eslint-disable-next-line
      if(answer == e.target.value){
        //console.log('equal');
        //if equals change the state, increment both progress and score
        //progress is used to keep track which question is at the moment
        this.setState({
          progress: this.state.progress + 1,
          score: this.state.score + 1
        });
      }else{
        //if not equal, increment only the progress
        this.setState({
          progress: this.state.progress + 1,
        });
      }
      //decheck the radio button
      e.target.checked = false;
  }

  //function used to start the quiz over again
  resetQuiz(){
    //set state, progress and score to zero
    this.setState({
      progress: 0,
      score: 0
    })
  }

  render(){
    //define pom and calculate it to display progress bar (0-100)
    let pom = this.state.progress*10;

    //if data is fetching from the backend, display loading icon
    if(this.props.isFetching){
      return (
        //render the loader icon if true
        <div className="loader">
          <i className="fa fa-circle-o-notch fa-spin fa-5x fa-fw"></i>
          <span className="sr-only">Loading...</span>
        </div>
      );
    }else{
      //define prompt variable that will hold the current question to display
      let prompt = this.props.questions[this.state.progress];
      //define an empty array, to hold the answer options
      let options = [];
      //check if prompt is defined
      if(prompt !== undefined){
        //loop through and get the options
        for(let i=0; i<4; i++){
          options.push(<Option key={i} data={prompt.options[i]} onChangeFunc={this.onSubmitQuestion.bind(this, prompt.answer)} />)
        }
        return (
          <div className="container">

          <div className="row">
            <div className="col-xs-12 col-sm-8">
            </div>
            <div className="col-xs-3 col-sm-1 text-center create-button" data-toggle="collapse" href="#collapseExample">
              {this.state.score}
            </div>
            <div className="col-xs-6 col-sm-2 text-center delete-button" onClick={this.onSubmitFormClick}>Points</div>
            <div className="col-xs-3 col-sm-1 text-center create-button" onClick={this.toDashboard}>
              <i className="fa fa-sign-in" aria-hidden="true"></i>
            </div>
          </div>


          <div className="row">
            <p><strong>Question {this.state.progress+1} of 10</strong></p>
              <div className="progress" style={{background:'#c0392b', height:'8px'}}>
                <div className="progress-bar" role="progressbar" aria-valuenow={this.state.progress} aria-valuemin="0" aria-valuemax="10" style={{width:pom+'%',background:'white'}}>
                  <span className="sr-only">{pom}% Complete (danger)</span>
                </div>
              </div>
          </div>

          <div className="row">
            <div className="display text-center" style={{padding:'50px 10px', color:'#fefefe', background:'#c0392b', borderRadius:'3px'}}>
              <h3><strong>{prompt.question}</strong></h3>
            </div>
          </div>

          <div className="row">
            <form onSubmit={this.onSubmitQuestion}>
              {options}
            </form>
          </div>

          </div>
        );
      }else{
        //if prompt is not defined it means that its the quiz extends
        //display the score and the reset button
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

//Options component, used to display the offered answer choices
class Option extends Component{
  render(){
    return (
      <div className="radio-boxes col-sm-6">
          <label>
            <input type="radio" name="optionsRadios" id={this.props.data} value={this.props.data} onChange={this.props.onChangeFunc} />
            <span style={{fontSize:'16px', margin:'0px 20px'}}>{this.props.data}</span>
          </label>
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
