import { GET_INS, INS_LOADING } from "../actions/types";

const initialState = {
  items: [],
  insLoading: false,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case TRANSACTIONS_LOADING:
      return {
        ...state,
        transactionsLoading: true,
      };
    case GET_TRANSACTIONS:
      return {
        ...state,
        items: action.payload,
        transactionsLoading: false,
      };
    default:
      return state;
  }
}
