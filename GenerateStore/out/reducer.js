
  import {
    GET_ALERTS,
    GET_ALERTS_BY_ID,
    SELECTED_ALERTS,
    API_RESPONSE_SUCCESS,
    API_RESPONSE_ERROR,
    ADD_NEW_ALERTS,
    ADD_ALERTS_SUCCESS,
    ADD_ALERTS_FAIL,
    ADD_ALERTS_RESET,
    DELETE_ALERTS_SUCCESS,
    DELETE_ALERTS_FAIL,
    UPDATE_ALERTS_SUCCESS,
    UPDATE_ALERTS_FAIL,
  } from './actionType';
  
  const INIT_STATE = {
    alerts: [],
    error: null,
    alertsById: null,
    selectedAlerts: null,
    isGetAlertsByIdRequested: false,
  };
  
  const Alerts = (state = INIT_STATE, action) => {
    switch (action.type) {
      case API_RESPONSE_SUCCESS:
        switch (action.payload.actionType) {
          case GET_ALERTS:
            return {
              ...state,
              alerts: action.payload.data,
              isGetAlertssSuccess: true,
              isGetAlertsRequested: false,
            };
          case GET_ALERTS_BY_ID:
            return {
              ...state,
              alertsById: action.payload.data,
              isGetAlertsByIdSuccess: true,
              isGetAlertsByIdRequested: true,
            };
          default:
            return { ...state };
        }
      case API_RESPONSE_ERROR:
        switch (action.payload.actionType) {
          case GET_ALERTS:
            return {
              ...state,
              error: action.payload.error,
              isGetAlertssSuccess: false,
              isGetAlertsRequested: false,
            };
          case GET_ALERTS_BY_ID:
            return {
              ...state,
              error: action.payload.error,
              isGetAlertsByIdSuccess: false,
              isGetAlertsByIdRequested: false,
            };
          default:
            return { ...state };
        }
      case GET_ALERTS: {
        return {
          ...state,
          isGetAlertssSuccess: false,
          isGetAlertsRequested: true,
        };
      }
  
      case SELECTED_ALERTS:
        localStorage.setItem('selectedAlerts', JSON.stringify(action.payload));
        return {
          ...state,
          selectedAlerts: action.payload,
        };
      case ADD_NEW_ALERTS: {
        return {
          ...state,
          isAlertsCreatedSuccess: false,
          isAlertsCreatedRequested: true,
        };
      }
      case ADD_ALERTS_SUCCESS:
        return {
          ...state,
          alerts: [...state.alerts, action.payload],
          isAlertsCreatedSuccess: true,
          isAlertsCreatedRequested: false,
        };
      case ADD_ALERTS_FAIL:
        return {
          ...state,
          error: action.payload,
          isAlertsCreatedSuccess: false,
          isAlertsCreatedRequested: false,
        };
      case ADD_ALERTS_RESET:
        return {
          ...state,
          error: null,
          isAlertsCreatedSuccess: false,
          isAlertsCreatedRequested: false,
        };
      case DELETE_ALERTS_SUCCESS:
        return {
          ...state,
          alerts: state.alerts.filter(
            (alerts) => alerts.id.toString() !== action.payload.data.id.toString()
          ),
        };
  
      case DELETE_ALERTS_FAIL:
        return {
          ...state,
          error: action.payload,
        };
  
      case UPDATE_ALERTS_SUCCESS:
        return {
          ...state,
          alerts: state.alerts.map((alerts) =>
            alerts.id.toString() === action.payload.data.id.toString()
              ? { ...alerts, ...action.payload.data }
              : alerts
          ),
        };
  
      case UPDATE_ALERTS_FAIL:
        return {
          ...state,
          error: action.payload,
        };
      default:
        return { ...state };
    }
  };
  
  export default Alerts;
  