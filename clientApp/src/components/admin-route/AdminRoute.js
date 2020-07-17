import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import AdminSidebar from "../layout/AdminSidebar";
import Header from "../layout/Header";
import Footer from "../layout/Footer";

const AdminRoute = ({ component: Component, auth, ...rest }) => (
  <div>
    <Header />
    <AdminSidebar />
    <div className="content-wrapper">
      <Route
        {...rest}
        render={(props) =>
          auth.isAuthenticated === true && auth.user.role == "admin" ? (
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

AdminRoute.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(AdminRoute);
