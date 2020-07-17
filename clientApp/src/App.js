import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";

import { setCurrentUser, logoutUser } from "./actions/authActions";
import { Provider } from "react-redux";
import store from "./store";

import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import PrivateRoute from "./components/private-route/PrivateRoute";
import AdminRoute from "./components/admin-route/AdminRoute";
import Dashboard from "./components/dashboard/Dashboard";

import AdminDashboard from "./components/admin/Dashboard";
import AccType from "./components/admin/AccType";
import AccSubCategory from "./components/admin/AccSubCategory";
import AccCategory from "./components/admin/AccCategory";

import Account from "./components/dashboard/Accounts";
import SubCategory from "./components/dashboard/SubCategories";
import Transactions from "./components/dashboard/Transactions";
import AddTransaction from "./components/dashboard/AddTransaction";
import IncomeOverview from "./components/dashboard/IncomeOverview";

import "./App.css";

// Check for token to keep user logged in

if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
  // Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());

    // Redirect to login
    window.location.href = "./login";
  }
}
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Route exact path="/" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Switch>
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
              <PrivateRoute exact path="/account" component={Account} />
              <PrivateRoute exact path="/subcategory" component={SubCategory} />
              <PrivateRoute
                exact
                path="/transaction"
                component={Transactions}
              />
              <PrivateRoute
                exact
                path="/addtransaction"
                component={AddTransaction}
              />
              <PrivateRoute
                exact
                path="/incomeoverview"
                component={IncomeOverview}
              />
              <AdminRoute
                exact
                path="/admin/dashboard"
                component={AdminDashboard}
              />
              <AdminRoute exact path="/admin/acctype" component={AccType} />
              <AdminRoute
                exact
                path="/admin/accsubcategory"
                component={AccSubCategory}
              />
              <AdminRoute
                exact
                path="/admin/acccategory"
                component={AccCategory}
              />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}
export default App;
