import React, { Component } from 'react';
import {Link} from 'react-router';

//ListItem component used in App
class ListItem extends Component {
  render(){
    return (
      <div className="col-sm-12 clearfix" key={this.props.data.id} style={{padding:'20px', background:'white', borderBottom:'1px solid rgba(0,0,0,0.2)'}}>
      <div className="pull-left">
      <input type="checkbox" style={{margin:'0px 10px'}} value={this.props.data.id} />
      <span style={{fontSize:'22px', margin:'0px 10px'}}>{this.props.data.question}</span>
      </div>
      <div className="btn-group pull-right" role="group" aria-label="...">
        <Link to={'/quiz/edit/'+this.props.data.id} className="btn btn-default"><i className="fa fa-pencil" aria-hidden="true"></i></Link>
        <button onClick={this.props.onClick} className="btn btn-default"><i className="fa fa-trash" aria-hidden="true"></i></button>
      </div>
      </div>
    );
  }
}

export default ListItem;
