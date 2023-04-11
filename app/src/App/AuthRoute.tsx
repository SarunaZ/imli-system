import React from 'react';
import { AuthenticationProvider } from 'Providers/Authentication/Authentication';
import { useContext } from 'react';
import { Route, Navigate, IndexRouteProps } from 'react-router-dom';
import { ROUTE_LOGIN_PAGE } from './constants';
import Layout from 'HOC/withLayout';

interface Props {
  children?: JSX.Element
}

const AuthRoute = ({
  children,
}: React.PropsWithChildren<Props>): JSX.Element => {
  const { isLoggedIn } = useContext(AuthenticationProvider);
console.log(isLoggedIn, 'isLoggedIn');

  if (isLoggedIn) {
    // return <Layout><Route {...rest} /></Layout>;
    return children
  }

  return <Navigate to={ROUTE_LOGIN_PAGE} />;
};

export default AuthRoute;