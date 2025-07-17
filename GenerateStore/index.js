// Run this with following command
// node ./GenerateStore dynamicForm DynamicForm DYNAMIC_FORM

const inputParams = process.argv;
var fs = require("fs");

const createActionType = (actionName) => {
  return `
  // Actions
  export const API_RESPONSE_SUCCESS = 'API_RESPONSE_SUCCESS';
  export const API_RESPONSE_ERROR = 'API_RESPONSE_ERROR';
  export const GET_${actionName} = 'GET_${actionName}';
  export const GET_${actionName}_BY_ID = 'GET_${actionName}_BY_ID';
  export const SELECTED_${actionName} = 'SELECTED_${actionName}';
  
  // Add ${actionName}
  export const ADD_NEW_${actionName} = 'ADD_NEW_${actionName}';
  export const ADD_${actionName}_SUCCESS = 'ADD_${actionName}_SUCCESS';
  export const ADD_${actionName}_FAIL = 'ADD_${actionName}_FAIL';
  export const ADD_${actionName}_RESET = 'ADD_${actionName}_RESET';
  
  // Edit ${actionName}
  export const UPDATE_${actionName} = 'UPDATE_${actionName}';
  export const UPDATE_${actionName}_SUCCESS = 'UPDATE_${actionName}_SUCCESS';
  export const UPDATE_${actionName}_FAIL = 'UPDATE_${actionName}_FAIL';
  
  // Delete ${actionName}
  export const DELETE_${actionName} = 'DELETE_${actionName}';
  export const DELETE_${actionName}_SUCCESS = 'DELETE_${actionName}_SUCCESS';
  export const DELETE_${actionName}_FAIL = 'DELETE_${actionName}_FAIL';
  `;
};

const createAction = (actionName, apiSmall, apiCap) => {
  return `
  import {
    API_RESPONSE_SUCCESS,
    API_RESPONSE_ERROR,
    GET_${actionName},
    GET_${actionName}_BY_ID,
    ADD_NEW_${actionName},
    ADD_${actionName}_SUCCESS,
    ADD_${actionName}_FAIL,
    ADD_${actionName}_RESET,
    DELETE_${actionName},
    DELETE_${actionName}_SUCCESS,
    DELETE_${actionName}_FAIL,
    UPDATE_${actionName},
    UPDATE_${actionName}_SUCCESS,
    UPDATE_${actionName}_FAIL,
    SELECTED_${actionName},
  } from './actionType';
  
  // common success
  export const ${apiSmall}ApiResponseSuccess = (actionType, data) => ({
    type: API_RESPONSE_SUCCESS,
    payload: { actionType, data },
  });
  // common error
  export const ${apiSmall}ApiResponseError = (actionType, error) => ({
    type: API_RESPONSE_ERROR,
    payload: { actionType, error },
  });
  
  export const get${apiCap} = (data) => ({
    type: GET_${actionName},
    payload: data,
  });
  
  export const get${apiCap}byId = (id) => ({
    type: GET_${actionName}_BY_ID,
    payload: id,
  });
  
  export const selected${apiCap} = (${apiSmall}) => ({
    type: SELECTED_${actionName},
    payload: ${apiSmall},
  });
  
  export const addNew${apiCap} = (${apiSmall}) => ({
    type: ADD_NEW_${actionName},
    payload: ${apiSmall},
  });
  
  export const add${apiCap}Success = (${apiSmall}) => ({
    type: ADD_${actionName}_SUCCESS,
    payload: ${apiSmall},
  });
  
  export const add${apiCap}Fail = (error) => ({
    type: ADD_${actionName}_FAIL,
    payload: error,
  });
  
  export const add${apiCap}Reset = () => ({
    type: ADD_${actionName}_RESET,
  });
  
  export const delete${apiCap} = (${apiSmall}) => ({
    type: DELETE_${actionName},
    payload: ${apiSmall},
  });
  
  export const delete${apiCap}Success = (${apiSmall}) => ({
    type: DELETE_${actionName}_SUCCESS,
    payload: ${apiSmall},
  });
  
  export const delete${apiCap}Fail = (error) => ({
    type: DELETE_${actionName}_FAIL,
    payload: error,
  });
  
  export const update${apiCap} = (${apiSmall}) => ({
    type: UPDATE_${actionName},
    payload: ${apiSmall},
  });
  
  export const update${apiCap}Success = (${apiSmall}) => ({
    type: UPDATE_${actionName}_SUCCESS,
    payload: ${apiSmall},
  });
  
  export const update${apiCap}Fail = (error) => ({
    type: UPDATE_${actionName}_FAIL,
    payload: error,
  });
  `;
};

const createReducer = (actionName, apiSmall, apiCap) => {
  return `
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
  
  const ${apiCap} = (state = INIT_STATE, action) => {
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
  
  export default ${apiCap};
  `;
};

const createSaga = (actionName, apiSmall, apiCap) => {
  return `
  import { call, put, takeEvery, all, fork } from 'redux-saga/effects';
  
  import { toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
  
  // crm Redux States
  import {
    GET_${actionName},
    GET_${actionName}_BY_ID,
    ADD_NEW_${actionName},
    DELETE_${actionName},
    UPDATE_${actionName},
  } from './actionType';
  
  import {
    ${apiSmall}ApiResponseSuccess,
    ${apiSmall}ApiResponseError,
    add${apiCap}Fail,
    add${apiCap}Success,
    delete${apiCap}Success,
    delete${apiCap}Fail,
    update${apiCap}Success,
    update${apiCap}Fail,
  } from './action';
  
  //Include Both Helper File with needed methods
  import {
    get${apiCap} as get${apiCap}Api,
    get${apiCap}ById as get${apiCap}ByIdApi,
    addNew${apiCap},
    delete${apiCap},
    update${apiCap},
  } from '@helpers/backend_helper';
  
  function* get${apiCap}({ payload: data }) {
    try {
      const response = yield call(get${apiCap}Api, data);
  
      yield put(${apiSmall}ApiResponseSuccess(GET_${actionName}, response));
    } catch (error) {
      yield put(${apiSmall}ApiResponseError(GET_${actionName}, error));
    }
  }
  
  function* get${apiCap}ById({ payload: id }) {
    try {
      const response = yield call(get${apiCap}ByIdApi, id);
      yield put(${apiSmall}ApiResponseSuccess(GET_${actionName}_BY_ID, response.data));
    } catch (error) {
      yield put(${apiSmall}ApiResponseError(GET_${actionName}_BY_ID, error));
    }
  }
  
  function* onAddNew${apiCap}({ payload: ${apiSmall} }) {
    try {
      const response = yield call(addNew${apiCap}, {
        collectionName: '${apiSmall}s',
        action: 'INSERT',
        data: ${apiSmall},
      });
      yield put(add${apiCap}Success(${apiSmall}));
      toast.success('${apiCap} Added Successfully', { autoClose: 3000 });
    } catch (error) {
      yield put(add${apiCap}Fail(error));
      toast.error('${apiCap} Added Failed', { autoClose: 3000 });
    }
  }
  
  function* onDelete${apiCap}({ payload: ${apiSmall} }) {
    try {
      const response = yield call(delete${apiCap}, ${apiSmall});
      yield put(delete${apiCap}Success(response));
      toast.success('${apiCap} Deleted Successfully', { autoClose: 3000 });
    } catch (error) {
      yield put(delete${apiCap}Fail(error));
      toast.error('${apiCap} Deleted Failed', { autoClose: 3000 });
    }
  }
  
  function* onUpdate${apiCap}({ payload: ${apiSmall} }) {
    try {
      const response = yield call(update${apiCap}, ${apiSmall});
      yield put(update${apiCap}Success(response));
      toast.success('${apiCap} Updated Successfully', { autoClose: 3000 });
    } catch (error) {
      yield put(update${apiCap}Fail(error));
      toast.error('${apiCap} Updated Failed', { autoClose: 3000 });
    }
  }
  
  export function* watchGet${apiCap}() {
    yield takeEvery(GET_${actionName}, get${apiCap});
  }
  
  export function* watchGet${apiCap}ById() {
    yield takeEvery(GET_${actionName}_BY_ID, get${apiCap}ById);
  }
  
  export function* watchAddNew${apiCap}() {
    yield takeEvery(ADD_NEW_${actionName}, onAddNew${apiCap});
  }
  export function* watchDelete${apiCap}() {
    yield takeEvery(DELETE_${actionName}, onDelete${apiCap});
  }
  
  export function* watchUpdate${apiCap}() {
    yield takeEvery(UPDATE_${actionName}, onUpdate${apiCap});
  }
  
  function* ${apiCap}Saga() {
    yield all([
      fork(watchGet${apiCap}),
      fork(watchGet${apiCap}ById),
      fork(watchAddNew${apiCap}),
      fork(watchDelete${apiCap}),
      fork(watchUpdate${apiCap}),
    ]);
  }
  
  export default ${apiCap}Saga;
  `;
};
console.log(`Generating Store As`, inputParams);

const actionTypeString = createActionType(inputParams[4]);
if (fs.existsSync(__dirname + "/out/actionType.js")) {
  fs.unlinkSync(__dirname + "/out/actionType.js");
}
fs.writeFileSync(__dirname + "/out/actionType.js", actionTypeString);
console.log("File created actionType.js");

const actionString = createAction(
  inputParams[4],
  inputParams[2],
  inputParams[3]
);
if (fs.existsSync(__dirname + "/out/action.js")) {
  fs.unlinkSync(__dirname + "/out/action.js");
}
fs.writeFileSync(__dirname + "/out/action.js", actionString);
console.log("File created action.js");

const reducerString = createReducer(
  inputParams[4],
  inputParams[2],
  inputParams[3]
);
if (fs.existsSync(__dirname + "/out/reducer.js")) {
  fs.unlinkSync(__dirname + "/out/reducer.js");
}
fs.writeFileSync(__dirname + "/out/reducer.js", reducerString);
console.log("File created reducer.js");

const sagaString = createSaga(inputParams[4], inputParams[2], inputParams[3]);
if (fs.existsSync(__dirname + "/out/saga.js")) {
  fs.unlinkSync(__dirname + "/out/saga.js");
}
fs.writeFileSync(__dirname + "/out/saga.js", sagaString);
console.log("File created saga.js");
