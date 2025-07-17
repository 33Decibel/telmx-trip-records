import { combineReducers } from 'redux';

// Front
import Layout from './layouts/reducer';

// Authentication
import Login from './auth/login/reducer';
import ForgetPassword from './auth/forgetpwd/reducer';

//********************  Portal ******************** //

//dynamicForm
// import DynamicForm from './dynamicForm/reducer';

// Supports
import Supports from './supports/reducer';

const rootReducer = combineReducers({
  // public
  Layout,
  Login,
  ForgetPassword,
  // DynamicForm,
  Supports,
});

export default rootReducer;
