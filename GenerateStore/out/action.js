
  import {
    API_RESPONSE_SUCCESS,
    API_RESPONSE_ERROR,
    GET_ALERTS,
    GET_ALERTS_BY_ID,
    ADD_NEW_ALERTS,
    ADD_ALERTS_SUCCESS,
    ADD_ALERTS_FAIL,
    ADD_ALERTS_RESET,
    DELETE_ALERTS,
    DELETE_ALERTS_SUCCESS,
    DELETE_ALERTS_FAIL,
    UPDATE_ALERTS,
    UPDATE_ALERTS_SUCCESS,
    UPDATE_ALERTS_FAIL,
    SELECTED_ALERTS,
  } from './actionType';
  
  // common success
  export const alertsApiResponseSuccess = (actionType, data) => ({
    type: API_RESPONSE_SUCCESS,
    payload: { actionType, data },
  });
  // common error
  export const alertsApiResponseError = (actionType, error) => ({
    type: API_RESPONSE_ERROR,
    payload: { actionType, error },
  });
  
  export const getAlerts = (data) => ({
    type: GET_ALERTS,
    payload: data,
  });
  
  export const getAlertsbyId = (id) => ({
    type: GET_ALERTS_BY_ID,
    payload: id,
  });
  
  export const selectedAlerts = (alerts) => ({
    type: SELECTED_ALERTS,
    payload: alerts,
  });
  
  export const addNewAlerts = (alerts) => ({
    type: ADD_NEW_ALERTS,
    payload: alerts,
  });
  
  export const addAlertsSuccess = (alerts) => ({
    type: ADD_ALERTS_SUCCESS,
    payload: alerts,
  });
  
  export const addAlertsFail = (error) => ({
    type: ADD_ALERTS_FAIL,
    payload: error,
  });
  
  export const addAlertsReset = () => ({
    type: ADD_ALERTS_RESET,
  });
  
  export const deleteAlerts = (alerts) => ({
    type: DELETE_ALERTS,
    payload: alerts,
  });
  
  export const deleteAlertsSuccess = (alerts) => ({
    type: DELETE_ALERTS_SUCCESS,
    payload: alerts,
  });
  
  export const deleteAlertsFail = (error) => ({
    type: DELETE_ALERTS_FAIL,
    payload: error,
  });
  
  export const updateAlerts = (alerts) => ({
    type: UPDATE_ALERTS,
    payload: alerts,
  });
  
  export const updateAlertsSuccess = (alerts) => ({
    type: UPDATE_ALERTS_SUCCESS,
    payload: alerts,
  });
  
  export const updateAlertsFail = (error) => ({
    type: UPDATE_ALERTS_FAIL,
    payload: error,
  });
  