// import {
//   API_RESPONSE_SUCCESS,
//   API_RESPONSE_ERROR,
//   GET_TICKETS,
//   GET_TICKET_BY_ID,
//   GET_TICKETS_BY_ASSIGNED_ID,
//   ADD_NEW_TICKET,
//   ADD_TICKET_SUCCESS,
//   ADD_TICKET_FAIL,
//   ADD_TICKET_RESET,
//   DELETE_TICKET,
//   DELETE_TICKET_SUCCESS,
//   DELETE_TICKET_FAIL,
//   UPDATE_TICKET,
//   UPDATE_TICKET_SUCCESS,
//   UPDATE_TICKET_FAIL,
//   ASSIGN_TICKET,
//   ASSIGN_TICKET_SUCCESS,
//   ASSIGN_TICKET_FAIL,
//   SELECTED_TICKET,
//   RESET_ADD_UPDATE_NEW_TICKET,
//   GET_TICKET_RESPONSES,
//   ADD_TICKET_RESPONSE,
//   ADD_TICKET_RESPONSE_SUCCESS,
//   ADD_TICKET_RESPONSE_FAIL,
//   UPDATE_TICKET_RESPONSE,
//   UPDATE_TICKET_RESPONSE_SUCCESS,
//   UPDATE_TICKET_RESPONSE_FAIL,
//   DELETE_TICKET_RESPONSE,
//   DELETE_TICKET_RESPONSE_SUCCESS,
//   DELETE_TICKET_RESPONSE_FAIL,
//   GET_TATS,
//   ADD_NEW_TAT,
//   ADD_TAT_SUCCESS,
//   ADD_TAT_FAIL,
//   UPDATE_TAT,
//   UPDATE_TAT_SUCCESS,
//   UPDATE_TAT_FAIL,
//   DELETE_TAT,
//   DELETE_TAT_SUCCESS,
//   DELETE_TAT_FAIL,
//   GET_CATEGORY_GROUPS,
//   ADD_NEW_CATEGORY_GROUP,
//   ADD_CATEGORY_GROUP_SUCCESS,
//   ADD_CATEGORY_GROUP_FAIL,
//   UPDATE_CATEGORY_GROUP,
//   UPDATE_CATEGORY_GROUP_SUCCESS,
//   UPDATE_CATEGORY_GROUP_FAIL,
//   DELETE_CATEGORY_GROUP,
//   DELETE_CATEGORY_GROUP_SUCCESS,
//   DELETE_CATEGORY_GROUP_FAIL,
//   GET_CATEGORIES,
//   ADD_NEW_CATEGORY,
//   ADD_CATEGORY_SUCCESS,
//   ADD_CATEGORY_FAIL,
//   UPDATE_CATEGORY,
//   UPDATE_CATEGORY_SUCCESS,
//   UPDATE_CATEGORY_FAIL,
//   DELETE_CATEGORY,
//   DELETE_CATEGORY_SUCCESS,
//   DELETE_CATEGORY_FAIL,
//   GET_DEPARTMENTS,
//   ADD_NEW_DEPARTMENT,
//   ADD_DEPARTMENT_SUCCESS,
//   ADD_DEPARTMENT_FAIL,
//   UPDATE_DEPARTMENT,
//   UPDATE_DEPARTMENT_SUCCESS,
//   UPDATE_DEPARTMENT_FAIL,
//   DELETE_DEPARTMENT,
//   DELETE_DEPARTMENT_SUCCESS,
//   DELETE_DEPARTMENT_FAIL,
// } from './actionType';

// // Common success and error handlers
// export const ticketApiResponseSuccess = (actionType, data) => ({
//   type: API_RESPONSE_SUCCESS,
//   payload: { actionType, data },
// });

// export const ticketApiResponseError = (actionType, error) => ({
//   type: API_RESPONSE_ERROR,
//   payload: { actionType, error },
// });

// // Ticket actions
// export const getTickets = () => ({
//   type: GET_TICKETS,
// });

// export const getTicketById = (id) => ({
//   type: GET_TICKET_BY_ID,
//   payload: id,
// });

// export const getTicketsByAssignedId = (assignedId) => ({
//   type: GET_TICKETS_BY_ASSIGNED_ID,
//   payload: assignedId,
// });

// export const selectedTicket = (ticket) => ({
//   type: SELECTED_TICKET,
//   payload: ticket,
// });

// export const addNewTicket = (ticket) => ({
//   type: ADD_NEW_TICKET,
//   payload: ticket,
// });

// export const addTicketSuccess = (ticket) => ({
//   type: ADD_TICKET_SUCCESS,
//   payload: ticket,
// });

// export const addTicketFail = (error) => ({
//   type: ADD_TICKET_FAIL,
//   payload: error,
// });

// export const addTicketReset = () => ({
//   type: ADD_TICKET_RESET,
// });

// export const updateTicket = (ticket) => ({
//   type: UPDATE_TICKET,
//   payload: ticket,
// });

// export const updateTicketSuccess = (ticket) => ({
//   type: UPDATE_TICKET_SUCCESS,
//   payload: ticket,
// });

// export const updateTicketFail = (error) => ({
//   type: UPDATE_TICKET_FAIL,
//   payload: error,
// });

// export const assignTicket = (ticketId, assignedTo) => ({
//   type: ASSIGN_TICKET,
//   payload: { ticketId, assignedTo },
// });

// export const assignTicketSuccess = (ticket) => ({
//   type: ASSIGN_TICKET_SUCCESS,
//   payload: ticket,
// });

// export const assignTicketFail = (error) => ({
//   type: ASSIGN_TICKET_FAIL,
//   payload: error,
// });

// export const deleteTicket = (ticket) => ({
//   type: DELETE_TICKET,
//   payload: ticket,
// });

// export const deleteTicketSuccess = (ticket) => ({
//   type: DELETE_TICKET_SUCCESS,
//   payload: ticket,
// });

// export const deleteTicketFail = (error) => ({
//   type: DELETE_TICKET_FAIL,
//   payload: error,
// });

// // Ticket responses actions
// export const getTicketResponses = (ticketId) => ({
//   type: GET_TICKET_RESPONSES,
//   payload: ticketId,
// });

// export const addTicketResponse = (response) => ({
//   type: ADD_TICKET_RESPONSE,
//   payload: response,
// });

// export const addTicketResponseSuccess = (response) => ({
//   type: ADD_TICKET_RESPONSE_SUCCESS,
//   payload: response,
// });

// export const addTicketResponseFail = (error) => ({
//   type: ADD_TICKET_RESPONSE_FAIL,
//   payload: error,
// });

// export const updateTicketResponse = (response) => ({
//   type: UPDATE_TICKET_RESPONSE,
//   payload: response,
// });

// export const updateTicketResponseSuccess = (response) => ({
//   type: UPDATE_TICKET_RESPONSE_SUCCESS,
//   payload: response,
// });

// export const updateTicketResponseFail = (error) => ({
//   type: UPDATE_TICKET_RESPONSE_FAIL,
//   payload: error,
// });

// export const deleteTicketResponse = (responseId) => ({
//   type: DELETE_TICKET_RESPONSE,
//   payload: responseId,
// });

// export const deleteTicketResponseSuccess = (response) => ({
//   type: DELETE_TICKET_RESPONSE_SUCCESS,
//   payload: response,
// });

// export const deleteTicketResponseFail = (error) => ({
//   type: DELETE_TICKET_RESPONSE_FAIL,
//   payload: error,
// });

// // TAT actions
// export const getTats = () => ({
//   type: GET_TATS,
// });

// export const addNewTat = (tat) => ({
//   type: ADD_NEW_TAT,
//   payload: tat,
// });

// export const addTatSuccess = (tat) => ({
//   type: ADD_TAT_SUCCESS,
//   payload: tat,
// });

// export const addTatFail = (error) => ({
//   type: ADD_TAT_FAIL,
//   payload: error,
// });

// export const updateTat = (tat) => ({
//   type: UPDATE_TAT,
//   payload: tat,
// });

// export const updateTatSuccess = (tat) => ({
//   type: UPDATE_TAT_SUCCESS,
//   payload: tat,
// });

// export const updateTatFail = (error) => ({
//   type: UPDATE_TAT_FAIL,
//   payload: error,
// });

// export const deleteTat = (tatId) => ({
//   type: DELETE_TAT,
//   payload: tatId,
// });

// export const deleteTatSuccess = (response) => ({
//   type: DELETE_TAT_SUCCESS,
//   payload: response,
// });

// export const deleteTatFail = (error) => ({
//   type: DELETE_TAT_FAIL,
//   payload: error,
// });

// // Category Group actions
// export const getCategoryGroups = () => ({
//   type: GET_CATEGORY_GROUPS,
// });

// export const addNewCategoryGroup = (categoryGroup) => ({
//   type: ADD_NEW_CATEGORY_GROUP,
//   payload: categoryGroup,
// });

// export const addCategoryGroupSuccess = (categoryGroup) => ({
//   type: ADD_CATEGORY_GROUP_SUCCESS,
//   payload: categoryGroup,
// });

// export const addCategoryGroupFail = (error) => ({
//   type: ADD_CATEGORY_GROUP_FAIL,
//   payload: error,
// });

// export const updateCategoryGroup = (categoryGroup) => ({
//   type: UPDATE_CATEGORY_GROUP,
//   payload: categoryGroup,
// });

// export const updateCategoryGroupSuccess = (categoryGroup) => ({
//   type: UPDATE_CATEGORY_GROUP_SUCCESS,
//   payload: categoryGroup,
// });

// export const updateCategoryGroupFail = (error) => ({
//   type: UPDATE_CATEGORY_GROUP_FAIL,
//   payload: error,
// });

// export const deleteCategoryGroup = (categoryGroupId) => ({
//   type: DELETE_CATEGORY_GROUP,
//   payload: categoryGroupId,
// });

// export const deleteCategoryGroupSuccess = (response) => ({
//   type: DELETE_CATEGORY_GROUP_SUCCESS,
//   payload: response,
// });

// export const deleteCategoryGroupFail = (error) => ({
//   type: DELETE_CATEGORY_GROUP_FAIL,
//   payload: error,
// });

// // Category actions
// export const getCategories = () => ({
//   type: GET_CATEGORIES,
// });

// export const addNewCategory = (category) => ({
//   type: ADD_NEW_CATEGORY,
//   payload: category,
// });

// export const addCategorySuccess = (category) => ({
//   type: ADD_CATEGORY_SUCCESS,
//   payload: category,
// });

// export const addCategoryFail = (error) => ({
//   type: ADD_CATEGORY_FAIL,
//   payload: error,
// });

// export const updateCategory = (category) => ({
//   type: UPDATE_CATEGORY,
//   payload: category,
// });

// export const updateCategorySuccess = (category) => ({
//   type: UPDATE_CATEGORY_SUCCESS,
//   payload: category,
// });

// export const updateCategoryFail = (error) => ({
//   type: UPDATE_CATEGORY_FAIL,
//   payload: error,
// });

// export const deleteCategory = (categoryId) => ({
//   type: DELETE_CATEGORY,
//   payload: categoryId,
// });

// export const deleteCategorySuccess = (response) => ({
//   type: DELETE_CATEGORY_SUCCESS,
//   payload: response,
// });

// export const deleteCategoryFail = (error) => ({
//   type: DELETE_CATEGORY_FAIL,
//   payload: error,
// });

// // Department actions
// export const getDepartments = () => ({
//   type: GET_DEPARTMENTS,
// });

// export const addNewDepartment = (department) => ({
//   type: ADD_NEW_DEPARTMENT,
//   payload: department,
// });

// export const addDepartmentSuccess = (department) => ({
//   type: ADD_DEPARTMENT_SUCCESS,
//   payload: department,
// });

// export const addDepartmentFail = (error) => ({
//   type: ADD_DEPARTMENT_FAIL,
//   payload: error,
// });

// export const updateDepartment = (department) => ({
//   type: UPDATE_DEPARTMENT,
//   payload: department,
// });

// export const updateDepartmentSuccess = (department) => ({
//   type: UPDATE_DEPARTMENT_SUCCESS,
//   payload: department,
// });

// export const updateDepartmentFail = (error) => ({
//   type: UPDATE_DEPARTMENT_FAIL,
//   payload: error,
// });

// export const deleteDepartment = (departmentId) => ({
//   type: DELETE_DEPARTMENT,
//   payload: departmentId,
// });

// export const deleteDepartmentSuccess = (response) => ({
//   type: DELETE_DEPARTMENT_SUCCESS,
//   payload: response,
// });

// export const deleteDepartmentFail = (error) => ({
//   type: DELETE_DEPARTMENT_FAIL,
//   payload: error,
// });

// // Reset actions
// export const resetAddUpdateNewTicket = () => ({
//   type: RESET_ADD_UPDATE_NEW_TICKET,
// });