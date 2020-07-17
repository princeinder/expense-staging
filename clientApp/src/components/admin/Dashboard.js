import React, { Component } from "react";
import PlaidLinkButton from "react-plaid-link-button";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { addAccount } from "../../actions/accountActions";
import { Line } from "react-chartjs-2";
import DataTable from "react-data-table-component";
const state = {
  labels: ["Feb", "March", "April", "May", "June", "July"],
  datasets: [
    {
      type: "line",
      borderWidth: 2,
      lineTension: 0,
      spanGaps: true,
      data: [200, 250, 566, 788, 912, 1177],
      backgroundColor: "transparent",
      borderColor: "green",
      pointBorderColor: "green",
      pointBackgroundColor: "green",
      fill: false,
    },
  ],
};

class AdminDashboard extends Component {
  render() {
    const { user } = this.props.auth;
    return (
      <section className="content">
        {/* Info boxes */}
        <div className="row">
          <div className="col-lg-3 col-xs-6">
            {/* small box */}
            <div className="small-box ">
              <div className="inner">
                <p>Approved User</p>
                <h3>150</h3>
                {/*?php //echo USERID;?*/}
              </div>
            </div>
          </div>
          {/* ./col */}
          <div className="col-lg-3 col-xs-6">
            {/* small box */}
            <div className="small-box">
              <div className="inner">
                <p>Un-Approved User</p>
                <h3>10</h3>
              </div>
            </div>
          </div>
          {/* ./col */}
          <div className="col-lg-3 col-xs-6">
            {/* small box */}
            <div className="small-box ">
              <div className="inner">
                <p>Total Transaction</p>
                <h3>1085</h3>
              </div>
            </div>
          </div>
          {/* ./col */}
          <div className="col-lg-3 col-xs-6">
            {/* small box */}
            <div className="small-box ">
              <div className="inner">
                <p>Income Flow </p>
                <h3>
                  10455
                  <sup style={{ fontSize: "20px", color: "#00a65a" }}>$</sup>
                </h3>
              </div>
            </div>
          </div>
          {/* ./col */}
        </div>
        {/* /.row */}
      </section>
    );
  }
}

AdminDashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  addAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  plaid: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  plaid: state.plaid,
});

export default connect(mapStateToProps, {
  logoutUser,
  addAccount,
})(AdminDashboard);
