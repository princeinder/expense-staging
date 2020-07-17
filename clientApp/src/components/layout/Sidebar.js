import React, { Component } from "react";
import { connect } from "react-redux";

class Sidebar extends Component {
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
              <a href="/dashboard">
                <i className="fa fa-th" /> <span>Dashboard</span>
              </a>
            </li>
            <li>
              <a href="/account">
                <i className="fa fa-th" /> <span>Accounts</span>
              </a>
            </li>
            <li>
              <a href="/addtransaction">
                <i className="fa fa-th" /> <span>Add Transaction</span>
              </a>
            </li>
            <li>
              <a href="/subcategory">
                <i className="fa fa-th" /> <span>Sub Categories</span>
              </a>
            </li>
            <li>
              <a href="/transaction">
                <i className="fa fa-dashboard" /> <span>Transaction</span>
              </a>
            </li>
            <li>
              <a href="/incomeoverview">
                <i className="fa fa-dashboard" /> <span>Income Overview</span>
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

export default connect(mapStateToProps)(Sidebar);
