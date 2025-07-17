const reducer = `
import {
  GET_${actionName},
  GET_${actionName}_BY_ID,
  SELECTED_${actionName},
  API_RESPONSE_SUCCESS,
  API_RESPONSE_ERROR,
  ADD_NEW_${actionName},
  ADD_${actionName}_SUCCESS,
  ADD_${actionName}_FAIL,
  ADD_${actionName}_RESET,
  DELETE_${actionName}_SUCCESS,
  DELETE_${actionName}_FAIL,
  UPDATE_${actionName}_SUCCESS,
  UPDATE_${actionName}_FAIL,
} from './actionType';

const INIT_STATE = {
  ${apiSmall}: [],
  error: null,
  ${apiSmall}ById: null,
  selected${apiCap}: null,
  isGet${apiCap}ByIdRequested: false,
};

const ${apiCap}s = (state = INIT_STATE, action) => {
  switch (action.type) {
    case API_RESPONSE_SUCCESS:
      switch (action.payload.actionType) {
        case GET_${actionName}:
          return {
            ...state,
            ${apiSmall}: action.payload.data,
            isGet${apiCap}sSuccess: true,
            isGet${apiCap}Requested: false,
          };
        case GET_${actionName}_BY_ID:
          return {
            ...state,
            ${apiSmall}ById: action.payload.data,
            isGet${apiCap}ByIdSuccess: true,
            isGet${apiCap}ByIdRequested: true,
          };
        default:
          return { ...state };
      }
    case API_RESPONSE_ERROR:
      switch (action.payload.actionType) {
        case GET_${actionName}:
          return {
            ...state,
            error: action.payload.error,
            isGet${apiCap}sSuccess: false,
            isGet${apiCap}Requested: false,
          };
        case GET_${actionName}_BY_ID:
          return {
            ...state,
            error: action.payload.error,
            isGet${apiCap}ByIdSuccess: false,
            isGet${apiCap}ByIdRequested: false,
          };
        default:
          return { ...state };
      }
    case GET_${actionName}: {
      return {
        ...state,
        isGet${apiCap}sSuccess: false,
        isGet${apiCap}Requested: true,
      };
    }

    case SELECTED_${actionName}:
      localStorage.setItem('selected${apiCap}', JSON.stringify(action.payload));
      return {
        ...state,
        selected${apiCap}: action.payload,
      };
    case ADD_NEW_${actionName}: {
      return {
        ...state,
        is${apiCap}CreatedSuccess: false,
        is${apiCap}CreatedRequested: true,
      };
    }
    case ADD_${actionName}_SUCCESS:
      return {
        ...state,
        ${apiSmall}: [...state.${apiSmall}, action.payload],
        is${apiCap}CreatedSuccess: true,
        is${apiCap}CreatedRequested: false,
      };
    case ADD_${actionName}_FAIL:
      return {
        ...state,
        error: action.payload,
        is${apiCap}CreatedSuccess: false,
        is${apiCap}CreatedRequested: false,
      };
    case ADD_${actionName}_RESET:
      return {
        ...state,
        error: null,
        is${apiCap}CreatedSuccess: false,
        is${apiCap}CreatedRequested: false,
      };
    case DELETE_${actionName}_SUCCESS:
      return {
        ...state,
        ${apiSmall}: state.${apiSmall}.filter(
          (${apiSmall}) => ${apiSmall}.id.toString() !== action.payload.data.id.toString()
        ),
      };

    case DELETE_${actionName}_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case UPDATE_${actionName}_SUCCESS:
      return {
        ...state,
        ${apiSmall}: state.${apiSmall}.map((${apiSmall}) =>
          ${apiSmall}.id.toString() === action.payload.data.id.toString()
            ? { ...${apiSmall}, ...action.payload.data }
            : ${apiSmall}
        ),
      };

    case UPDATE_${actionName}_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return { ...state };
  }
};

export default ${apiCap}s;
`;
