import { call, put, takeEvery, delay } from 'redux-saga/effects';

// Login Redux States
import {
  LOGIN_USER,
  LOGOUT_USER,
  UPDATE_ROUTE_INFO,
  BULKUPLOAD_RESET_ALL,
  GET_USER_INVITE_INFO,
  REGISTER_PORTAL_ADMIN,
  UPDATE_BRANCH_STATUS,
  GET_USER_PROFILE,
} from './actionTypes';
import {
  apiError,
  loginSuccess,
  logoutUserSuccess,
  getUserInviteInfoSuccess,
  registerPortalAdminSuccess,
  updateBranchStatusSuccess,
} from './actions';

//Include Both Helper File with needed methods
// import { getFirebaseBackend } from '../../../helpers/firebase_helper';
import {
  postJwtLogin,
  updateRouteInfo as updateRouteInfoAPI,
  updateLoginUser,
  getUserInviteInfo as getUserInviteInfoAPI,
  registerPortalAdmin as registerPortalAdminAPI,
  updateBranchStatus as updateBranchStatusAPI,
} from '../../../helpers/backend_helper';
import { setAuthorization } from '../../../helpers/api_helper';
import { setAuthorizationAPI2 } from '../../../helpers/api2_helper';
import { routes } from './metaData';

// function* loginUser({ payload: { user, history } }) {
//   try {
//     if (process.env.REACT_APP_DEFAULTAUTH === 'jwt') {
//       const response = fakeUsers.find(
//         (u) => u.username === user.username && u.password === user.password
//       );

//       if (response) {
//         localStorage.setItem('authUser', JSON.stringify(response));
//         setAuthorization(response);
//         setAuthorizationAPI2(response);
//         yield put(loginSuccess(response, history));
//         // yield put(
//         //   getPortalConfiguration({
//         //     portalId: response.portalId,
//         //     branchId: response.branchId,
//         //   })
//         // );
//       } else {
//         yield put(apiError('Invalid username or password'));
//       }
//     }
//   } catch (error) {
//     yield put(apiError(error));
//   }
// }

function* loginUser({ payload: { user, history } }) {
  try {
    if (process.env.REACT_APP_DEFAULTAUTH === 'jwt') {
      let response = yield call(postJwtLogin, {
        email: user.username,
        password: user.password,
      });

      response = { ...response, ...routes };

      if (response) {
        localStorage.setItem('authUser', JSON.stringify(response));
        setAuthorization(response);
        setAuthorizationAPI2(response);
        yield put(loginSuccess(response, history));
        // yield put(
        //   getPortalConfiguration({
        //     portalId: response.portalId,
        //     branchId: response.branchId,
        //   })
        // );
      } else {
        yield put(apiError(response));
      }
    }
  } catch (error) {
    yield put(apiError(error));
  }
}

function* updateRouteInfo({ payload: { routeToUpdate, history, branchId } }) {
  yield call(updateRouteInfoAPI, {
    routeInfo: routeToUpdate[0],
    updateCompleted: true,
    branchId,
  });
  yield call(updateRouteInfoAPI, {
    routeInfo: routeToUpdate[1],
    updateCompleted: false,
    branchId,
  });
}

function* getUserInviteInfo({ payload: inviteId }) {
  try {
    const response = yield call(getUserInviteInfoAPI, inviteId);
    yield put(getUserInviteInfoSuccess(response));
  } catch (error) {
    yield put(apiError(error));
  }
}

function* registerPortalAdmin({ payload }) {
  try {
    const response = yield call(registerPortalAdminAPI, payload);
    yield put(registerPortalAdminSuccess(response));
  } catch (error) {
    yield put(apiError(error));
  }
}

function* logoutUser() {
  try {
    localStorage.clear();
    yield put(logoutUserSuccess());
    localStorage.clear();
  } catch (error) {
    yield put(apiError(LOGOUT_USER, error));
  }
}

function* updateBranchStatus({ payload: data }) {
  const response = yield call(updateBranchStatusAPI, data);
  yield put(updateBranchStatusSuccess(response));
  // yield put(updatePortalSuccess(response));
  // yield delay(500);
}

function* authSaga() {
  yield takeEvery(LOGIN_USER, loginUser);
  yield takeEvery(LOGOUT_USER, logoutUser);
  yield takeEvery(UPDATE_ROUTE_INFO, updateRouteInfo);
  yield takeEvery(GET_USER_INVITE_INFO, getUserInviteInfo);
  yield takeEvery(REGISTER_PORTAL_ADMIN, registerPortalAdmin);
  yield takeEvery(UPDATE_BRANCH_STATUS, updateBranchStatus);
}

export default authSaga;
