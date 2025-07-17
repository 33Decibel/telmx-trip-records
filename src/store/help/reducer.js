import {
  GET_HELP,
  GET_HELP_BY_ID,
  SELECTED_HELP,
  API_RESPONSE_SUCCESS,
  API_RESPONSE_ERROR,
  ADD_NEW_HELP,
  ADD_HELP_SUCCESS,
  ADD_HELP_FAIL,
  ADD_HELP_RESET,
  DELETE_HELP_SUCCESS,
  DELETE_HELP_FAIL,
  UPDATE_HELP_SUCCESS,
  UPDATE_HELP_FAIL,
} from './actionType';

const INIT_STATE = {
  help: [],
  error: null,
  helpById: null,
  selectedHelp: null,
  isGetHelpByIdRequested: false,
};

const Help = (state = INIT_STATE, action) => {
  switch (action.type) {
    case API_RESPONSE_SUCCESS:
      switch (action.payload.actionType) {
        case GET_HELP:
          return {
            ...state,
            help: action.payload.data,
            isGetHelpsSuccess: true,
            isGetHelpRequested: false,
          };
        case GET_HELP_BY_ID:
          return {
            ...state,
            helpById: action.payload.data,
            isGetHelpByIdSuccess: true,
            isGetHelpByIdRequested: true,
          };
        default:
          return { ...state };
      }
    case API_RESPONSE_ERROR:
      switch (action.payload.actionType) {
        case GET_HELP:
          return {
            ...state,
            error: action.payload.error,
            isGetHelpsSuccess: false,
            isGetHelpRequested: false,
          };
        case GET_HELP_BY_ID:
          return {
            ...state,
            error: action.payload.error,
            isGetHelpByIdSuccess: false,
            isGetHelpByIdRequested: false,
          };
        default:
          return { ...state };
      }
    case GET_HELP: {
      return {
        ...state,
        isGetHelpsSuccess: false,
        isGetHelpRequested: true,
      };
    }

    case SELECTED_HELP:
      localStorage.setItem('selectedHelp', JSON.stringify(action.payload));
      return {
        ...state,
        selectedHelp: action.payload,
      };
    case ADD_NEW_HELP: {
      return {
        ...state,
        isHelpCreatedSuccess: false,
        isHelpCreatedRequested: true,
      };
    }
    case ADD_HELP_SUCCESS:
      return {
        ...state,
        help: [...state.help, action.payload],
        isHelpCreatedSuccess: true,
        isHelpCreatedRequested: false,
      };
    case ADD_HELP_FAIL:
      return {
        ...state,
        error: action.payload,
        isHelpCreatedSuccess: false,
        isHelpCreatedRequested: false,
      };
    case ADD_HELP_RESET:
      return {
        ...state,
        error: null,
        isHelpCreatedSuccess: false,
        isHelpCreatedRequested: false,
      };
    case DELETE_HELP_SUCCESS:
      return {
        ...state,
        help: state.help.filter(
          (help) => help.id.toString() !== action.payload.data.id.toString()
        ),
      };

    case DELETE_HELP_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case UPDATE_HELP_SUCCESS:
      return {
        ...state,
        help: state.help.map((help) =>
          help.id.toString() === action.payload.data.id.toString()
            ? { ...help, ...action.payload.data }
            : help
        ),
      };

    case UPDATE_HELP_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return { ...state };
  }
};

export default Help;
