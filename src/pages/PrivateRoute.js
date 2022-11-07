import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

const PrivateRoute = ({ children }) => { //...rest is a parameter that we named to get all the parameters from the exact path
  // console.log(children);

  const { user } = useAuth0();
  if(!user) {
    return <Navigate to='/' />
  }
  return children;
};

export default PrivateRoute;
