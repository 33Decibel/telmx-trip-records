import { call, put, takeEvery, all, fork } from 'redux-saga/effects';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// crm Redux States
import {
  GET_HELP,
  GET_HELP_BY_ID,
  ADD_NEW_HELP,
  DELETE_HELP,
  UPDATE_HELP,
} from './actionType';

import {
  helpApiResponseSuccess,
  helpApiResponseError,
  addHelpFail,
  addHelpSuccess,
  deleteHelpSuccess,
  deleteHelpFail,
  updateHelpSuccess,
  updateHelpFail,
} from './action';

//Include Both Helper File with needed methods
import {
  getHelp as getHelpApi,
  getHelpById as getHelpByIdApi,
  addNewHelp,
  deleteHelp,
  updateHelp,
} from '@helpers/backend_helper';

function* getHelp({ payload: data }) {
  try {
    const response = yield call(getHelpApi, data);

    yield put(helpApiResponseSuccess(GET_HELP, response));
  } catch (error) {
    yield put(helpApiResponseError(GET_HELP, error));
  }
}

function* getHelpById({ payload: id }) {
  try {
    const response = yield call(getHelpByIdApi, id);
    yield put(helpApiResponseSuccess(GET_HELP_BY_ID, response.data));
  } catch (error) {
    yield put(helpApiResponseError(GET_HELP_BY_ID, error));
  }
}

function* onAddNewHelp({ payload: help }) {
  try {
    const response = yield call(addNewHelp, {
      collectionName: 'helps',
      action: 'INSERT',
      data: help,
    });
    yield put(addHelpSuccess(help));
    toast.success('Help Added Successfully', { autoClose: 3000 });
  } catch (error) {
    yield put(addHelpFail(error));
    toast.error('Help Added Failed', { autoClose: 3000 });
  }
}

function* onDeleteHelp({ payload: help }) {
  try {
    const response = yield call(deleteHelp, help);
    yield put(deleteHelpSuccess(response));
    toast.success('Help Deleted Successfully', { autoClose: 3000 });
  } catch (error) {
    yield put(deleteHelpFail(error));
    toast.error('Help Deleted Failed', { autoClose: 3000 });
  }
}

function* onUpdateHelp({ payload: help }) {
  try {
    const response = yield call(updateHelp, help);
    yield put(updateHelpSuccess(response));
    toast.success('Help Updated Successfully', { autoClose: 3000 });
  } catch (error) {
    yield put(updateHelpFail(error));
    toast.error('Help Updated Failed', { autoClose: 3000 });
  }
}

export function* watchGetHelp() {
  yield takeEvery(GET_HELP, getHelp);
}

export function* watchGetHelpById() {
  yield takeEvery(GET_HELP_BY_ID, getHelpById);
}

export function* watchAddNewHelp() {
  yield takeEvery(ADD_NEW_HELP, onAddNewHelp);
}
export function* watchDeleteHelp() {
  yield takeEvery(DELETE_HELP, onDeleteHelp);
}

export function* watchUpdateHelp() {
  yield takeEvery(UPDATE_HELP, onUpdateHelp);
}

function* HelpSaga() {
  yield all([
    fork(watchGetHelp),
    fork(watchGetHelpById),
    fork(watchAddNewHelp),
    fork(watchDeleteHelp),
    fork(watchUpdateHelp),
  ]);
}

export default HelpSaga;
