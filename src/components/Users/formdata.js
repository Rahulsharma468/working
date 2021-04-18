import React from 'react';
import { dba } from '../Firebase/firebase';
import { withFirebase } from '../Firebase';


class formdata extends React.Component{
    render(){
        return(
            <p>ello</p>
        )
    }
}

export default withFirebase(formdata);