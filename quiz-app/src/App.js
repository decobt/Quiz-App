import React, { Component } from 'react';
import './App.css';

//import components that will be used in App
import AddQuizForm from './components/AddQuizForm.js';
import ListItem from './components/ListItem.js';

//import axios and redux, actions
import axios from 'axios';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import actions from './actions/actions.js';

class App extends Component {
  constructor(props){
    super(props);
    this.onSubmitFormClick = this.onSubmitFormClick.bind(this);
  }
  onSubmitFormClick(e){
    e.preventDefault();
    var items = [];
    var elements = document.getElementById("myForm").elements;
    for(var i in elements){
      if(elements[i].checked === true){
        items.push(elements[i].value);
      }
    }
    console.log(items)
  }

  componentWillMount(){
    let self = this;
    //dispatch action that you are about to fetch data
    self.props.fetchingQuiz();
    //make a get call to the api
    axios.get('/api/quiz')
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
    .catch(function (error) {
      //log error in console
      console.log(error);
    });
  }

  render() {
    //generate ListItem for each object in byHash
    var rows = [];
    for(var quiz in this.props.byHash){
      rows.push(
        <ListItem key={quiz} data={this.props.byHash[quiz]} />
      );
    }
    //check if isFetching is equal to true
    if(this.props.isFetching){
      return (
        //render the loader icon if true
        <div className="loader">
          <i className="fa fa-circle-o-notch fa-spin fa-5x fa-fw"></i>
          <span className="sr-only">Loading...</span>
        </div>
      );
    }else{
      //if it is false, render the main App
      return (
      <div className="container">

        <div className="row" style={{background:'#333'}}>
          <div className="col-sm-10" style={{padding:'20px', color:'white', fontSize:'32px'}}>
            <span>Quiz-Co App</span>
          </div>
          <div className="col-sm-1 text-center create-button" data-toggle="collapse" href="#collapseExample">
            <i className="fa fa-plus" aria-hidden="true"></i>
          </div>
          <div className="col-sm-1 text-center delete-button" onClick={this.onSubmitFormClick}>
            <i className="fa fa-trash" aria-hidden="true"></i>
          </div>
        </div>

        <div className="row collapse" id="collapseExample">
          <AddQuizForm />
        </div>

        <div className="row">
          <input className="form-control search-bar" name="search" placeholder="Search..." />
        </div>
        <div className="row">
          <form id="myForm">
            {rows}
          </form>
        </div>

      </div>
    );
  }//end of else
  }
}

function mapStateToProps(state) {
  return {byHash: state.byHash, isFetching: state.isFetching};
}
function mapDispatchToProps(dispatch) {
  return { fetchingQuiz: bindActionCreators(actions.fetchingQuiz, dispatch),
           fetchedQuiz: bindActionCreators(actions.fetchedQuiz, dispatch) }
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
