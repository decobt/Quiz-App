import React, { Component } from 'react';
import {Link} from 'react-router';

//ListItem component used in App
class ListItem extends Component {
  constructor(props){
    super(props);
    this.deleteQuestion = this.deleteQuestion.bind(this);
  }
  deleteQuestion(){
    console.log('it works');
  }
  render(){
    return (
      <div className="col-sm-12 clearfix" key={this.props.data.id} style={{padding:'20px', background:'white', borderBottom:'1px solid rgba(0,0,0,0.2)'}}>
      <div className="pull-left">
      <input type="checkbox" style={{margin:'0px 10px'}} value={this.props.data.id} />
      <span style={{fontSize:'22px', margin:'0px 10px'}}>{this.props.data.question}</span>
      </div>
      <div className="btn-group pull-right" role="group" aria-label="...">
        <Link to={'/quiz/view/'+this.props.data.id} className="btn btn-default"><i className="fa fa-search" aria-hidden="true"></i></Link>
        <Link to={'/quiz/edit/'+this.props.data.id} className="btn btn-default"><i className="fa fa-pencil" aria-hidden="true"></i></Link>
        <Link to={'/quiz/delete/'+this.props.data.id} className="btn btn-default"><i className="fa fa-trash" aria-hidden="true"></i></Link>
      </div>
      </div>
    );
  }
}

export default ListItem;
