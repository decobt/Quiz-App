import React, { Component } from 'react';

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

  //Function to delete multiple questions
  onSubmitFormClick(e){
    //prevent default event
    e.preventDefault();
    //define an empty array to store the data
    var items = [];
    //get all elements from the form
    var elements = document.getElementById("myForm").elements;
    //loop through the elements and check which ones are checked
    for(var i in elements){
      if(elements[i].checked === true){
        //if checked, push the value (id) to the array
        items.push(elements[i].value);
      }
    }
    //make a call to the helper function to delete the items
    this.deleteApiCall(items);
  }

  //helper function that makes a call to the api to delete question/s
  deleteApiCall(items){
    var self = this;
    //console.log(items);
    //make a call to the api, pass the items
    // items = [id1, id2, id3....]
    axios.delete('api/quiz', {data: {items: items}} )
    .then(function (response){
      //get the response from the api
      console.log(response.data);
      //despatch redux action
      self.props.deleteQuiz(response.data)
    })
    .catch(function (error) {
      //if error, display the error in the console
      console.log(error);
    });
  }

  //delete question function, on button click
  deleteQuestion(id, event){
    //prevent default event
    event.preventDefault();
    //define an array
    let items = [];
    //push the id into the array
    items.push(id);
    //call the helper function
    this.deleteApiCall(items);
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
        <ListItem key={quiz} data={this.props.byHash[quiz]} onClick={this.deleteQuestion.bind(this, this.props.byHash[quiz].id)}/>
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
          <div className="col-xs-6 col-sm-1 text-center create-button" data-toggle="collapse" href="#collapseExample">
            <i className="fa fa-plus" aria-hidden="true"></i>
          </div>
          <div className="col-xs-6 col-sm-1 text-center delete-button" onClick={this.onSubmitFormClick}>
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
  return { deleteQuiz: bindActionCreators(actions.deleteQuiz, dispatch),
           fetchingQuiz: bindActionCreators(actions.fetchingQuiz, dispatch),
           fetchedQuiz: bindActionCreators(actions.fetchedQuiz, dispatch) }
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
