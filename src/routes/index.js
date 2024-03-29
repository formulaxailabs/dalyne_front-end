import React, {useContext} from 'react';
import { Switch, Route, Redirect } from 'react-router';
import { useLocation } from 'react-router-dom';
import {isEmpty} from 'lodash';
import Login from './../components/Login';
import Signup from './../components/Signup';
import Dashboard from './../components/Dashboard';
import Profile from './../components/Profile';
import ChangePassword from './../components/Profile/change-password';
import Search from './../components/Search';
import User from './../components/User';
import Home from './../components/Home';
import Header from './../components/common/Header';
import Sidebar from './../components/common/Sidebar';
import userContext from '../user-context';
import {
  Container
} from 'reactstrap';

export const routes = [{
    path: '/',
    exact: true,
    component: Home
  }, {
    path: '/login',
    component: Login,
    
  }, {
    path: '/signup',
    component: Signup,
    
  }
];

export const privateRoutes = [{
  path: '/dashboard',
  component: Dashboard
},
{
  path: '/profile',
  component: Profile
},
{
  path: '/change-password',
  component: ChangePassword
},
{
  path: '/user',
  component: User
},
{
  path: '/search',
  component: Search
}
];

export default function Router() {
  let {userData}    = useContext(userContext);
  let location      = useLocation();
  let currentPage   = (location.pathname || '').split('/')[1];
  let noHeaderPages = ['', 'login', 'forgot-password', 'signup'];

  return (    
    (!!userData) ?
    <React.Fragment>
      {
        (!noHeaderPages.includes(currentPage)) ? 
        <Header user={userData} currentPage={currentPage}/>
        : null
      }
      <Container fluid className="p-0 section_wrap" >
        {
          (!noHeaderPages.includes(currentPage)) ? <Sidebar user={userData} currentPage={currentPage}/> : null
        }
        <Switch>
          {privateRoutes.map((route) => (
            <PrivateRoute key={route.path} path={route.path} component={route.component} userData={userData} />
          ))}
          {routes.map(route => (
            <Route key={`index ${route.path}`} {...route} />
          ))}
        </Switch>
      </Container>
    </ React.Fragment>
    : null
  );
}

function PrivateRoute({ component: Component, ...rest }) {
  let obj       = { component: Component, ...rest };
  let user      = obj.userData;
  if(!isEmpty(user)) {
    return (
      <Route key={obj.path} path={obj.path} component={() => <obj.component userData={user} />} />
    )
  } else {
    //console.log('Unauthorised');
    return (
      <Redirect
        to={{
          pathname: "/login"
        }}
      />
    )
  }
}