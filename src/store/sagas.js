import { all, fork } from 'redux-saga/effects';

//layout
import LayoutSaga from './layouts/saga';

//Auth
import AuthSaga from './auth/login/saga';
import ForgetSaga from './auth/forgetpwd/saga';


// Report
import SupportsSaga from './supports/saga';

export default function* rootSaga() {
  yield all([
    //public

    fork(LayoutSaga),
    fork(AuthSaga),
    fork(ForgetSaga),
    fork(SupportsSaga),
  ]);
}
