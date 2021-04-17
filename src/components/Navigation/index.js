import React from 'react';
import { Link } from 'react-router-dom';
import './style.css';
import { AuthUserContext } from '../Session';
import SignOutButton from '../SignOut';
import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';

const Navigation = () => (
  <AuthUserContext.Consumer>
    {authUser =>
      authUser ? (
        <NavigationAuth authUser={authUser} />
      ) : (
        <NavigationNonAuth />
      )
    }
  </AuthUserContext.Consumer>
);

const NavigationAuth = ({ authUser }) => (
 <div className="mainnav">
    <ul>
      <li>
      <button className="btn"><Link style={{textDecoration:"none"}} to={ROUTES.LANDING}>Landing</Link></button>
      </li>
      <li>
      <button className="btn"><Link style={{textDecoration:"none"}} to={ROUTES.HOME}>Home</Link></button>
      </li>
      <li>
      <button className="btn"><Link style={{textDecoration:"none"}} to={ROUTES.ACCOUNT}>Account</Link></button>
      </li>
      <li>
      <button className="btn"><Link style={{textDecoration:"none"}} to={ROUTES.POST_FORM}>POST</Link></button>
      </li>
      {!authUser.roles[ROLES.ADMIN] && (
        <li>
          <button className="btn"><Link style={{textDecoration:"none"}} to={ROUTES.ADMIN}>Admin</Link></button>
        </li>
      )}
      <button><SignOutButton /></button>
  </ul>
 </div>
);

const NavigationNonAuth = () => (
  <div className="mainnav">
    <ul>
      <li>
        <button className="btn"><Link style={{textDecoration:"none"}} to={ROUTES.LANDING}>Landing</Link></button>
      </li>
      <li>
        <button className="btn"><Link style={{textDecoration:"none"}} to={ROUTES.SIGN_IN}>Sign In</Link></button>
      </li>
    </ul>
  </div>
);


export default Navigation;
