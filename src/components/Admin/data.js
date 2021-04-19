import React from "react";
import { compose } from 'recompose';
import { withAuthorization } from '../Session';
import * as ROLES from '../../constants/roles';

class data extends React.Component{
    render(){
        return(
            <p>Helllo</p>
        )
    }
}

const condition = authUser =>
  !!authUser && authUser.roles[ROLES.ADMIN];

export default compose(
    withAuthorization(condition),
)(data);
  