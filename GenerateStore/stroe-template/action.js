import {
  API_RESPONSE_SUCCESS,
  API_RESPONSE_ERROR,
  GET_CLIENTS,
  GET_CLIENT_BY_ID,
  ADD_NEW_CLIENT,
  ADD_CLIENT_SUCCESS,
  ADD_CLIENT_FAIL,
  ADD_CLIENT_RESET,
  DELETE_CLIENT,
  DELETE_CLIENT_SUCCESS,
  DELETE_CLIENT_FAIL,
  UPDATE_CLIENT,
  UPDATE_CLIENT_SUCCESS,
  UPDATE_CLIENT_FAIL,
  SELECTED_CLIENT,
} from './actionType';

// common success
export const clientApiResponseSuccess = (actionType, data) => ({
  type: API_RESPONSE_SUCCESS,
  payload: { actionType, data },
});
// common error
export const clientApiResponseError = (actionType, error) => ({
  type: API_RESPONSE_ERROR,
  payload: { actionType, error },
});

export const getClients = (data) => ({
  type: GET_CLIENTS,
  payload: data,
});

export const getClientbyId = (id) => ({
  type: GET_CLIENT_BY_ID,
  payload: id,
});

export const selectedClient = (client) => ({
  type: SELECTED_CLIENT,
  payload: client,
});

export const addNewClient = (client) => ({
  type: ADD_NEW_CLIENT,
  payload: client,
});

export const addClientSuccess = (client) => ({
  type: ADD_CLIENT_SUCCESS,
  payload: client,
});

export const addClientFail = (error) => ({
  type: ADD_CLIENT_FAIL,
  payload: error,
});

export const addClientReset = () => ({
  type: ADD_CLIENT_RESET,
});

export const deleteClient = (client) => ({
  type: DELETE_CLIENT,
  payload: client,
});

export const deleteClientSuccess = (client) => ({
  type: DELETE_CLIENT_SUCCESS,
  payload: client,
});

export const deleteClientFail = (error) => ({
  type: DELETE_CLIENT_FAIL,
  payload: error,
});

export const updateClient = (client) => ({
  type: UPDATE_CLIENT,
  payload: client,
});

export const updateClientSuccess = (client) => ({
  type: UPDATE_CLIENT_SUCCESS,
  payload: client,
});

export const updateClientFail = (error) => ({
  type: UPDATE_CLIENT_FAIL,
  payload: error,
});
