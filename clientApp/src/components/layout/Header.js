import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";

class Header extends Component {
  onLogoutClick = (e) => {
    e.preventDefault();
    this.props.logoutUser();
  };
  render() {
    const { user } = this.props.auth;
    return (
      <header className="main-header">
        {/* Logo */}
        <a href="/" className="logo">
          {/* mini logo for sidebar mini 50x50 pixels */}
          <span className="logo-mini">
            <b>A</b>LT
          </span>
          {/* logo for regular state and mobile devices */}
          <span className="logo-lg">
            <b>Admin</b>LTE
          </span>
        </a>
        {/* Header Navbar: style can be found in header.less */}
        <nav className="navbar navbar-static-top">
          {/* Sidebar toggle button*/}
          <a
            href="#"
            className="sidebar-toggle"
            data-toggle="push-menu"
            role="button"
          >
            <span className="sr-only">Toggle navigation</span>
          </a>
          {/* Navbar Right Menu */}
          <div className="navbar-custom-menu">
            <ul className="nav navbar-nav">
              {/* Messages: style can be found in dropdown.less*/}
              {/* Tasks: style can be found in dropdown.less */}
              {/* User Account: style can be found in dropdown.less */}
              <li className="dropdown user user-menu">
                <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                  <img
                    src="/assets/dist/img/user2-160x160.jpg"
                    className="user-image"
                    alt="User Image"
                  />
                  <span className="hidden-xs">
                    {user.name}
                    {/*?php $userData = $this-*/}
                    {/* session-&gt;userdata('user_login'); echo
                    $userData['name'];?&gt; */}
                  </span>
                </a>
                <ul className="dropdown-menu">
                  {/* User image */}
                  <li className="user-header">
                    <img
                      src="/assets/dist/img/user2-160x160.jpg"
                      className="img-circle"
                      alt="User Image"
                    />
                    <p>
                      {/*?php echo $userData['name'];?*/} - Web Developer
                      <small>
                        {/*?php echo formatted_date($userData['created']);?*/}
                      </small>
                    </p>
                  </li>
                  {/* Menu Body */}
                  <li className="user-footer">
                    {/*div class="pull-left">
            <a href="#" class="btn btn-default btn-flat">Profile</a>
          </div*/}
                    <div className="pull-right">
                      <a
                        onClick={this.onLogoutClick}
                        className="btn btn-default btn-flat"
                      >
                        Sign out
                      </a>
                    </div>
                  </li>
                  {/* Menu Footer*/}
                </ul>
              </li>
              {/* Control Sidebar Toggle Button */}
              {/*li></li>
      <a href="#" data-toggle="control-sidebar"><i class="fa fa-gears"></i></a>
    </li*/}
            </ul>
          </div>
        </nav>
      </header>
    );
  }
}

Header.propTypes = {
  logoutUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  plaid: state.plaid,
});

export default connect(mapStateToProps, {
  logoutUser,
})(Header);
