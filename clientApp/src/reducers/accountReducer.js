import {
  GET_ACCOUNT_TYPES,
  ADD_ACCOUNT_TYPE,
  DELETE_ACCOUNT_TYPE,
  ADD_ACCOUNT,
  DELETE_ACCOUNT,
  GET_ACCOUNTS,
  ACCOUNTS_LOADING,
  GET_ACCOUNT_CATEGORIES,
  ADD_ACCOUNT_CATEGORY,
  DELETE_ACCOUNT_CATEGORY,
  GET_ACCOUNT_SUB_CATEGORIES,
  ADD_ACCOUNT_SUB_CATEGORY,
  DELETE_ACCOUNT_SUB_CATEGORY,
} from "../actions/types";

const initialState = {
  items: [],
  accTypes: [],
  accSubCategories: [],
  accCategories: [],
  message: "",
  accountsLoading: true,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ACCOUNTS_LOADING:
      return {
        ...state,
        accountsLoading: true,
      };
    case GET_ACCOUNT_TYPES:
      return {
        ...state,
        accTypes: action.payload,
        accountsLoading: false,
      };

    case ADD_ACCOUNT_TYPE:
      return {
        ...state,
        accTypes: [...state.accTypes, action.payload],
        accountsLoading: false,
      };
    case DELETE_ACCOUNT_TYPE:
      return {
        ...state,
        accountsLoading: false,
      };

    case GET_ACCOUNT_CATEGORIES:
      return {
        ...state,
        accCategories: action.payload,
        accountsLoading: false,
      };

    case ADD_ACCOUNT_CATEGORY:
      return {
        ...state,
        accountsLoading: false,
      };

    case DELETE_ACCOUNT_CATEGORY:
      return {
        ...state,
        accCategories: action.payload,
        accountsLoading: false,
      };

    case GET_ACCOUNT_SUB_CATEGORIES:
      return {
        ...state,
        accSubCategories: action.payload,
        accountsLoading: false,
      };

    case ADD_ACCOUNT_SUB_CATEGORY:
      return {
        ...state,
        message: action.payload.message,
        accSubCategories: state.accSubCategories,
        accountsLoading: false,
      };
    case DELETE_ACCOUNT_SUB_CATEGORY:
      return {
        ...state,
        accountsLoading: false,
      };

    case DELETE_ACCOUNT_CATEGORY:
      return {
        ...state,
        accCategories: action.payload,
        accountsLoading: false,
      };
    case ADD_ACCOUNT:
      return {
        ...state,
      };
    case DELETE_ACCOUNT:
      return {
        ...state,
        items: state.items.filter((account) => account._id !== action.payload),
      };
    case GET_ACCOUNTS:
      return {
        ...state,
        items: action.payload,
        accountsLoading: false,
      };
    default:
      return state;
  }
}
