import { call, put, takeEvery, all, fork } from 'redux-saga/effects';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// crm Redux States
import {
  GET_CLIENTS,
  GET_CLIENT_BY_ID,
  ADD_NEW_CLIENT,
  DELETE_CLIENT,
  UPDATE_CLIENT,
} from './actionType';

import {
  clientApiResponseSuccess,
  clientApiResponseError,
  addClientFail,
  addClientSuccess,
  deleteClientSuccess,
  deleteClientFail,
  updateClientSuccess,
  updateClientFail,
} from './action';

//Include Both Helper File with needed methods
import {
  getMRecords,
  getClientById as getClientByIdApi,
  addNewClient,
  deleteClient,
  updateClient,
} from '@helpers/backend_helper';

function* getClient({ payload: data }) {
  try {
    const response = yield call(getMRecords, data);

    yield put(clientApiResponseSuccess(GET_CLIENTS, response));
  } catch (error) {
    yield put(clientApiResponseError(GET_CLIENTS, error));
  }
}

function* getClientById({ payload: id }) {
  try {
    const response = yield call(getClientByIdApi, id);
    yield put(clientApiResponseSuccess(GET_CLIENT_BY_ID, response.data));
  } catch (error) {
    yield put(clientApiResponseError(GET_CLIENT_BY_ID, error));
  }
}

function* onAddNewClient({ payload: client }) {
  try {
    const response = yield call(getMRecords, {
      collectionName: 'clients',
      action: 'INSERT',
      data: client,
    });
    yield put(addClientSuccess(response));
    toast.success('Client Added Successfully', { autoClose: 3000 });
  } catch (error) {
    yield put(addClientFail(error));
    toast.error('Client Added Failed', { autoClose: 3000 });
  }
}

function* onDeleteClient({ payload: client }) {
  try {
    const response = yield call(deleteClient, client);
    yield put(deleteClientSuccess(response));
    toast.success('Client Deleted Successfully', { autoClose: 3000 });
  } catch (error) {
    yield put(deleteClientFail(error));
    toast.error('Client Deleted Failed', { autoClose: 3000 });
  }
}

function* onUpdateClient({ payload: client }) {
  try {
    const response = yield call(updateClient, client);
    yield put(updateClientSuccess(response));
    toast.success('Client Updated Successfully', { autoClose: 3000 });
  } catch (error) {
    yield put(updateClientFail(error));
    toast.error('Client Updated Failed', { autoClose: 3000 });
  }
}

export function* watchGetClient() {
  yield takeEvery(GET_CLIENTS, getClient);
}

export function* watchGetClientById() {
  yield takeEvery(GET_CLIENT_BY_ID, getClientById);
}

export function* watchAddNewClient() {
  yield takeEvery(ADD_NEW_CLIENT, onAddNewClient);
}
export function* watchDeleteClient() {
  yield takeEvery(DELETE_CLIENT, onDeleteClient);
}

export function* watchUpdateClient() {
  yield takeEvery(UPDATE_CLIENT, onUpdateClient);
}

function* ClientSaga() {
  yield all([
    fork(watchGetClient),
    fork(watchGetClientById),
    fork(watchAddNewClient),
    fork(watchDeleteClient),
    fork(watchUpdateClient),
  ]);
}

export default ClientSaga;
