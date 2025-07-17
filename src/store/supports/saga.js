import { call, put, takeEvery, all, fork, delay } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {
  GET_TICKETS_CATEGORY_GROUPS,
  ADD_NEW_TICKETS_CATEGORY_GROUP,
  UPDATE_TICKETS_CATEGORY_GROUP,
  DELETE_TICKETS_CATEGORY_GROUP,
} from './actionType';

import {
  ticketsCategoryGroupApiResponseSuccess,
  ticketsCategoryGroupApiResponseError,
  addTicketsCategoryGroupSuccess,
  addTicketsCategoryGroupFail,
  deleteTicketsCategoryGroupSuccess,
  deleteTicketsCategoryGroupFail,
  updateTicketsCategoryGroupSuccess,
  updateTicketsCategoryGroupFail,
  resetAddUpdateTicketsCategoryGroup,
} from './action';

import {
  getAllCategoryGroups as getTicketsCategoryGroupsApi,
  createCategoryGroup as addNewTicketsCategoryGroupApi,
  updateCategoryGroup as updateTicketsCategoryGroupApi,
  deleteCategoryGroup as deleteTicketsCategoryGroupApi,
} from '../../helpers/backend_helper';

function* fetchTicketsCategoryGroups() {
  try {
    const response = yield call(getTicketsCategoryGroupsApi);
    yield put(
      ticketsCategoryGroupApiResponseSuccess(
        GET_TICKETS_CATEGORY_GROUPS,
        response
      )
    );
  } catch (error) {
    toast.error(`Loading Ticket Category Groups Failed: ${error}`, {
      autoClose: 3000,
    });
    yield put(
      ticketsCategoryGroupApiResponseError(GET_TICKETS_CATEGORY_GROUPS, error)
    );
  }
}

function* onAddNewTicketsCategoryGroup({ payload: group }) {
  try {
    const response = yield call(addNewTicketsCategoryGroupApi, group);
    yield put(addTicketsCategoryGroupSuccess(response));
    toast.success('Ticket Category Group Added Successfully', {
      autoClose: 3000,
    });
    yield delay(500);
    yield put(resetAddUpdateTicketsCategoryGroup());
  } catch (error) {
    yield put(addTicketsCategoryGroupFail(error));
    toast.error('Ticket Category Group Added Failed', { autoClose: 3000 });
  }
}

function* onUpdateTicketsCategoryGroup({ payload: group }) {
  try {
    const response = yield call(updateTicketsCategoryGroupApi, group);
    yield put(updateTicketsCategoryGroupSuccess(response));
    toast.success('Ticket Category Group Updated Successfully', {
      autoClose: 3000,
    });
    yield delay(500);
    yield put(resetAddUpdateTicketsCategoryGroup());
  } catch (error) {
    yield put(updateTicketsCategoryGroupFail(error));
    toast.error('Ticket Category Group Updated Failed', { autoClose: 3000 });
  }
}

function* onDeleteTicketsCategoryGroup({ payload: group }) {
  try {
    const response = yield call(deleteTicketsCategoryGroupApi, group);
    yield put(deleteTicketsCategoryGroupSuccess(response));
    toast.success('Ticket Category Group Deleted Successfully', {
      autoClose: 3000,
    });
  } catch (error) {
    yield put(deleteTicketsCategoryGroupFail(error));
    toast.error('Ticket Category Group Deleted Failed', { autoClose: 3000 });
  }
}

export function* watchFetchTicketsCategoryGroups() {
  yield takeEvery(GET_TICKETS_CATEGORY_GROUPS, fetchTicketsCategoryGroups);
}

export function* watchAddNewTicketsCategoryGroup() {
  yield takeEvery(ADD_NEW_TICKETS_CATEGORY_GROUP, onAddNewTicketsCategoryGroup);
}

export function* watchUpdateTicketsCategoryGroup() {
  yield takeEvery(UPDATE_TICKETS_CATEGORY_GROUP, onUpdateTicketsCategoryGroup);
}

export function* watchDeleteTicketsCategoryGroup() {
  yield takeEvery(DELETE_TICKETS_CATEGORY_GROUP, onDeleteTicketsCategoryGroup);
}

function* TicketsCategoryGroupSaga() {
  yield all([
    fork(watchFetchTicketsCategoryGroups),
    fork(watchAddNewTicketsCategoryGroup),
    fork(watchUpdateTicketsCategoryGroup),
    fork(watchDeleteTicketsCategoryGroup),
  ]);
}

export default TicketsCategoryGroupSaga;
