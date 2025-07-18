import React from 'react';
import { Routes, Route } from 'react-router-dom';

//Layouts
import NonAuthLayout from '../Layouts/NonAuthLayout';
import AdminLayout from '../Layouts/index';
// import BlankLayout from '../Layouts/BlankLayout';

//routes
import {
  authProtectedRoutes,
  publicRoutes,
  blankLayoutRoutes,
} from './allRoutes';

import { AuthProtected } from './AuthProtected';

const Index = () => {
  return (
    <React.Fragment>
      <Routes>
        <Route>
          {publicRoutes.map((route, idx) => (
            <Route
              path={route.path}
              element={<NonAuthLayout>{route.component}</NonAuthLayout>}
              key={idx}
              exact={true}
            />
          ))}
        </Route>
        

        <Route>
          {authProtectedRoutes.map((route, idx) => (
            <Route
              path={route.path}
              element={
                <AuthProtected>
                  <AdminLayout>{route.component}</AdminLayout>
                </AuthProtected>
              }
              key={idx}
              exact={true}
            />
          ))}
        </Route>

        <Route>
          {blankLayoutRoutes.map((route, idx) => (
            <Route
              path={route.path}
              element={
                <AuthProtected>
                  {/* <BlankLayout>{route.component}</BlankLayout> */}
                </AuthProtected>
              }
              key={idx}
              exact={true}
            />
          ))}
        </Route>
      </Routes>
    </React.Fragment>
  );
};

export default Index;
