import {
  API_RESPONSE_SUCCESS,
  API_RESPONSE_ERROR,
  GET_HELP,
  GET_HELP_BY_ID,
  ADD_NEW_HELP,
  ADD_HELP_SUCCESS,
  ADD_HELP_FAIL,
  ADD_HELP_RESET,
  DELETE_HELP,
  DELETE_HELP_SUCCESS,
  DELETE_HELP_FAIL,
  UPDATE_HELP,
  UPDATE_HELP_SUCCESS,
  UPDATE_HELP_FAIL,
  SELECTED_HELP,
} from './actionType';

// common success
export const helpApiResponseSuccess = (actionType, data) => ({
  type: API_RESPONSE_SUCCESS,
  payload: { actionType, data },
});
// common error
export const helpApiResponseError = (actionType, error) => ({
  type: API_RESPONSE_ERROR,
  payload: { actionType, error },
});

export const getHelp = (data) => ({
  type: GET_HELP,
  payload: data,
});

export const getHelpbyId = (id) => ({
  type: GET_HELP_BY_ID,
  payload: id,
});

export const selectedHelp = (help) => ({
  type: SELECTED_HELP,
  payload: help,
});

export const addNewHelp = (help) => ({
  type: ADD_NEW_HELP,
  payload: help,
});

export const addHelpSuccess = (help) => ({
  type: ADD_HELP_SUCCESS,
  payload: help,
});

export const addHelpFail = (error) => ({
  type: ADD_HELP_FAIL,
  payload: error,
});

export const addHelpReset = () => ({
  type: ADD_HELP_RESET,
});

export const deleteHelp = (help) => ({
  type: DELETE_HELP,
  payload: help,
});

export const deleteHelpSuccess = (help) => ({
  type: DELETE_HELP_SUCCESS,
  payload: help,
});

export const deleteHelpFail = (error) => ({
  type: DELETE_HELP_FAIL,
  payload: error,
});

export const updateHelp = (help) => ({
  type: UPDATE_HELP,
  payload: help,
});

export const updateHelpSuccess = (help) => ({
  type: UPDATE_HELP_SUCCESS,
  payload: help,
});

export const updateHelpFail = (error) => ({
  type: UPDATE_HELP_FAIL,
  payload: error,
});
