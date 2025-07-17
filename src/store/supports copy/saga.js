// import { call, put, takeEvery, all, fork, delay } from 'redux-saga/effects';

// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// // Tickets Redux States
// import {
//   GET_TICKETS,
//   GET_TICKET_BY_ID,
//   GET_TICKETS_BY_ASSIGNED_ID,
//   ADD_NEW_TICKET,
//   DELETE_TICKET,
//   UPDATE_TICKET,
//   ASSIGN_TICKET,
//   GET_TICKET_RESPONSES,
//   ADD_TICKET_RESPONSE,
//   UPDATE_TICKET_RESPONSE,
//   DELETE_TICKET_RESPONSE,
//   GET_TATS,
//   ADD_NEW_TAT,
//   UPDATE_TAT,
//   DELETE_TAT,
//   GET_CATEGORY_GROUPS,
//   ADD_NEW_CATEGORY_GROUP,
//   UPDATE_CATEGORY_GROUP,
//   DELETE_CATEGORY_GROUP,
//   GET_CATEGORIES,
//   ADD_NEW_CATEGORY,
//   UPDATE_CATEGORY,
//   DELETE_CATEGORY,
//   GET_DEPARTMENTS,
//   ADD_NEW_DEPARTMENT,
//   UPDATE_DEPARTMENT,
//   DELETE_DEPARTMENT,
// } from './actionType';

// import {
//   ticketApiResponseSuccess,
//   ticketApiResponseError,
//   addTicketSuccess,
//   addTicketFail,
//   deleteTicketSuccess,
//   deleteTicketFail,
//   updateTicketSuccess,
//   updateTicketFail,
//   assignTicketSuccess,
//   assignTicketFail,
//   addTicketResponseSuccess,
//   addTicketResponseFail,
//   updateTicketResponseSuccess,
//   updateTicketResponseFail,
//   deleteTicketResponseSuccess,
//   deleteTicketResponseFail,
//   addTatSuccess,
//   addTatFail,
//   updateTatSuccess,
//   updateTatFail,
//   deleteTatSuccess,
//   deleteTatFail,
//   addCategoryGroupSuccess,
//   addCategoryGroupFail,
//   updateCategoryGroupSuccess,
//   updateCategoryGroupFail,
//   deleteCategoryGroupSuccess,
//   deleteCategoryGroupFail,
//   addCategorySuccess,
//   addCategoryFail,
//   updateCategorySuccess,
//   updateCategoryFail,
//   deleteCategorySuccess,
//   deleteCategoryFail,
//   addDepartmentSuccess,
//   addDepartmentFail,
//   updateDepartmentSuccess,
//   updateDepartmentFail,
//   deleteDepartmentSuccess,
//   deleteDepartmentFail,
//   resetAddUpdateNewTicket,
// } from './action';

// //Include Both Helper File with needed methods
// import {
//   getTickets as getTicketsApi,
//   getTicketById as getTicketByIdApi,
//   getTicketsByAssignedId as getTicketsByAssignedIdApi,
//   getTicketResponses as getTicketResponsesApi,
//   addNewTicket,
//   updateTicket,
//   deleteTicket,
//   assignTicket,
//   addTicketResponse,
//   updateTicketResponse,
//   deleteTicketResponse,
//   getTats as getTatsApi,
//   addNewTat,
//   updateTat,
//   deleteTat,
//   getCategoryGroups as getCategoryGroupsApi,
//   addNewCategoryGroup,
//   updateCategoryGroup,
//   deleteCategoryGroup,
//   getCategories as getCategoriesApi,
//   addNewCategory,
//   updateCategory,
//   deleteCategory,
//   getDepartments as getDepartmentsApi,
//   addNewDepartment,
//   updateDepartment,
//   deleteDepartment,
// } from '../../helpers/backend_helper';

// // Ticket functions
// function* getTickets() {
//   try {
//     const response = yield call(getTicketsApi);
//     yield put(ticketApiResponseSuccess(GET_TICKETS, response));
//   } catch (error) {
//     toast.error(`Loading Tickets Failed: ${error}`, { autoClose: 3000 });
//     yield put(ticketApiResponseError(GET_TICKETS, error));
//   }
// }

// function* getTicketById({ payload: id }) {
//   try {
//     const response = yield call(getTicketByIdApi, id);
//     yield put(ticketApiResponseSuccess(GET_TICKET_BY_ID, response));
//   } catch (error) {
//     toast.error(`Loading Ticket Details Failed: ${error}`, { autoClose: 3000 });
//     yield put(ticketApiResponseError(GET_TICKET_BY_ID, error));
//   }
// }

// function* getTicketsByAssignedId({ payload: id }) {
//   try {
//     const response = yield call(getTicketsByAssignedIdApi, id);
//     yield put(ticketApiResponseSuccess(GET_TICKETS_BY_ASSIGNED_ID, response));
//   } catch (error) {
//     toast.error(`Loading Assigned Tickets Failed: ${error}`, { autoClose: 3000 });
//     yield put(ticketApiResponseError(GET_TICKETS_BY_ASSIGNED_ID, error));
//   }
// }

// function* getTicketResponses({ payload: ticketId }) {
//   try {
//     const response = yield call(getTicketResponsesApi, ticketId);
//     yield put(ticketApiResponseSuccess(GET_TICKET_RESPONSES, response));
//   } catch (error) {
//     toast.error(`Loading Ticket Responses Failed: ${error}`, { autoClose: 3000 });
//     yield put(ticketApiResponseError(GET_TICKET_RESPONSES, error));
//   }
// }

// function* onAddNewTicket({ payload: ticket }) {
//   try {
//     const response = yield call(addNewTicket, ticket);
//     yield put(addTicketSuccess(response));
//     toast.success('Ticket Added Successfully', { autoClose: 3000 });
//     yield delay(500);
//     yield put(resetAddUpdateNewTicket());
//   } catch (error) {
//     yield put(addTicketFail(error));
//     toast.error('Ticket Added Failed', { autoClose: 3000 });
//   }
// }

// function* onDeleteTicket({ payload: ticket }) {
//   try {
//     const response = yield call(deleteTicket, ticket);
//     yield put(deleteTicketSuccess(response));
//     toast.success('Ticket Deleted Successfully', { autoClose: 3000 });
//   } catch (error) {
//     yield put(deleteTicketFail(error));
//     toast.error('Ticket Deleted Failed', { autoClose: 3000 });
//   }
// }

// function* onUpdateTicket({ payload: ticket }) {
//   try {
//     const response = yield call(updateTicket, ticket);
//     yield put(updateTicketSuccess(response));
//     toast.success('Ticket Updated Successfully', { autoClose: 3000 });
//     yield delay(500);
//     yield put(resetAddUpdateNewTicket());
//   } catch (error) {
//     yield put(updateTicketFail(error));
//     toast.error('Ticket Updated Failed', { autoClose: 3000 });
//   }
// }

// function* onAssignTicket({ payload: { ticketId, assignedTo } }) {
//   try {
//     const response = yield call(assignTicket, ticketId, assignedTo);
//     yield put(assignTicketSuccess(response));
//     toast.success('Ticket Assigned Successfully', { autoClose: 3000 });
//     yield delay(500);
//     yield put(resetAddUpdateNewTicket());
//   } catch (error) {
//     yield put(assignTicketFail(error));
//     toast.error('Ticket Assignment Failed', { autoClose: 3000 });
//   }
// }

// // Ticket Response functions
// function* onAddTicketResponse({ payload: response }) {
//   try {
//     const apiResponse = yield call(addTicketResponse, response);
//     yield put(addTicketResponseSuccess(apiResponse));
//     toast.success('Response Added Successfully', { autoClose: 3000 });
//   } catch (error) {
//     yield put(addTicketResponseFail(error));
//     toast.error('Response Added Failed', { autoClose: 3000 });
//   }
// }

// function* onUpdateTicketResponse({ payload: response }) {
//   try {
//     const apiResponse = yield call(updateTicketResponse, response);
//     yield put(updateTicketResponseSuccess(apiResponse));
//     toast.success('Response Updated Successfully', { autoClose: 3000 });
//   } catch (error) {
//     yield put(updateTicketResponseFail(error));
//     toast.error('Response Updated Failed', { autoClose: 3000 });
//   }
// }

// function* onDeleteTicketResponse({ payload: responseId }) {
//   try {
//     const response = yield call(deleteTicketResponse, responseId);
//     yield put(deleteTicketResponseSuccess(response));
//     toast.success('Response Deleted Successfully', { autoClose: 3000 });
//   } catch (error) {
//     yield put(deleteTicketResponseFail(error));
//     toast.error('Response Deleted Failed', { autoClose: 3000 });
//   }
// }

// // TAT functions
// function* getTats() {
//   try {
//     const response = yield call(getTatsApi);
//     yield put(ticketApiResponseSuccess(GET_TATS, response));
//   } catch (error) {
//     toast.error(`Loading TATs Failed: ${error}`, { autoClose: 3000 });
//     yield put(ticketApiResponseError(GET_TATS, error));
//   }
// }

// function* onAddNewTat({ payload: tat }) {
//   try {
//     const response = yield call(addNewTat, tat);
//     yield put(addTatSuccess(response));
//     toast.success('TAT Added Successfully', { autoClose: 3000 });
//   } catch (error) {
//     yield put(addTatFail(error));
//     toast.error('TAT Added Failed', { autoClose: 3000 });
//   }
// }

// function* onUpdateTat({ payload: tat }) {
//   try {
//     const response = yield call(updateTat, tat);
//     yield put(updateTatSuccess(response));
//     toast.success('TAT Updated Successfully', { autoClose: 3000 });
//   } catch (error) {
//     yield put(updateTatFail(error));
//     toast.error('TAT Updated Failed', { autoClose: 3000 });
//   }
// }

// function* onDeleteTat({ payload: tatId }) {
//   try {
//     const response = yield call(deleteTat, tatId);
//     yield put(deleteTatSuccess(response));
//     toast.success('TAT Deleted Successfully', { autoClose: 3000 });
//   } catch (error) {
//     yield put(deleteTatFail(error));
//     toast.error('TAT Deleted Failed', { autoClose: 3000 });
//   }
// }

// // Category Group functions
// function* getCategoryGroups() {
//   try {
//     const response = yield call(getCategoryGroupsApi);
//     yield put(ticketApiResponseSuccess(GET_CATEGORY_GROUPS, response));
//   } catch (error) {
//     toast.error(`Loading Category Groups Failed: ${error}`, { autoClose: 3000 });
//     yield put(ticketApiResponseError(GET_CATEGORY_GROUPS, error));
//   }
// }

// function* onAddNewCategoryGroup({ payload: categoryGroup }) {
//   try {
//     const response = yield call(addNewCategoryGroup, categoryGroup);
//     yield put(addCategoryGroupSuccess(response));
//     toast.success('Category Group Added Successfully', { autoClose: 3000 });
//   } catch (error) {
//     yield put(addCategoryGroupFail(error));
//     toast.error('Category Group Added Failed', { autoClose: 3000 });
//   }
// }

// function* onUpdateCategoryGroup({ payload: categoryGroup }) {
//   try {
//     const response = yield call(updateCategoryGroup, categoryGroup);
//     yield put(updateCategoryGroupSuccess(response));
//     toast.success('Category Group Updated Successfully', { autoClose: 3000 });
//   } catch (error) {
//     yield put(updateCategoryGroupFail(error));
//     toast.error('Category Group Updated Failed', { autoClose: 3000 });
//   }
// }

// function* onDeleteCategoryGroup({ payload: categoryGroupId }) {
//   try {
//     const response = yield call(deleteCategoryGroup, categoryGroupId);
//     yield put(deleteCategoryGroupSuccess(response));
//     toast.success('Category Group Deleted Successfully', { autoClose: 3000 });
//   } catch (error) {
//     yield put(deleteCategoryGroupFail(error));
//     toast.error('Category Group Deleted Failed', { autoClose: 3000 });
//   }
// }

// // Category functions
// function* getCategories() {
//   try {
//     const response = yield call(getCategoriesApi);
//     yield put(ticketApiResponseSuccess(GET_CATEGORIES, response));
//   } catch (error) {
//     toast.error(`Loading Categories Failed: ${error}`, { autoClose: 3000 });
//     yield put(ticketApiResponseError(GET_CATEGORIES, error));
//   }
// }

// function* onAddNewCategory({ payload: category }) {
//   try {
//     const response = yield call(addNewCategory, category);
//     yield put(addCategorySuccess(response));
//     toast.success('Category Added Successfully', { autoClose: 3000 });
//   } catch (error) {
//     yield put(addCategoryFail(error));
//     toast.error('Category Added Failed', { autoClose: 3000 });
//   }
// }

// function* onUpdateCategory({ payload: category }) {
//   try {
//     const response = yield call(updateCategory, category);
//     yield put(updateCategorySuccess(response));
//     toast.success('Category Updated Successfully', { autoClose: 3000 });
//   } catch (error) {
//     yield put(updateCategoryFail(error));
//     toast.error('Category Updated Failed', { autoClose: 3000 });
//   }
// }

// function* onDeleteCategory({ payload: categoryId }) {
//   try {
//     const response = yield call(deleteCategory, categoryId);
//     yield put(deleteCategorySuccess(response));
//     toast.success('Category Deleted Successfully', { autoClose: 3000 });
//   } catch (error) {
//     yield put(deleteCategoryFail(error));
//     toast.error('Category Deleted Failed', { autoClose: 3000 });
//   }
// }

// // Department functions
// function* getDepartments() {
//   try {
//     const response = yield call(getDepartmentsApi);
//     yield put(ticketApiResponseSuccess(GET_DEPARTMENTS, response));
//   } catch (error) {
//     toast.error(`Loading Departments Failed: ${error}`, { autoClose: 3000 });
//     yield put(ticketApiResponseError(GET_DEPARTMENTS, error));
//   }
// }

// function* onAddNewDepartment({ payload: department }) {
//   try {
//     const response = yield call(addNewDepartment, department);
//     yield put(addDepartmentSuccess(response));
//     toast.success('Department Added Successfully', { autoClose: 3000 });
//   } catch (error) {
//     yield put(addDepartmentFail(error));
//     toast.error('Department Added Failed', { autoClose: 3000 });
//   }
// }

// function* onUpdateDepartment({ payload: department }) {
//   try {
//     const response = yield call(updateDepartment, department);
//     yield put(updateDepartmentSuccess(response));
//     toast.success('Department Updated Successfully', { autoClose: 3000 });
//   } catch (error) {
//     yield put(updateDepartmentFail(error));
//     toast.error('Department Updated Failed', { autoClose: 3000 });
//   }
// }

// function* onDeleteDepartment({ payload: departmentId }) {
//   try {
//     const response = yield call(deleteDepartment, departmentId);
//     yield put(deleteDepartmentSuccess(response));
//     toast.success('Department Deleted Successfully', { autoClose: 3000 });
//   } catch (error) {
//     yield put(deleteDepartmentFail(error));
//     toast.error('Department Deleted Failed', { autoClose: 3000 });
//   }
// }

// // Watchers
// export function* watchGetTickets() {
//   yield takeEvery(GET_TICKETS, getTickets);
// }

// export function* watchGetTicketById() {
//   yield takeEvery(GET_TICKET_BY_ID, getTicketById);
// }

// export function* watchGetTicketsByAssignedId() {
//   yield takeEvery(GET_TICKETS_BY_ASSIGNED_ID, getTicketsByAssignedId);
// }

// export function* watchGetTicketResponses() {
//   yield takeEvery(GET_TICKET_RESPONSES, getTicketResponses);
// }

// export function* watchAddNewTicket() {
//   yield takeEvery(ADD_NEW_TICKET, onAddNewTicket);
// }

// export function* watchDeleteTicket() {
//   yield takeEvery(DELETE_TICKET, onDeleteTicket);
// }

// export function* watchUpdateTicket() {
//   yield takeEvery(UPDATE_TICKET, onUpdateTicket);
// }

// export function* watchAssignTicket() {
//   yield takeEvery(ASSIGN_TICKET, onAssignTicket);
// }

// export function* watchAddTicketResponse() {
//   yield takeEvery(ADD_TICKET_RESPONSE, onAddTicketResponse);
// }

// export function* watchUpdateTicketResponse() {
//   yield takeEvery(UPDATE_TICKET_RESPONSE, onUpdateTicketResponse);
// }

// export function* watchDeleteTicketResponse() {
//   yield takeEvery(DELETE_TICKET_RESPONSE, onDeleteTicketResponse);
// }

// export function* watchGetTats() {
//   yield takeEvery(GET_TATS, getTats);
// }

// export function* watchAddNewTat() {
//   yield takeEvery(ADD_NEW_TAT, onAddNewTat);
// }

// export function* watchUpdateTat() {
//   yield takeEvery(UPDATE_TAT, onUpdateTat);
// }

// export function* watchDeleteTat() {
//   yield takeEvery(DELETE_TAT, onDeleteTat);
// }

// export function* watchGetCategoryGroups() {
//   yield takeEvery(GET_CATEGORY_GROUPS, getCategoryGroups);
// }

// export function* watchAddNewCategoryGroup() {
//   yield takeEvery(ADD_NEW_CATEGORY_GROUP, onAddNewCategoryGroup);
// }

// export function* watchUpdateCategoryGroup() {
//   yield takeEvery(UPDATE_CATEGORY_GROUP, onUpdateCategoryGroup);
// }

// export function* watchDeleteCategoryGroup() {
//   yield takeEvery(DELETE_CATEGORY_GROUP, onDeleteCategoryGroup);
// }

// export function* watchGetCategories() {
//   yield takeEvery(GET_CATEGORIES, getCategories);
// }

// export function* watchAddNewCategory() {
//   yield takeEvery(ADD_NEW_CATEGORY, onAddNewCategory);
// }

// export function* watchUpdateCategory() {
//   yield takeEvery(UPDATE_CATEGORY, onUpdateCategory);
// }

// export function* watchDeleteCategory() {
//   yield takeEvery(DELETE_CATEGORY, onDeleteCategory);
// }

// export function* watchGetDepartments() {
//   yield takeEvery(GET_DEPARTMENTS, getDepartments);
// }

// export function* watchAddNewDepartment() {
//   yield takeEvery(ADD_NEW_DEPARTMENT, onAddNewDepartment);
// }

// export function* watchUpdateDepartment() {
//   yield takeEvery(UPDATE_DEPARTMENT, onUpdateDepartment);
// }

// export function* watchDeleteDepartment() {
//   yield takeEvery(DELETE_DEPARTMENT, onDeleteDepartment);
// }

// function* TicketsSaga() {
//   yield all([
//     // Ticket watchers
//     fork(watchGetTickets),
//     fork(watchGetTicketById),
//     fork(watchGetTicketsByAssignedId),
//     fork(watchAddNewTicket),
//     fork(watchDeleteTicket),
//     fork(watchUpdateTicket),
//     fork(watchAssignTicket),
    
//     // Ticket responses watchers
//     fork(watchGetTicketResponses),
//     fork(watchAddTicketResponse),
//     fork(watchUpdateTicketResponse),
//     fork(watchDeleteTicketResponse),
    
//     // TAT watchers
//     fork(watchGetTats),
//     fork(watchAddNewTat),
//     fork(watchUpdateTat),
//     fork(watchDeleteTat),
    
//     // Category Group watchers
//     fork(watchGetCategoryGroups),
//     fork(watchAddNewCategoryGroup),
//     fork(watchUpdateCategoryGroup),
//     fork(watchDeleteCategoryGroup),
    
//     // Category watchers
//     fork(watchGetCategories),
//     fork(watchAddNewCategory),
//     fork(watchUpdateCategory),
//     fork(watchDeleteCategory),
    
//     // Department watchers
//     fork(watchGetDepartments),
//     fork(watchAddNewDepartment),
//     fork(watchUpdateDepartment),
//     fork(watchDeleteDepartment),
//   ]);
// }

// export default TicketsSaga;