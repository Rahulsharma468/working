import React, { Component } from 'react';
import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';
import { withFirebase } from '../Firebase';
import './style.css';
import { dba } from '../Firebase/firebase';
import * as ROUTES from '../../constants/routes';

const Post_form =() =>  {
  return(
    <>
      <h1 style={{textAlign:"center"}}>Recipe Post</h1>
      <PostForm1 />
    </>
  )
}

const INITIAL_STATE = {
    recpeie: '' , 
    requirments: ''  , 
    method: '',
    error: null
}

class formBase extends Component{
    constructor(props) {
        super(props);
        this.state = { ...INITIAL_STATE };
      }    

      onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
      };

      submit = event => {
        event.preventDefault();
        const { recpeie , requirments , method } = this.state;
        
        dba.collection('recipes').doc().set({
          recipe: [recpeie],
          requirments: [requirments],
          method: [method],
          flag: 1
        })
        .then(() => {
          this.setState({ ...INITIAL_STATE });
          this.props.history.push(ROUTES.HOME);
        })
      .catch((error) => {
          alert("Error writing document: ", error);
      })
      };
    
      render() {
        const { recpeie, requirments, method } = this.state;
        const isInvalid = recpeie === '' || requirments === '' || method === '';
        return (
            <div className="maindivd">
              <form className="form" onSubmit={this.submit} action="#"> 
                <input className="input"  name="recpeie" value={recpeie} onChange={this.onChange} type="text" placeholder="name"/><br />
                <input className="input" name="requirments" value={requirments}  onChange={this.onChange} type="requirments" placeholder="requirments"/><br />
                <textarea className="input" name="method" value={method} onChange={this.onChange} type="method" placeholder="method" rows='30'></textarea>
                
                <br />
                <button className="btn" type="submit" disabled={isInvalid}>Submit</button>
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