import axios from "axios";

import {
  GET_ACCOUNT_TYPES,
  ADD_ACCOUNT_TYPE,
  DELETE_ACCOUNT_TYPE,
  ADD_ACCOUNT,
  DELETE_ACCOUNT,
  GET_ACCOUNTS,
  ACCOUNTS_LOADING,
  GET_ERRORS,
  ADD_ACCOUNT_CATEGORY,
  DELETE_ACCOUNT_CATEGORY,
  GET_ACCOUNT_CATEGORIES,
  ADD_ACCOUNT_SUB_CATEGORY,
  GET_ACCOUNT_SUB_CATEGORIES,
  DELETE_ACCOUNT_SUB_CATEGORY,
} from "./types";

export const getAccTypes = () => (dispatch) => {
  dispatch(setAccountsLoading());
  axios
    .get("/api/account/acctypes", {
      headers: {
        Authorization: localStorage.jwtToken,
      },
    })
    .then((res) => {
      dispatch({
        type: GET_ACCOUNT_TYPES,
        payload: res.data,
      });
    })
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

export const addAccType = (accTypeData) => (dispatch) => {
  dispatch(setAccountsLoading());
  axios
    .post("/api/account/acctype/add", accTypeData, {
      headers: {
        Authorization: localStorage.jwtToken,
      },
    })
    .then((res) => {
      dispatch({
        type: ADD_ACCOUNT_TYPE,
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

export const deleteAccType = (id) => (dispatch) => {
  dispatch(setAccountsLoading());
  axios
    .delete(`/api/account/acctype/${id}`, {
      headers: {
        Authorization: localStorage.jwtToken,
      },
    })
    .then((res) => {
      dispatch(getAccTypes());
    })
    .then((data) => {
      console.log(data);
      // data ? dispatch(getAccTypes()) : null;
    })
    .catch((err) => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    });
};

export const addAccCategory = (accCatData) => (dispatch) => {
  dispatch(setAccountsLoading());
  axios
    .post("/api/account/acccategory/add", accCatData, {
      headers: {
        Authorization: localStorage.jwtToken,
      },
    })
    .then((res) => {
      dispatch({
        type: ADD_ACCOUNT_CATEGORY,
      });
    })
    .then((data) => (data ? dispatch(getAccTypes()) : null))
    .catch((err) => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    });
};

export const getAccCategories = () => (dispatch) => {
  dispatch(setAccountsLoading());
  axios
    .get("/api/account/acccategories", {
      headers: {
        Authorization: localStorage.jwtToken,
      },
    })
    .then((res) => {
      dispatch({
        type: GET_ACCOUNT_CATEGORIES,
        payload: res.data,
      });
    })
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

export const getAccCategoriesByName = (typeid) => (dispatch) => {
  dispatch(setAccountsLoading());
  axios
    .get(`/api/account/acccategories/${typeid}`, {
      headers: {
        Authorization: localStorage.jwtToken,
      },
    })
    .then((res) => {
      dispatch({
        type: GET_ACCOUNT_CATEGORIES,
        payload: res.data,
      });
    })
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

export const getAccSubCategoriesByName = (catid) => (dispatch) => {
  dispatch(setAccountsLoading());
  axios
    .get(`/api/account/accsubcategories/${catid}`, {
      headers: {
        Authorization: localStorage.jwtToken,
      },
    })
    .then((res) => {
      dispatch({
        type: GET_ACCOUNT_SUB_CATEGORIES,
        payload: res.data,
      });
    })
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

export const addAccSubCategory = (accNameData) => (dispatch) => {
  dispatch(setAccountsLoading());
  axios
    .post("/api/account/accsubcategory/add", accNameData, {
      headers: {
        Authorization: localStorage.jwtToken,
      },
    })
    .then((res) => {
      dispatch(getAccSubCategories());
    })
    .catch((err) => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    });
};

export const getAccSubCategories = () => (dispatch) => {
  dispatch(setAccountsLoading());
  axios
    .get("/api/account/accsubcategories", {
      headers: {
        Authorization: localStorage.jwtToken,
      },
    })
    .then((res) => {
      dispatch({
        type: GET_ACCOUNT_SUB_CATEGORIES,
        payload: res.data,
      });
    })
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

// Add account
export const addAccount = (plaidData) => (dispatch) => {
  axios
    .post("/api/plaid/accounts/add", plaidData, {
      headers: {
        Authorization: localStorage.jwtToken,
      },
    })
    .then((res) =>
      dispatch({
        type: ADD_ACCOUNT,
        // payload: accounts,
      })
    )
    .then((data) => (data ? dispatch(getAccounts()) : null))
    .catch((err) => console.log(err));
};

// Delete account
export const deleteAccount = (plaidData) => (dispatch) => {
  if (window.confirm("Are you sure you want to remove this account?")) {
    const id = plaidData.id;
    axios
      .delete(`/api/plaid/accounts/${id}`, {
        headers: {
          Authorization: localStorage.jwtToken,
        },
      })
      .then((res) =>
        dispatch({
          type: DELETE_ACCOUNT,
          payload: id,
        })
      )
      .catch((err) => console.log(err));
  }
};

// Get all accounts for specific user
export const getAccounts = () => (dispatch) => {
  dispatch(setAccountsLoading());
  axios
    .get("/api/plaid/accounts", {
      headers: {
        Authorization: localStorage.jwtToken,
      },
    })
    .then((res) => {
      dispatch({
        type: GET_ACCOUNTS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: GET_ACCOUNTS,
        payload: null,
      });
    });
};

// Accounts loading
export const setAccountsLoading = () => {
  return {
    type: ACCOUNTS_LOADING,
  };
};
