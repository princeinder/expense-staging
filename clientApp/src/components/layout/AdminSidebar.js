import React, { Component } from "react";
import { connect } from "react-redux";

class AdminSidebar extends Component {
  render() {
    const { user } = this.props.auth;
    return (
      <aside className="main-sidebar">
        <section className="sidebar">
          <div className="user-panel">
            <div className="pull-left image">
              <img
                src="/assets/dist/img/user2-160x160.jpg"
                className="img-circle"
                alt="User Image"
              />
            </div>
            <div className="pull-left info">
              <p>{user.name}</p>
              <a href="#">
                <i className="fa fa-circle text-success" /> Online
              </a>
            </div>
          </div>
          {/* search form */}
          {/* /.search form */}
          {/* sidebar menu: : style can be found in sidebar.less */}
          <ul className="sidebar-menu" data-widget="tree">
            <li className="header">MAIN NAVIGATION</li>\
            <li>
              <a href="/admin/dashboard">
                <i className="fa fa-th" /> <span>Dashboard</span>
              </a>
            </li>
            <li>
              <a href="/admin/acctype">
                <i className="fa fa-dashboard" /> <span>Types</span>
              </a>
            </li>
            <li>
              <a href="/admin/acccategory">
                <i className="fa fa-dashboard" /> <span>Account Category</span>
              </a>
            </li>
            <li>
              <a href="/admin/accsubcategory">
                <i className="fa fa-dashboard" />{" "}
                <span>Account Sub Category</span>
              </a>
            </li>
          </ul>
        </section>
      </aside>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  plaid: state.plaid,
});

export default connect(mapStateToProps)(AdminSidebar);
