import { takeEvery, fork, put, all, call } from 'redux-saga/effects';

// Login Redux States
import { FORGET_PASSWORD } from './actionTypes';
import { userForgetPasswordSuccess, userForgetPasswordError } from './actions';

//Include Both Helper File with needed methods
import {
  postFakeForgetPwd,
  postJwtForgetPwd,
} from '../../../helpers/backend_helper';

//If user is send successfully send mail link then dispatch redux action's are directly from here.
function* forgetUser({ payload: { user, history } }) {
  try {
    if (process.env.REACT_APP_DEFAULTAUTH === 'jwt') {
      const response = yield call(postJwtForgetPwd, '/jwt-forget-pwd', {
        email: user.email,
      });
      if (response) {
        yield put(
          userForgetPasswordSuccess(
            'Reset link are sended to your mailbox, check there first'
          )
        );
      }
    }
  } catch (error) {
    yield put(userForgetPasswordError(error));
  }
}

export function* watchUserPasswordForget() {
  yield takeEvery(FORGET_PASSWORD, forgetUser);
}

function* forgetPasswordSaga() {
  yield all([fork(watchUserPasswordForget)]);
}

export default forgetPasswordSaga;
