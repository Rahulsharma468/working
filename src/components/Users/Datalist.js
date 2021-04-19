import React from 'react';
import { compose } from 'recompose';
import { dba } from '../Firebase/firebase';
import { withAuthorization } from '../Session';
import * as ROUTES from '../../constants/routes';

const INITIAL_STATE = {
    loading: false,
          data: [],
          recipe: null
}

class Datalist extends React.Component{
    constructor(props){
        super(props);
        this.state ={
          loading: false,
          data: [],
          recipe: null
        };
      }
      componentDidMount() {
        this.setState({ loading: true });
        dba.collection("recipes").where("flag","==",0)
        .get()
        .then(querySnapshot => {
        const data = querySnapshot.docs.map(doc => doc.data());
          this.setState({
            data: data  ,
            loading: false,
          });
        });
        console.log(this.state.data)
      }



      submitHandler = () => {
          const name =  this.state.recipe ;
          dba.collection('recipes').doc(`${name}`).update({flag: 1})
          .catch(error => {
            alert("Error "+error);
          })  
      } 


      render() {
        const { data, loading } = this.state;
        const name = this.state.recipe;
        return (
          <div>
            <h2>Posts</h2>
            {loading && <div>Loading ...</div>}
            <table Border='true'>
              <tr>
                <th>Recipe</th>
                <th>Requirments</th>
                <th>Method</th>
                <th>Set Flag</th>
              </tr>
              {data.map(doc => (
                <tr key={doc.recipe}>
                    <td>{doc.recipe}</td>
                    <td>{doc.requirments}</td>
                    <td>{doc.method}</td>
                    <td><input type="button" name={this.name} onClick={this.submitHandler(this.name)} value={this.name}></input></td>
                </tr>
               ))}
            </table>
          </div>
        )
      }
}


const condition = authUser => !!authUser;

export default compose(
  withAuthorization(condition),
)(Datalist);
