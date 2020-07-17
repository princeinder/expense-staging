import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import classnames from "classnames";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {},
    };
  }

  componentDidMount() {
    if (
      this.props.auth.isAuthenticated &&
      this.props.auth.user.role == "admin"
    ) {
      this.props.history.push("/admin/dashboard");
    } else if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps.auth.user);
    if (nextProps.auth.isAuthenticated && nextProps.auth.user.role == "admin") {
      this.props.history.push("/admin/dashboard");
    } else if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }

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

    const userData = {
      email: this.state.email,
      password: this.state.password,
    };

    this.props.loginUser(userData);
  };

  render() {
    const { errors } = this.state;

    return (
      <div className="login-box">
        <div className="login-logo">
          <a href="../../index2.html">
            <b>Admin</b>LTE
          </a>
        </div>
        {/* /.login-logo */}
        <div className="login-box-body">
          <div id="alertMsg" />
          {/*p class="login-box-msg">Sign in to start your session</p*/}
          <form noValidate onSubmit={this.onSubmit}>
            <div className="form-group has-feedback">
              <input
                onChange={this.onChange}
                value={this.state.email}
                error={errors.email}
                id="email"
                type="email"
                className={classnames("form-control", {
                  invalid: errors.email || errors.emailnotfound,
                })}
              />
              <span className="err" style={{ color: "red" }} />
              {/*span class="glyphicon glyphicon-envelope form-control-feedback"></span*/}
            </div>
            <div className="form-group has-feedback">
              <input
                onChange={this.onChange}
                value={this.state.password}
                error={errors.password}
                id="password"
                type="password"
                className={classnames("form-control", {
                  invalid: errors.password || errors.passwordincorrect,
                })}
              />
              <span className="red-text" style={{ color: "red" }}>
                {errors.password}
                {errors.passwordincorrect}{" "}
              </span>
            </div>
            <div className="row">
              {/*div class="col-xs-8">
    <div class="checkbox icheck">
      <label>
        <input type="checkbox"> Remember Me
      </label> 
    </div>
  </div*/}
              {/* /.col */}
              <div className="col-xs-4">
                <button
                  type="submit"
                  id="btnSave"
                  className="btn btn-primary btn-block btn-flat"
                >
                  Sign In
                </button>
              </div>
              {/* /.col */}
            </div>
          </form>
          {/*div class="social-auth-links text-center">
<p>- OR -</p>
<a href="#" class="btn btn-block btn-social btn-facebook btn-flat"><i class="fa fa-facebook"></i> Sign in using
  Facebook</a>
<a href="#" class="btn btn-block btn-social btn-google btn-flat"><i class="fa fa-google-plus"></i> Sign in using
  Google+</a>
    </div>
    <!-- /.social-auth-links */}
          {/*a href="#">I forgot my password</a><br>
    <a href="registration" class="text-center">Register a new membership</a*/}
        </div>
        {/* /.login-box-body */}
      </div>
      // <div className="container">
      //   <div style={{ marginTop: "4rem" }} className="row">
      //     <div className="col s8 offset-s2">
      //       <Link to="/" className="btn-flat waves-effect">
      //         <i className="material-icons left">keyboard_backspace</i> Back to
      //         home
      //       </Link>
      //       <div className="col s12" style={{ paddingLeft: "11.250px" }}>
      //         <h4>
      //           <b>Login</b> below
      //         </h4>
      //         <p className="grey-text text-darken-1">
      //           Don't have an account? <Link to="/register">Register</Link>
      //         </p>
      //       </div>
      //       <form noValidate onSubmit={this.onSubmit}>
      //         <div className="input-field col s12">
      //           <input
      //             onChange={this.onChange}
      //             value={this.state.email}
      //             error={errors.email}
      //             id="email"
      //             type="email"
      //             className={classnames("", {
      //               invalid: errors.email || errors.emailnotfound,
      //             })}
      //           />
      //           <label htmlFor="email">Email</label>
      //           <span className="red-text">
      //             {errors.email}
      //             {errors.emailnotfound}
      //           </span>
      //         </div>
      //         <div className="input-field col s12">
      //           <input
      //             onChange={this.onChange}
      //             value={this.state.password}
      //             error={errors.password}
      //             id="password"
      //             type="password"
      //             className={classnames("", {
      //               invalid: errors.password || errors.passwordincorrect,
      //             })}
      //           />
      //           <label htmlFor="password">Password</label>
      //           <span className="red-text">
      //             {errors.password}
      //             {errors.passwordincorrect}
      //           </span>
      //         </div>
      //         <div className="col s12" style={{ paddingLeft: "11.250px" }}>
      //           <button
      //             style={{
      //               width: "150px",
      //               borderRadius: "3px",
      //               letterSpacing: "1.5px",
      //               marginTop: "1rem",
      //             }}
      //             type="submit"
      //             className="btn btn-large waves-effect waves-light hoverable blue accent-3"
      //           >
      //             Login
      //           </button>
      //         </div>
      //       </form>
      //     </div>
      //   </div>
      // </div>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { loginUser })(Login);
