import { Component } from 'react';
import { compose } from 'recompose';
import { dba } from '../Firebase/firebase';
import { withAuthorization } from '../Session';

/*const HomePage = () => (
  <div>
    <h1>Home Page</h1>
    <p>The Home Page is accessible by every signed in user.</p>
  </div>
);
*/

class HomePage extends Component{
  constructor(props){
    super(props);
    this.state ={
      loading: false,
      data: [],
    };
  }
  componentDidMount() {
    this.setState({ loading: true });

    dba.collection("recipes").where("flag","==",1)
    .get()
    .then(querySnapshot => {
    const data = querySnapshot.docs.map(doc => doc.data());
    console.log(data);


      this.setState({
        data: data  ,
        loading: false,
      });
    });
  }
  render() {
    const { data, loading } = this.state;

    return (
      <div>
        <h2>Posts</h2>
        {loading && <div>Loading ...</div>}
        <table Border='true'>
          <tr>
            <th>Recipe</th>
            <th>Requirments</th>
            <th>Method</th>
          </tr>
          {data.map(doc => (
            <tr key={doc.recipe}>
                <td>{doc.recipe}</td>
                <td>{doc.requirments}</td>
                <td>{doc.method}</td>
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
)(HomePage);
