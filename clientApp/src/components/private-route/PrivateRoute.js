import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import Sidebar from "../layout/Sidebar";
import Header from "../layout/Header";
import Footer from "../layout/Footer";

const PrivateRoute = ({ component: Component, auth, ...rest }) => (
  <div>
    <Header />
    <Sidebar />
    <div className="content-wrapper">
      <Route
        {...rest}
        render={(props) =>
          auth.isAuthenticated === true && auth.user.role == "user" ? (
            <Component {...props} />
          ) : (
            <Redirect to="/login" />
          )
        }
      />
    </div>
    <Footer />
  </div>
);

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(PrivateRoute);
