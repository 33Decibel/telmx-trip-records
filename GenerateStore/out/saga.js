
  import { call, put, takeEvery, all, fork } from 'redux-saga/effects';
  
  import { toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
  
  // crm Redux States
  import {
    GET_ALERTS,
    GET_ALERTS_BY_ID,
    ADD_NEW_ALERTS,
    DELETE_ALERTS,
    UPDATE_ALERTS,
  } from './actionType';
  
  import {
    alertsApiResponseSuccess,
    alertsApiResponseError,
    addAlertsFail,
    addAlertsSuccess,
    deleteAlertsSuccess,
    deleteAlertsFail,
    updateAlertsSuccess,
    updateAlertsFail,
  } from './action';
  
  //Include Both Helper File with needed methods
  import {
    getAlerts as getAlertsApi,
    getAlertsById as getAlertsByIdApi,
    addNewAlerts,
    deleteAlerts,
    updateAlerts,
  } from '@helpers/backend_helper';
  
  function* getAlerts({ payload: data }) {
    try {
      const response = yield call(getAlertsApi, data);
  
      yield put(alertsApiResponseSuccess(GET_ALERTS, response));
    } catch (error) {
      yield put(alertsApiResponseError(GET_ALERTS, error));
    }
  }
  
  function* getAlertsById({ payload: id }) {
    try {
      const response = yield call(getAlertsByIdApi, id);
      yield put(alertsApiResponseSuccess(GET_ALERTS_BY_ID, response.data));
    } catch (error) {
      yield put(alertsApiResponseError(GET_ALERTS_BY_ID, error));
    }
  }
  
  function* onAddNewAlerts({ payload: alerts }) {
    try {
      const response = yield call(addNewAlerts, {
        collectionName: 'alertss',
        action: 'INSERT',
        data: alerts,
      });
      yield put(addAlertsSuccess(alerts));
      toast.success('Alerts Added Successfully', { autoClose: 3000 });
    } catch (error) {
      yield put(addAlertsFail(error));
      toast.error('Alerts Added Failed', { autoClose: 3000 });
    }
  }
  
  function* onDeleteAlerts({ payload: alerts }) {
    try {
      const response = yield call(deleteAlerts, alerts);
      yield put(deleteAlertsSuccess(response));
      toast.success('Alerts Deleted Successfully', { autoClose: 3000 });
    } catch (error) {
      yield put(deleteAlertsFail(error));
      toast.error('Alerts Deleted Failed', { autoClose: 3000 });
    }
  }
  
  function* onUpdateAlerts({ payload: alerts }) {
    try {
      const response = yield call(updateAlerts, alerts);
      yield put(updateAlertsSuccess(response));
      toast.success('Alerts Updated Successfully', { autoClose: 3000 });
    } catch (error) {
      yield put(updateAlertsFail(error));
      toast.error('Alerts Updated Failed', { autoClose: 3000 });
    }
  }
  
  export function* watchGetAlerts() {
    yield takeEvery(GET_ALERTS, getAlerts);
  }
  
  export function* watchGetAlertsById() {
    yield takeEvery(GET_ALERTS_BY_ID, getAlertsById);
  }
  
  export function* watchAddNewAlerts() {
    yield takeEvery(ADD_NEW_ALERTS, onAddNewAlerts);
  }
  export function* watchDeleteAlerts() {
    yield takeEvery(DELETE_ALERTS, onDeleteAlerts);
  }
  
  export function* watchUpdateAlerts() {
    yield takeEvery(UPDATE_ALERTS, onUpdateAlerts);
  }
  
  function* AlertsSaga() {
    yield all([
      fork(watchGetAlerts),
      fork(watchGetAlertsById),
      fork(watchAddNewAlerts),
      fork(watchDeleteAlerts),
      fork(watchUpdateAlerts),
    ]);
  }
  
  export default AlertsSaga;
  