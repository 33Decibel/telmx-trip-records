import {
  LOGIN_USER,
  LOGIN_SUCCESS,
  LOGOUT_USER,
  LOGOUT_USER_SUCCESS,
  API_ERROR,
  SOCIAL_LOGIN,
  RESET_LOGIN_FLAG,
  UPDATE_ROUTE_INFO,
  UPDATE_USER_BRANCH,
  BULKUPLOAD_UPDATE_AVAILABLEROUTES,
  GET_USER_INVITE_INFO,
  GET_USER_INVITE_INFO_SUCCESS,
  REGISTER_PORTAL_ADMIN,
  REGISTER_PORTAL_ADMIN_SUCCESS,
  UPDATE_BRANCH_STATUS,
  UPDATE_BRANCH_STATUS_SUCCESS,
  RESET_ADD_UPDATE_NEW_PORTAL,
  RESET_ADD_UPDATE_NEW_PORTALS,
} from './actionTypes';

export const loginUser = (user, history) => {
  return {
    type: LOGIN_USER,
    payload: { user, history },
  };
};

export const loginSuccess = (user, history) => {
  return {
    type: LOGIN_SUCCESS,
    payload: { user, history },
  };
};

export const logoutUser = (history) => {
  return {
    type: LOGOUT_USER,
    payload: { history },
  };
};

export const logoutUserSuccess = () => {
  return {
    type: LOGOUT_USER_SUCCESS,
    payload: {},
  };
};

export const apiError = (error) => {
  return {
    type: API_ERROR,
    payload: error,
  };
};

export const socialLogin = (type, history) => {
  return {
    type: SOCIAL_LOGIN,
    payload: { type, history },
  };
};

export const resetLoginFlag = () => {
  return {
    type: RESET_LOGIN_FLAG,
  };
};

export const updateRouteInfo = (routeToUpdate, history, branchId) => {
  return {
    type: UPDATE_ROUTE_INFO,
    payload: { routeToUpdate, history, branchId },
  };
};

export const updateUserBranch = (branch) => {
  return {
    type: UPDATE_USER_BRANCH,
    payload: branch,
  };
};

export const bulkuploadUpdateAvailableRoutes = (availableRoutes) => ({
  type: BULKUPLOAD_UPDATE_AVAILABLEROUTES,
  payload: availableRoutes,
});

export const getUserInviteInfo = (inviteId) => ({
  type: GET_USER_INVITE_INFO,
  payload: inviteId,
});

export const getUserInviteInfoSuccess = (data) => ({
  type: GET_USER_INVITE_INFO_SUCCESS,
  payload: data,
});

export const registerPortalAdmin = (data) => ({
  type: REGISTER_PORTAL_ADMIN,
  payload: data,
});

export const registerPortalAdminSuccess = (data) => {
  return {
    type: REGISTER_PORTAL_ADMIN_SUCCESS,
    payload: data,
  };
};

export const updateBranchStatus = (data) => {
  return {
    type: UPDATE_BRANCH_STATUS,
    payload: data,
  };
};

export const updateBranchStatusSuccess = (data) => ({
  type: UPDATE_BRANCH_STATUS_SUCCESS,
  payload: data,
});
