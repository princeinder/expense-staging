import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import classnames from "classnames";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
      errors: {},
    };
  }

  componentDidMount() {
    // If logged in and user navigates to Register page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors,
      });
    }
  }

  onChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2,
    };

    this.props.registerUser(newUser, this.props.history);
  };

  render() {
    const { errors } = this.state;

    return (
      <div className="register-box">
        <div className="register-logo">
          <a href="../../index2.html">
            <b>Admin</b>LTE
          </a>
        </div>
        <div className="register-box-body">
          {" "}
          <div id="alertMsg" />
          <p className="login-box-msg">Register a new membership</p>
          <form noValidate onSubmit={this.onSubmit}>
            <div className="form-group has-feedback">
              <input
                onChange={this.onChange}
                placeholder="Full name"
                value={this.state.name}
                error={errors.name}
                id="name"
                type="text"
                className={classnames("form-control", {
                  invalid: errors.name,
                })}
              />
              <span className="err" style={{ color: "red" }}>
                {errors.name}
              </span>
            </div>
            <div className="form-group has-feedback">
              <input
                onChange={this.onChange}
                placeholder="Email"
                value={this.state.email}
                error={errors.email}
                id="email"
                type="email"
                className={classnames("form-control", {
                  invalid: errors.email,
                })}
              />
              <span className="err" style={{ color: "red" }}>
                {errors.email}
              </span>
            </div>
            <div className="form-group has-feedback">
              <input
                onChange={this.onChange}
                placeholder="Password"
                value={this.state.password}
                error={errors.password}
                id="password"
                type="password"
                className={classnames("form-control", {
                  invalid: errors.password,
                })}
              />
              <span className="err" style={{ color: "red" }}>
                {errors.password}
              </span>
            </div>
            <div className="form-group has-feedback">
              <input
                placeholder="Confirm Password"
                onChange={this.onChange}
                value={this.state.password2}
                error={errors.password2}
                id="password2"
                type="password"
                className={classnames("form-control", {
                  invalid: errors.password2,
                })}
              />
              <span className="err" style={{ color: "red" }}>
                {errors.password2}
              </span>
            </div>
            <div className="row">
              <div className="col-xs-8"></div>
              {/* /.col */}
              <div className="col-xs-4">
                <button
                  type="submit"
                  id="btnSave"
                  className="btn btn-primary btn-block btn-flat"
                >
                  Register
                </button>
              </div>
              {/* /.col */}
            </div>
          </form>
          <a href="login" className="text-center">
            I already have a membership
          </a>
        </div>
      </div>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { registerUser })(withRouter(Register));
