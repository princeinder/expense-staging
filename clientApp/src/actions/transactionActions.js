import axios from "axios";

import {
  GET_TRANSACTIONS,
  TRANSACTIONS_LOADING,
  ADD_TRANSACTION,
  UPDATE_TRANSACTION,
  DELETE_TRANSACTION,
  GET_ERRORS,
} from "./types";

// Get Transactions
export const getTransactions = () => (dispatch) => {
  dispatch(setTransactionsLoading());
  axios
    .get("/api/account/acctransactions", {
      headers: {
        Authorization: localStorage.jwtToken,
      },
    })
    .then((res) => {
      dispatch({
        type: GET_TRANSACTIONS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: GET_TRANSACTIONS,
        payload: null,
      });
    });
};

export const addAccTransaction = (accTransData) => (dispatch) => {
  dispatch(setTransactionsLoading());
  axios
    .post("/api/account/acctransaction/add", accTransData, {
      headers: {
        Authorization: localStorage.jwtToken,
      },
    })
    .then((res) => {
      dispatch({
        type: ADD_TRANSACTION,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    });
};

export const updateTransaction = (accTransData, id) => (dispatch) => {
  dispatch(setTransactionsLoading());
  axios
    .put(`/api/account/acctransaction/update/${id}`, accTransData, {
      headers: {
        Authorization: localStorage.jwtToken,
      },
    })
    .then((res) => {
      dispatch({
        type: UPDATE_TRANSACTION,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    });
};

export const deleteTransaction = (id) => (dispatch) => {
  dispatch(setTransactionsLoading());
  axios
    .delete(`/api/account/acctransaction/delete/${id}`, {
      headers: {
        Authorization: localStorage.jwtToken,
      },
    })
    .then((res) => {
      dispatch({
        type: DELETE_TRANSACTION,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    });
};

// Transactions loading
export const setTransactionsLoading = () => {
  return {
    type: TRANSACTIONS_LOADING,
  };
};
