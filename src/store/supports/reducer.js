import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
  DELETE_TICKETS_CATEGORY_GROUP_SUCCESS,
  DELETE_TICKETS_CATEGORY_GROUP_FAIL,
  RESET_ADD_UPDATE_TICKETS_CATEGORY_GROUP,
} from './actionType';

const INIT_STATE = {
  ticketsCategoryGroups: [],
  error: null,
  ticketsCategoryGroupById: null,
  selectedTicketsCategoryGroup: null,
  isGetTicketsCategoryGroupsRequested: false,
  isGetTicketsCategoryGroupByIdRequested: false,
  isAddTicketsCategoryGroupRequested: false,
  isUpdateTicketsCategoryGroupRequested: false,
};

const TicketsCategoryGroup = (state = INIT_STATE, action) => {
  switch (action.type) {
    case API_RESPONSE_SUCCESS:
      switch (action.payload.actionType) {
        case GET_TICKETS_CATEGORY_GROUPS:
          return {
            ...state,
            ticketsCategoryGroups: action.payload.data,
            isGetTicketsCategoryGroupsSuccess: true,
            isGetTicketsCategoryGroupsRequested: false,
          };
        default:
          return { ...state };
      }
    case API_RESPONSE_ERROR:
      switch (action.payload.actionType) {
        case GET_TICKETS_CATEGORY_GROUPS:
          return {
            ...state,
            error: action.payload.error,
            isGetTicketsCategoryGroupsSuccess: false,
          };
        default:
          return { ...state };
      }
    case GET_TICKETS_CATEGORY_GROUPS:
      return {
        ...state,
        isGetTicketsCategoryGroupsSuccess: false,
        isGetTicketsCategoryGroupsRequested: true,
      };
    case SELECTED_TICKETS_CATEGORY_GROUP:
      localStorage.setItem(
        'selectedTicketsCategoryGroup',
        JSON.stringify(action.payload)
      );
      return {
        ...state,
        selectedTicketsCategoryGroup: action.payload,
      };
    case ADD_NEW_TICKETS_CATEGORY_GROUP:
      return {
        ...state,
        isAddTicketsCategoryGroupSuccess: false,
        isAddTicketsCategoryGroupRequested: true,
      };
    case ADD_TICKETS_CATEGORY_GROUP_SUCCESS:
      return {
        ...state,
        ticketsCategoryGroups: [
          ...state.ticketsCategoryGroups,
          action.payload.data,
        ],
        isAddTicketsCategoryGroupSuccess: true,
        isAddTicketsCategoryGroupRequested: false,
      };
    case ADD_TICKETS_CATEGORY_GROUP_FAIL:
      return {
        ...state,
        error: action.payload,
        isAddTicketsCategoryGroupSuccess: false,
        isAddTicketsCategoryGroupRequested: false,
      };
    case ADD_TICKETS_CATEGORY_GROUP_RESET:
      return {
        ...state,
        error: null,
        isAddTicketsCategoryGroupSuccess: false,
        isAddTicketsCategoryGroupRequested: false,
      };
    case DELETE_TICKETS_CATEGORY_GROUP_SUCCESS:
      return {
        ...state,
        ticketsCategoryGroups: state.ticketsCategoryGroups.filter(
          (group) => group.id !== action.payload.id
        ),
        error: null,
      };
    case DELETE_TICKETS_CATEGORY_GROUP_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    case UPDATE_TICKETS_CATEGORY_GROUP:
      return {
        ...state,
        isUpdateTicketsCategoryGroupSuccess: false,
        isUpdateTicketsCategoryGroupRequested: true,
      };
    case UPDATE_TICKETS_CATEGORY_GROUP_SUCCESS:
      return {
        ...state,
        ticketsCategoryGroups: state.ticketsCategoryGroups.map((group) =>
          group.id.toString() === action.payload.data.id.toString()
            ? { ...group, ...action.payload.data }
            : group
        ),
        isUpdateTicketsCategoryGroupSuccess: true,
        isUpdateTicketsCategoryGroupRequested: false,
      };
    case UPDATE_TICKETS_CATEGORY_GROUP_FAIL:
      return {
        ...state,
        error: action.payload,
        isUpdateTicketsCategoryGroupSuccess: false,
        isUpdateTicketsCategoryGroupRequested: false,
      };
    case RESET_ADD_UPDATE_TICKETS_CATEGORY_GROUP:
      return {
        ...state,
        isAddTicketsCategoryGroupSuccess: false,
        isUpdateTicketsCategoryGroupSuccess: false,
      };
    default:
      return { ...state };
  }
};

export default TicketsCategoryGroup;
