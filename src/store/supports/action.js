import {
  API_RESPONSE_SUCCESS,
  API_RESPONSE_ERROR,
  GET_TICKETS_CATEGORY_GROUPS,
  SELECTED_TICKETS_CATEGORY_GROUP,
  ADD_NEW_TICKETS_CATEGORY_GROUP,
  ADD_TICKETS_CATEGORY_GROUP_SUCCESS,
  ADD_TICKETS_CATEGORY_GROUP_FAIL,
  ADD_TICKETS_CATEGORY_GROUP_RESET,
  UPDATE_TICKETS_CATEGORY_GROUP,
  UPDATE_TICKETS_CATEGORY_GROUP_SUCCESS,
  UPDATE_TICKETS_CATEGORY_GROUP_FAIL,
  DELETE_TICKETS_CATEGORY_GROUP,
  DELETE_TICKETS_CATEGORY_GROUP_SUCCESS,
  DELETE_TICKETS_CATEGORY_GROUP_FAIL,
  RESET_ADD_UPDATE_TICKETS_CATEGORY_GROUP,
} from './actionType';

// Common success
export const ticketsCategoryGroupApiResponseSuccess = (actionType, data) => ({
  type: API_RESPONSE_SUCCESS,
  payload: { actionType, data },
});

// Common error
export const ticketsCategoryGroupApiResponseError = (actionType, error) => ({
  type: API_RESPONSE_ERROR,
  payload: { actionType, error },
});

export const getTicketsCategoryGroups = () => ({
  type: GET_TICKETS_CATEGORY_GROUPS,
});

export const selectedTicketsCategoryGroup = (group) => ({
  type: SELECTED_TICKETS_CATEGORY_GROUP,
  payload: group,
});

export const addNewTicketsCategoryGroup = (group) => ({
  type: ADD_NEW_TICKETS_CATEGORY_GROUP,
  payload: group,
});

export const addTicketsCategoryGroupSuccess = (group) => ({
  type: ADD_TICKETS_CATEGORY_GROUP_SUCCESS,
  payload: group,
});

export const addTicketsCategoryGroupFail = (error) => ({
  type: ADD_TICKETS_CATEGORY_GROUP_FAIL,
  payload: error,
});

export const addTicketsCategoryGroupReset = () => ({
  type: ADD_TICKETS_CATEGORY_GROUP_RESET,
});

export const updateTicketsCategoryGroup = (group) => ({
  type: UPDATE_TICKETS_CATEGORY_GROUP,
  payload: group,
});

export const updateTicketsCategoryGroupSuccess = (group) => ({
  type: UPDATE_TICKETS_CATEGORY_GROUP_SUCCESS,
  payload: group,
});

export const updateTicketsCategoryGroupFail = (error) => ({
  type: UPDATE_TICKETS_CATEGORY_GROUP_FAIL,
  payload: error,
});

export const deleteTicketsCategoryGroup = (group) => ({
  type: DELETE_TICKETS_CATEGORY_GROUP,
  payload: group,
});

export const deleteTicketsCategoryGroupSuccess = (group) => ({
  type: DELETE_TICKETS_CATEGORY_GROUP_SUCCESS,
  payload: group,
});

export const deleteTicketsCategoryGroupFail = (error) => ({
  type: DELETE_TICKETS_CATEGORY_GROUP_FAIL,
  payload: error,
});

export const resetAddUpdateTicketsCategoryGroup = () => ({
  type: RESET_ADD_UPDATE_TICKETS_CATEGORY_GROUP,
});
