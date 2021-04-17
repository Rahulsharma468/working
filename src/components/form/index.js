import React, { Component } from 'react';
import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';
import { withFirebase } from '../Firebase';
import './style.css';

const Post_form =() =>  {
  return(
    <>
      <h1 style={{textAlign:"center"}}>Recepie Post</h1>
      <PostForm1 />
    </>
  )
}

const INITIAL_STATE = {
    recpeie: '' , 
    requirments: ''  , 
    method: ''
}

class formBase extends Component{
    constructor(props) {
        super(props);
        this.state = { ...INITIAL_STATE };
      }    

      onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
      };

      onSubmit = (event) => {
        const { recpeie , requirments , method } = this.state;
        console.log(recpeie + requirments + method);
      }
    
      render() {
        const { recpeie, requirments, method } = this.state;
        const isInvalid = recpeie === '' || requirments === '' || method === '';
        return (
            <div className="maindivd">
              <form onSubmit={this.onSubmit} className="form">
                <input className="input"  name="recpeie" value={recpeie} onChange={this.onChange} type="text" placeholder="name"/><br />
                <input className="input" name="requirments" value={requirments}  onChange={this.onChange} type="requirments" placeholder="requirments"/><br />
                <input className="input" name="method" value={method} onChange={this.onChange} type="method" placeholder="method"/>
                <br />
                <button className="btn"type="submit" disabled={isInvalid} onSubmit={this.onSubmit}>Submit</button>
              </form>
            </div>
        );
      }
}

const PostForm1 = compose(
    withRouter,
    withFirebase,
  )(formBase);

export default Post_form