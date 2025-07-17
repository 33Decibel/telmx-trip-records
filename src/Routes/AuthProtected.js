import React, { useEffect } from 'react';
import { Navigate, Route, useLocation, matchPath } from 'react-router-dom';
import { setAuthorization, getLoggedinUser } from '../helpers/api_helper';
import { useDispatch } from 'react-redux';
import { useProfile } from '../Components/Hooks/UserHooks';
import { logoutUser } from '../store/actions';

//routes
import { authProtectedRoutes, blankLayoutRoutes } from './allRoutes';

const AuthProtected = (props) => {
  const location = useLocation();
  const dispatch = useDispatch();

  const { loading, token } = useProfile();
  const userProfile = getLoggedinUser();

  // Logout user is token is not avaialbel
  useEffect(() => {
    if (userProfile && !loading && token) {
      setAuthorization(userProfile);
    } else if (!userProfile && loading && !token) {
      dispatch(logoutUser());
    }
  }, [token, userProfile, loading, dispatch]);

  const pathname = location.pathname;
  const isInAuthPaths = authProtectedRoutes.find((route) =>
    matchPath({ path: route.path, exact: true }, pathname)
  );
  const isInBlankPath = blankLayoutRoutes.find((route) =>
    matchPath({ path: route.path, exact: true }, pathname)
  );

  if (userProfile) {
    if (
      !userProfile.appName ||
      userProfile.appName !== process.env.REACT_APP_NAME_VERSION
    ) {
      return <Navigate to='/logout' />;
    }
    if (
      (isInAuthPaths && isInAuthPaths.path !== '*') ||
      (isInBlankPath && isInBlankPath.path !== '*')
    ) {
      let isNotValidPath = false;
      if (isInAuthPaths && isInAuthPaths.path !== '*')
        isNotValidPath = userProfile.availableRoutes.find(
          (node) => node.route === isInAuthPaths.path
        );
      if (isInBlankPath && isInBlankPath.path !== '*')
        isNotValidPath = userProfile.availableRoutes.find(
          (node) => node.route === isInBlankPath.path
        );

      if (!isNotValidPath)
        return <Navigate to={{ pathname: userProfile.fallbackRoute }} />;
    }
  }

  if (!userProfile && loading && !token) {
    return (
      <Navigate to={{ pathname: '/login', state: { from: props.location } }} />
    );
  }

  <Navigate to={{ pathname: userProfile.fallbackRoute }} />;
  // if (userProfile.branch.status === 'SETUP') {
  //   const requestedRoute = location.pathname;
  //   const isRouteAvailabel = userProfile.availableRoutes.find((item) => {
  //     if (item.route.indexOf(':') > -1) {
  //       if (requestedRoute.indexOf(item.route.split(':')[0]) === 0) return true;
  //     }
  //     if (item.route === requestedRoute) return true;
  //     return false;
  //   });
  //   if (!isRouteAvailabel || !isRouteAvailabel.status) {
  //     return <Navigate to={{ pathname: userProfile.fallbackRoute }} />;
  //   }
  // }

  return <>{props.children}</>;
};

const AccessRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        return (
          <>
            <Component {...props} />
          </>
        );
      }}
    />
  );
};

export { AuthProtected, AccessRoute };
