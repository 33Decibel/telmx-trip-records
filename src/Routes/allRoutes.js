import React from 'react';
import { Navigate } from 'react-router-dom';
import Login from '../pages/Authentication/Login';
import ForgetPasswordPage from '../pages/Authentication/ForgetPassword';
import Logout from '../pages/Authentication/Logout';
import TrackerPage from '../pages/Tracker';

const authProtectedRoutes = [
  { path: '/', component: <TrackerPage /> }, // ✅ moved here
  { path: '*', component: <Navigate to='/' /> },
];

const blankLayoutRoutes = [];

const publicRoutes = [
  { path: '/logout', component: <Logout /> },
  { path: '/login', component: <Login /> },
  { path: '/forgot-password', component: <ForgetPasswordPage /> },
];

export { authProtectedRoutes, publicRoutes, blankLayoutRoutes };
