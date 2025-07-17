// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import {
//   API_RESPONSE_SUCCESS,
//   API_RESPONSE_ERROR,
//   GET_TICKETS,
//   GET_TICKET_BY_ID,
//   GET_TICKETS_BY_ASSIGNED_ID,
//   SELECTED_TICKET,
//   ADD_NEW_TICKET,
//   ADD_TICKET_SUCCESS,
//   ADD_TICKET_FAIL,
//   ADD_TICKET_RESET,
//   DELETE_TICKET_SUCCESS,
//   DELETE_TICKET_FAIL,
//   UPDATE_TICKET_SUCCESS,
//   UPDATE_TICKET_FAIL,
//   ASSIGN_TICKET_SUCCESS,
//   ASSIGN_TICKET_FAIL,
//   RESET_ADD_UPDATE_NEW_TICKET,
//   GET_TICKET_RESPONSES,
//   ADD_TICKET_RESPONSE_SUCCESS,
//   ADD_TICKET_RESPONSE_FAIL,
//   UPDATE_TICKET_RESPONSE_SUCCESS,
//   UPDATE_TICKET_RESPONSE_FAIL,
//   DELETE_TICKET_RESPONSE_SUCCESS,
//   DELETE_TICKET_RESPONSE_FAIL,
//   GET_TATS,
//   ADD_TAT_SUCCESS,
//   ADD_TAT_FAIL,
//   UPDATE_TAT_SUCCESS,
//   UPDATE_TAT_FAIL,
//   DELETE_TAT_SUCCESS,
//   DELETE_TAT_FAIL,
//   GET_CATEGORY_GROUPS,
//   ADD_CATEGORY_GROUP_SUCCESS,
//   ADD_CATEGORY_GROUP_FAIL,
//   UPDATE_CATEGORY_GROUP_SUCCESS,
//   UPDATE_CATEGORY_GROUP_FAIL,
//   DELETE_CATEGORY_GROUP_SUCCESS,
//   DELETE_CATEGORY_GROUP_FAIL,
//   GET_CATEGORIES,
//   ADD_CATEGORY_SUCCESS,
//   ADD_CATEGORY_FAIL,
//   UPDATE_CATEGORY_SUCCESS,
//   UPDATE_CATEGORY_FAIL,
//   DELETE_CATEGORY_SUCCESS,
//   DELETE_CATEGORY_FAIL,
//   GET_DEPARTMENTS,
//   ADD_DEPARTMENT_SUCCESS,
//   ADD_DEPARTMENT_FAIL,
//   UPDATE_DEPARTMENT_SUCCESS,
//   UPDATE_DEPARTMENT_FAIL,
//   DELETE_DEPARTMENT_SUCCESS,
//   DELETE_DEPARTMENT_FAIL,
// } from './actionType';

// const INIT_STATE = {
//   tickets: [],
//   ticketById: null,
//   ticketsByAssignedId: [],
//   selectedTicket: null,
//   ticketResponses: [],
//   tats: [],
//   categoryGroups: [],
//   categories: [],
//   departments: [],
//   error: null,
//   isGetTicketsSuccess: false,
//   isGetTicketsRequested: false,
//   isGetTicketByIdSuccess: false,
//   isGetTicketByIdRequested: false,
//   isTicketCreatedSuccess: false,
//   isTicketCreatedRequested: false,
//   isTicketUpdateSuccess: false,
//   isTicketUpdateRequested: false,
//   isTicketAssignSuccess: false,
//   isTicketAssignRequested: false,
// };

// const Tickets = (state = INIT_STATE, action) => {
//   switch (action.type) {
//     case API_RESPONSE_SUCCESS:
//       switch (action.payload.actionType) {
//         case GET_TICKETS:
//           return {
//             ...state,
//             tickets: action.payload.data.data,
//             isGetTicketsSuccess: true,
//             isGetTicketsRequested: false,
//           };
        
//         case GET_TICKETS_BY_ASSIGNED_ID:
//           return {
//             ...state,
//             ticketsByAssignedId: action.payload.data.data,
//             isGetTicketsByAssignedIdSuccess: true,
//             isGetTicketsByAssignedIdRequested: false,
//           };

//         case GET_TICKET_BY_ID:
//           return {
//             ...state,
//             ticketById: action.payload.data,
//             isGetTicketByIdSuccess: true,
//             isGetTicketByIdRequested: false,
//           };

//         case GET_TICKET_RESPONSES:
//           return {
//             ...state,
//             ticketResponses: action.payload.data.data,
//             isGetTicketResponsesSuccess: true,
//             isGetTicketResponsesRequested: false,
//           };

//         case GET_TATS:
//           return {
//             ...state,
//             tats: action.payload.data.data,
//             isGetTatsSuccess: true,
//             isGetTatsRequested: false,
//           };

//         case GET_CATEGORY_GROUPS:
//           return {
//             ...state,
//             categoryGroups: action.payload.data.data,
//             isGetCategoryGroupsSuccess: true,
//             isGetCategoryGroupsRequested: false,
//           };

//         case GET_CATEGORIES:
//           return {
//             ...state,
//             categories: action.payload.data.data,
//             isGetCategoriesSuccess: true,
//             isGetCategoriesRequested: false,
//           };

//         case GET_DEPARTMENTS:
//           return {
//             ...state,
//             departments: action.payload.data.data,
//             isGetDepartmentsSuccess: true,
//             isGetDepartmentsRequested: false,
//           };

//         default:
//           return { ...state };
//       }

//     case API_RESPONSE_ERROR:
//       switch (action.payload.actionType) {
//         case GET_TICKETS:
//           return {
//             ...state,
//             error: action.payload.error,
//             isGetTicketsSuccess: false,
//             isGetTicketsRequested: false,
//           };

//         case GET_TICKETS_BY_ASSIGNED_ID:
//           return {
//             ...state,
//             error: action.payload.error,
//             isGetTicketsByAssignedIdSuccess: false,
//             isGetTicketsByAssignedIdRequested: false,
//           };

//         case GET_TICKET_BY_ID:
//           return {
//             ...state,
//             error: action.payload.error,
//             isGetTicketByIdSuccess: false,
//             isGetTicketByIdRequested: false,
//           };

//         case GET_TICKET_RESPONSES:
//           return {
//             ...state,
//             error: action.payload.error,
//             isGetTicketResponsesSuccess: false,
//             isGetTicketResponsesRequested: false,
//           };

//         case GET_TATS:
//           return {
//             ...state,
//             error: action.payload.error,
//             isGetTatsSuccess: false,
//             isGetTatsRequested: false,
//           };

//         case GET_CATEGORY_GROUPS:
//           return {
//             ...state,
//             error: action.payload.error,
//             isGetCategoryGroupsSuccess: false,
//             isGetCategoryGroupsRequested: false,
//           };

//         case GET_CATEGORIES:
//           return {
//             ...state,
//             error: action.payload.error,
//             isGetCategoriesSuccess: false,
//             isGetCategoriesRequested: false,
//           };

//         case GET_DEPARTMENTS:
//           return {
//             ...state,
//             error: action.payload.error,
//             isGetDepartmentsSuccess: false,
//             isGetDepartmentsRequested: false,
//           };

//         default:
//           return { ...state };
//       }

//     case GET_TICKETS:
//       return {
//         ...state,
//         isGetTicketsSuccess: false,
//         isGetTicketsRequested: true,
//       };

//     case GET_TICKETS_BY_ASSIGNED_ID:
//       return {
//         ...state,
//         isGetTicketsByAssignedIdSuccess: false,
//         isGetTicketsByAssignedIdRequested: true,
//       };

//     case GET_TICKET_BY_ID:
//       return {
//         ...state,
//         isGetTicketByIdSuccess: false,
//         isGetTicketByIdRequested: true,
//       };

//     case GET_TICKET_RESPONSES:
//       return {
//         ...state,
//         isGetTicketResponsesSuccess: false,
//         isGetTicketResponsesRequested: true,
//       };

//     case GET_TATS:
//       return {
//         ...state,
//         isGetTatsSuccess: false,
//         isGetTatsRequested: true,
//       };

//     case GET_CATEGORY_GROUPS:
//       return {
//         ...state,
//         isGetCategoryGroupsSuccess: false,
//         isGetCategoryGroupsRequested: true,
//       };

//     case GET_CATEGORIES:
//       return {
//         ...state,
//         isGetCategoriesSuccess: false,
//         isGetCategoriesRequested: true,
//       };

//     case GET_DEPARTMENTS:
//       return {
//         ...state,
//         isGetDepartmentsSuccess: false,
//         isGetDepartmentsRequested: true,
//       };

//     case SELECTED_TICKET:
//       localStorage.setItem('selectedTicket', JSON.stringify(action.payload));
//       return {
//         ...state,
//         selectedTicket: action.payload,
//       };

//     case ADD_NEW_TICKET:
//       return {
//         ...state,
//         isTicketCreatedSuccess: false,
//         isTicketCreatedRequested: true,
//       };

//     case ADD_TICKET_SUCCESS:
//       return {
//         ...state,
//         tickets: [...state.tickets, action.payload.data],
//         isTicketCreatedSuccess: true,
//         isTicketCreatedRequested: false,
//       };

//     case ADD_TICKET_FAIL:
//       return {
//         ...state,
//         error: action.payload,
//         isTicketCreatedSuccess: false,
//         isTicketCreatedRequested: false,
//       };

//     case ADD_TICKET_RESET:
//       return {
//         ...state,
//         error: null,
//         isTicketCreatedSuccess: false,
//         isTicketCreatedRequested: false,
//       };

//     case UPDATE_TICKET_SUCCESS:
//       return {
//         ...state,
//         tickets: state.tickets.map((ticket) =>
//           ticket.id.toString() === action.payload.data.id.toString()
//             ? { ...ticket, ...action.payload.data }
//             : ticket
//         ),
//         isTicketUpdateSuccess: true,
//         isTicketUpdateRequested: false,
//       };

//     case UPDATE_TICKET_FAIL:
//       return {
//         ...state,
//         error: action.payload,
//         isTicketUpdateSuccess: false,
//         isTicketUpdateRequested: true,
//       };

//     case ASSIGN_TICKET_SUCCESS:
//       return {
//         ...state,
//         tickets: state.tickets.map((ticket) =>
//           ticket.id.toString() === action.payload.data.id.toString()
//             ? { ...ticket, ...action.payload.data }
//             : ticket
//         ),
//         isTicketAssignSuccess: true,
//         isTicketAssignRequested: false,
//       };

//     case ASSIGN_TICKET_FAIL:
//       return {
//         ...state,
//         error: action.payload,
//         isTicketAssignSuccess: false,
//         isTicketAssignRequested: false,
//       };

//     case DELETE_TICKET_SUCCESS:
//       return {
//         ...state,
//         tickets: state.tickets.filter((ticket) =>
//           ticket.id.toString() !== action.payload.data.id.toString()
//         ),
//       };

//     case DELETE_TICKET_FAIL:
//       return {
//         ...state,
//         error: action.payload,
//       };

//     // Ticket responses
//     case ADD_TICKET_RESPONSE_SUCCESS:
//       return {
//         ...state,
//         ticketResponses: [...state.ticketResponses, action.payload.data],
//         isTicketResponseCreatedSuccess: true,
//         isTicketResponseCreatedRequested: false,
//       };

//     case ADD_TICKET_RESPONSE_FAIL:
//       return {
//         ...state,
//         error: action.payload,
//         isTicketResponseCreatedSuccess: false,
//         isTicketResponseCreatedRequested: false,
//       };

//     case UPDATE_TICKET_RESPONSE_SUCCESS:
//       return {
//         ...state,
//         ticketResponses: state.ticketResponses.map((response) =>
//           response.id.toString() === action.payload.data.id.toString()
//             ? { ...response, ...action.payload.data }
//             : response
//         ),
//         isTicketResponseUpdateSuccess: true,
//         isTicketResponseUpdateRequested: false,
//       };

//     case UPDATE_TICKET_RESPONSE_FAIL:
//       return {
//         ...state,
//         error: action.payload,
//         isTicketResponseUpdateSuccess: false,
//         isTicketResponseUpdateRequested: false,
//       };

//     case DELETE_TICKET_RESPONSE_SUCCESS:
//       return {
//         ...state,
//         ticketResponses: state.ticketResponses.filter((response) =>
//           response.id.toString() !== action.payload.data.id.toString()
//         ),
//       };

//     case DELETE_TICKET_RESPONSE_FAIL:
//       return {
//         ...state,
//         error: action.payload,
//       };

//     // TAT actions
//     case ADD_TAT_SUCCESS:
//       return {
//         ...state,
//         tats: [...state.tats, action.payload.data],
//         isTatCreatedSuccess: true,
//         isTatCreatedRequested: false,
//       };

//     case ADD_TAT_FAIL:
//       return {
//         ...state,
//         error: action.payload,
//         isTatCreatedSuccess: false,
//         isTatCreatedRequested: false,
//       };

//     case UPDATE_TAT_SUCCESS:
//       return {
//         ...state,
//         tats: state.tats.map((tat) =>
//           tat.id.toString() === action.payload.data.id.toString()
//             ? { ...tat, ...action.payload.data }
//             : tat
//         ),
//         isTatUpdateSuccess: true,
//         isTatUpdateRequested: false,
//       };

//     case UPDATE_TAT_FAIL:
//       return {
//         ...state,
//         error: action.payload,
//         isTatUpdateSuccess: false,
//         isTatUpdateRequested: false,
//       };

//     case DELETE_TAT_SUCCESS:
//       return {
//         ...state,
//         tats: state.tats.filter((tat) =>
//           tat.id.toString() !== action.payload.data.id.toString()
//         ),
//       };

//     case DELETE_TAT_FAIL:
//       return {
//         ...state,
//         error: action.payload,
//       };

//     // Category Group actions
//     case ADD_CATEGORY_GROUP_SUCCESS:
//       return {
//         ...state,
//         categoryGroups: [...state.categoryGroups, action.payload.data],
//         isCategoryGroupCreatedSuccess: true,
//         isCategoryGroupCreatedRequested: false,
//       };

//     case ADD_CATEGORY_GROUP_FAIL:
//       return {
//         ...state,
//         error: action.payload,
//         isCategoryGroupCreatedSuccess: false,
//         isCategoryGroupCreatedRequested: false,
//       };

//     case UPDATE_CATEGORY_GROUP_SUCCESS:
//       return {
//         ...state,
//         categoryGroups: state.categoryGroups.map((group) =>
//           group.id.toString() === action.payload.data.id.toString()
//             ? { ...group, ...action.payload.data }
//             : group
//         ),
//         isCategoryGroupUpdateSuccess: true,
//         isCategoryGroupUpdateRequested: false,
//       };

//     case UPDATE_CATEGORY_GROUP_FAIL:
//       return {
//         ...state,
//         error: action.payload,
//         isCategoryGroupUpdateSuccess: false,
//         isCategoryGroupUpdateRequested: false,
//       };

//     case DELETE_CATEGORY_GROUP_SUCCESS:
//       return {
//         ...state,
//         categoryGroups: state.categoryGroups.filter((group) =>
//           group.id.toString() !== action.payload.data.id.toString()
//         ),
//       };

//     case DELETE_CATEGORY_GROUP_FAIL:
//       return {
//         ...state,
//         error: action.payload,
//       };

//     // Category actions
//     case ADD_CATEGORY_SUCCESS:
//       return {
//         ...state,
//         categories: [...state.categories, action.payload.data],
//         isCategoryCreatedSuccess: true,
//         isCategoryCreatedRequested: false,
//       };

//     case ADD_CATEGORY_FAIL:
//       return {
//         ...state,
//         error: action.payload,
//         isCategoryCreatedSuccess: false,
//         isCategoryCreatedRequested: false,
//       };

//     case UPDATE_CATEGORY_SUCCESS:
//       return {
//         ...state,
//         categories: state.categories.map((category) =>
//           category.id.toString() === action.payload.data.id.toString()
//             ? { ...category, ...action.payload.data }
//             : category
//         ),
//         isCategoryUpdateSuccess: true,
//         isCategoryUpdateRequested: false,
//       };

//     case UPDATE_CATEGORY_FAIL:
//       return {
//         ...state,
//         error: action.payload,
//         isCategoryUpdateSuccess: false,
//         isCategoryUpdateRequested: false,
//       };

//     case DELETE_CATEGORY_SUCCESS:
//       return {
//         ...state,
//         categories: state.categories.filter((category) =>
//           category.id.toString() !== action.payload.data.id.toString()
//         ),
//       };

//     case DELETE_CATEGORY_FAIL:
//       return {
//         ...state,
//         error: action.payload,
//       };

//     // Department actions
//     case ADD_DEPARTMENT_SUCCESS:
//       return {
//         ...state,
//         departments: [...state.departments, action.payload.data],
//         isDepartmentCreatedSuccess: true,
//         isDepartmentCreatedRequested: false,
//       };

//     case ADD_DEPARTMENT_FAIL:
//       return {
//         ...state,
//         error: action.payload,
//         isDepartmentCreatedSuccess: false,
//         isDepartmentCreatedRequested: false,
//       };

//     case UPDATE_DEPARTMENT_SUCCESS:
//       return {
//         ...state,
//         departments: state.departments.map((department) =>
//           department.id.toString() === action.payload.data.id.toString()
//             ? { ...department, ...action.payload.data }
//             : department
//         ),
//         isDepartmentUpdateSuccess: true,
//         isDepartmentUpdateRequested: false,
//       };

//     case UPDATE_DEPARTMENT_FAIL:
//       return {
//         ...state,
//         error: action.payload,
//         isDepartmentUpdateSuccess: false,
//         isDepartmentUpdateRequested: false,
//       };

//     case DELETE_DEPARTMENT_SUCCESS:
//       return {
//         ...state,
//         departments: state.departments.filter((department) =>
//           department.id.toString() !== action.payload.data.id.toString()
//         ),
//       };

//     case DELETE_DEPARTMENT_FAIL:
//       return {
//         ...state,
//         error: action.payload,
//       };

//     case RESET_ADD_UPDATE_NEW_TICKET:
//       return {
//         ...state,
//         isTicketCreatedSuccess: false,
//         isTicketUpdateSuccess: false,
//       };
      
//     default:
//       return state;
//   }
// };

// export default Tickets;