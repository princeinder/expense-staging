import {
  GET_TRANSACTIONS,
  TRANSACTIONS_LOADING,
  ADD_TRANSACTION,
  UPDATE_TRANSACTION,
  DELETE_TRANSACTION,
} from "../actions/types";

const initialState = {
  transactions: [],
  message: "",
  transactionsLoading: false,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case TRANSACTIONS_LOADING:
      return {
        ...state,
        transactionsLoading: true,
      };
    case ADD_TRANSACTION:
      return {
        ...state,
        message: action.payload,
        transactionsLoading: false,
      };
    case GET_TRANSACTIONS:
      return {
        ...state,
        transactions: action.payload,
        transactionsLoading: false,
      };
    case UPDATE_TRANSACTION:
      return {
        ...state,
        message: action.payload,
        transactionsLoading: false,
      };
    case DELETE_TRANSACTION:
      return {
        ...state,
        transactions: state.transactions.filter(
          (x) => x.transaction_id != action.payload.data
        ),
        message: action.payload.message,
        transactionsLoading: false,
      };

    default:
      return state;
  }
}
