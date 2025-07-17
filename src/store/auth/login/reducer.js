import { getLoggedinUser } from '../../../helpers/api_helper';
import {
  LOGIN_USER,
  LOGIN_SUCCESS,
  LOGOUT_USER,
  LOGOUT_USER_SUCCESS,
  API_ERROR,
  RESET_LOGIN_FLAG,
  UPDATE_ROUTE_INFO,
  UPDATE_USER_BRANCH,
  BULKUPLOAD_UPDATE_AVAILABLEROUTES,
  GET_USER_INVITE_INFO_SUCCESS,
  REGISTER_PORTAL_ADMIN,
  REGISTER_PORTAL_ADMIN_SUCCESS,
  UPDATE_BRANCH_STATUS_SUCCESS,
  RESET_ADD_UPDATE_NEW_PORTAL,
  RESET_ADD_UPDATE_NEW_PORTALS,
} from './actionTypes';

const userProfileSession = getLoggedinUser();

const initialState = {
  errorMsg: '',
  loading: false,
  error: false,
  user: userProfileSession
    ? userProfileSession
    : {
        _id: '',
        username: '',
        email: '',
        roles: [],
        role: '',
        accessToken: '',
      },
  isLoginUserRequested: false,
  invitedUserInfo: null,
  adminRegisterStatus: null,
  isBranchStatusUpdatedSuccess: false,
};

const login = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER:
      state = {
        ...state,
        loading: true,
        error: false,
      };
      break;
    case LOGIN_SUCCESS:
      action.payload.history('/');
      state = {
        ...state,
        loading: false,
        error: false,
        user: action.payload.user,
      };
      break;
    case LOGOUT_USER:
      state = { ...state, isUserLogout: false };
      break;
    case LOGOUT_USER_SUCCESS:
      state = {
        ...state,
        user: {
          _id: '',
          username: '',
          email: '',
          roles: [],
          accessToken: '',
          role: '',
        },
        isUserLogout: true,
      };
      break;
    case API_ERROR:
      state = {
        ...state,
        errorMsg: action.payload,
        loading: true,
        error: true,
        isUserLogout: false,
      };
      break;
    case RESET_LOGIN_FLAG:
      state = {
        ...state,
        errorMsg: null,
        loading: false,
        error: false,
      };
      break;

    case GET_USER_INVITE_INFO_SUCCESS:
      state = {
        ...state,
        invitedUserInfo: action.payload,
      };
      break;

    case REGISTER_PORTAL_ADMIN:
      state = {
        ...state,
        adminRegisterCalled: true,
      };
      break;

    case REGISTER_PORTAL_ADMIN_SUCCESS:
      state = {
        ...state,
        adminRegisterStatus: action.payload,
        adminRegisterCalled: false,
      };
      break;

    case UPDATE_ROUTE_INFO: {
      const index0 = state.user.availableRoutes.findIndex(
        (item) => item.route === action.payload.routeToUpdate[0].route
      );
      const index1 = state.user.availableRoutes.findIndex(
        (item) => item.route === action.payload.routeToUpdate[1].route
      );
      let tmpRouts = [...state.user.availableRoutes];
      tmpRouts[index0] = action.payload.routeToUpdate[0];
      tmpRouts[index1] = {
        ...tmpRouts[index1],
        status: action.payload.routeToUpdate[1].status,
      };

      state = {
        ...state,
        user: {
          ...state.user,
          fallbackRoute: action.payload.routeToUpdate[1].route,
          availableRoutes: tmpRouts,
        },
      };

      const res = localStorage.setItem('authUser', JSON.stringify(state.user));
      action.payload.history(action.payload.routeToUpdate[1].route);

      break;
    }

    case UPDATE_USER_BRANCH: {
      return {
        ...state,
        user: {
          ...state.user,
          branch: {
            _id: action.payload._id,
            name: action.payload.name,
            companyName: action.payload.companyName,
            branchLogo: action.payload.branchLogo,
            status: action.payload.status,
          },
        },
      };
    }

    case BULKUPLOAD_UPDATE_AVAILABLEROUTES: {
      const user = localStorage.getItem('authUser');
      if (user) {
        const updatedUser = { ...state.user, availableRoutes: action.payload };
        localStorage.setItem('authUser', JSON.stringify(updatedUser));
        return {
          ...state,
          user: updatedUser,
        };
      }
      break;
    }

    case UPDATE_BRANCH_STATUS_SUCCESS:
      return {
        ...state,
        user: {
          ...state.user,
          isBranchStatusUpdatedSuccess: true,
        },
      };

    default:
      state = { ...state };
      break;
  }
  return state;
};

export default login;
