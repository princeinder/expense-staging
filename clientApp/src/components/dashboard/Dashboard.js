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

class Dashboard extends Component {
  render() {
    const { user } = this.props.auth;
    return (
      <div>
        <section className="content">
          <div className="row">
            <h2 style={{ textAlign: "center" }}>{user.name}</h2>
            <div style={{ textAlign: "center" }}>
              <div className="col-md-4">
                <h2>
                  <div className="form-group">
                    <div className="input-group">
                      <div className="input-group-addon">
                        <i className="fa fa-calendar" />
                      </div>
                      <input
                        type="text"
                        className="form-control pull-right"
                        name="date_range"
                        id="date_range"
                      />
                    </div>
                  </div>
                </h2>
              </div>
            </div>
          </div>
          <div className="workflow">
            <div>
              <div className="row">
                {/*?php $field_expense = 0; ?*/}
                {/*?php $variable_expense = 0; ?*/}
                {/*?php $netcashflow = 0; ?*/}
                {/*?php $income = 0; ?*/}
                {/*?php $total_gross = 0; ?*/}
                {/*?php $freedom_target = 0; ?*/}
                {/*?php foreach($results as $index=*/}
                {/*?php if($val['name']=='Income'): ?*/}
                {/*?php $income=$val['amount'] ?*/}
                {/*?php endif ?*/}
                {/*?php if($val['name']=='Fixed Expense'): ?*/}
                {/*?php $field_expense = $val['amount'] ?*/}
                {/*?php $freedom_target = $val['amount'] ?*/}
                {/*?php endif ?*/}
                {/*?php if($val['name']=='Variable Expense' ): ?*/}
                {/*?php $variable_expense = $val['amount'] ?*/}
                {/*?php $freedom_target +=$val['amount'] ?*/}
                {/*?php endif ?*/}
                {/*?php if($val['name']=='Fixed Expense' || $val['name']=='Variable Expense' ): ?*/}
                {/*?php $total_gross +=$val['amount'] ?*/}
                {/*?php endif ?*/}
                {/* <div class="col-sm-2 col-xs-6">
            <div class="description-block border-right">
              <span class="description-percentage text-green"><i class="fa fa-caret-up"></i> 17%</span>
              <h5 class="description-header">$<?php echo str_replace(".00", "",number_format($val['amount']))  ?></h5>
              <span class="description-text" style="color:#4685c4"><?php echo $val['name'] ?></span>
            </div> */}
                {/* /.description-block */}
                {/* </div> */}
                {/*?php endforeach ?*/}
                <div className="col-sm-2 col-xs-6">
                  <div className="description-block">
                    <span className="description-percentage text-red">
                      <i className="fa fa-caret-down" /> 18%
                    </span>
                    <h5 className="description-header">
                      $ 1600
                      {/*?php echo str_replace(".00", "",number_format($income)) ?*/}
                    </h5>
                    <span
                      className="description-text"
                      style={{ color: "#4685c4" }}
                    >
                      Income
                    </span>
                  </div>
                  {/* /.description-block */}
                </div>
                <div className="col-sm-2 col-xs-6">
                  <div className="description-block">
                    <span className="description-percentage text-red">
                      <i className="fa fa-caret-down" /> 18%
                    </span>
                    <h5 className="description-header">
                      $ 1000
                      {/*?php echo str_replace(".00", "",number_format($field_expense)) ?*/}
                    </h5>
                    <span
                      className="description-text"
                      style={{ color: "#4685c4" }}
                    >
                      Fixed Expense
                    </span>
                  </div>
                  {/* /.description-block */}
                </div>
                <div className="col-sm-2 col-xs-6">
                  <div className="description-block">
                    <span className="description-percentage text-red">
                      <i className="fa fa-caret-down" /> 18%
                    </span>
                    <h5 className="description-header">
                      $ 2000
                      {/*?php echo str_replace(".00", "",number_format($variable_expense)) ?*/}
                    </h5>
                    <span
                      className="description-text"
                      style={{ color: "#4685c4" }}
                    >
                      Variable Expense
                    </span>
                  </div>
                  {/* /.description-block */}
                </div>
                <div className="col-sm-2 col-xs-6">
                  <div className="description-block">
                    <span className="description-percentage text-red">
                      <i className="fa fa-caret-down" /> 18%
                    </span>
                    <h5 className="description-header">
                      $ 3000
                      {/*?php echo str_replace(".00", "",number_format($income-$total_gross)) ?*/}
                    </h5>
                    <span
                      className="description-text"
                      style={{ color: "#4685c4" }}
                    >
                      Net Cash Flow
                    </span>
                  </div>
                  {/* /.description-block */}
                </div>
                <div className="col-sm-2 col-xs-6">
                  <div className="description-block">
                    <span className="description-percentage text-red">
                      <i className="fa fa-caret-down" /> 18%
                    </span>
                    <h5 className="description-header">
                      $ 4000
                      {/*?php echo str_replace(".00", "",number_format(1400)) ?*/}
                    </h5>
                    <span
                      className="description-text"
                      style={{ color: "#4685c4" }}
                    >
                      Wealth Account
                    </span>
                  </div>
                  {/* /.description-block */}
                </div>
                <div className="col-sm-2 col-xs-6">
                  <div className="description-block">
                    <span className="description-percentage text-red">
                      <i className="fa fa-caret-down" /> 18%
                    </span>
                    <h5 className="description-header">
                      $ 5000
                      {/*?php echo str_replace(".00", "",number_format($freedom_target)) ?*/}
                    </h5>
                    <span
                      className="description-text"
                      style={{ color: "#4685c4" }}
                    >
                      Freedom Target
                    </span>
                  </div>
                  {/* /.description-block */}
                </div>
              </div>
              <div className="row">
                <div className="col-lg-4">
                  <div className="card">
                    <div className="card-header border-0">
                      <div className="d-flex justify-content-between">
                        <h3 className="card-title" style={{ color: "#4685c4" }}>
                          Field Expenses
                        </h3>
                      </div>
                    </div>
                    <div className="card-body">
                      <div className="d-flex">
                        <p className="d-flex flex-column text-center">
                          {/* <span>Revenue Over Time($k)</span> */}
                        </p>
                        {/* <p class="ml-auto d-flex flex-column text-right">
              <span class="text-success">
                <i class="fas fa-arrow-up"></i> 12.5%
              </span>
              <span class="text-muted">Since last week</span>
            </p> */}
                      </div>
                      {/* /.d-flex */}
                      <div className="position-relative mb-4">
                        <Line
                          data={state}
                          options={{
                            title: {
                              display: true,
                              text: "Revenue Over Time($k)",
                              fontSize: 20,
                            },
                            legend: {
                              display: true,
                              position: "right",
                            },
                          }}
                        />
                        {/* <canvas id="expense-chart" height={200} /> */}
                      </div>
                      {/* <div class="d-flex flex-row justify-content-end">
            <span class="mr-2">
              <i class="fas fa-square text-primary"></i> This Week
            </span>

            <span>
              <i class="fas fa-square text-gray"></i> Last Week
            </span>
          </div> */}
                    </div>
                  </div>
                  {/* /.card */}
                </div>
                <div className="col-lg-4">
                  <div className="card">
                    <div className="card-header border-0">
                      <div className="d-flex justify-content-between">
                        <h3 className="card-title" style={{ color: "#4685c4" }}>
                          Net cash Flow
                        </h3>
                      </div>
                    </div>
                    <div className="card-body">
                      <div className="d-flex">
                        <p className="d-flex flex-column text-center">
                          {/* <span>Revenue Over Time($k)</span> */}
                        </p>
                        {/* <p class="ml-auto d-flex flex-column text-right">
              <span class="text-success">
                <i class="fas fa-arrow-up"></i> 12.5%
              </span>
              <span class="text-muted">Since last week</span>
            </p> */}
                      </div>
                      {/* /.d-flex */}
                      <div className="position-relative mb-4">
                        <Line
                          data={state}
                          options={{
                            title: {
                              display: true,
                              text: "Revenue Over Time($k)",
                              fontSize: 20,
                            },
                            legend: {
                              display: true,
                              position: "right",
                            },
                          }}
                        />
                      </div>
                      {/* 
          <div class="d-flex flex-row justify-content-end">
            <span class="mr-2">
              <i class="fas fa-square text-primary"></i> This Week
            </span>

            <span>
              <i class="fas fa-square text-gray"></i> Last Week
            </span>
          </div> */}
                    </div>
                  </div>
                  {/* /.card */}
                </div>
                <div className="col-lg-4">
                  <div className="card">
                    <div className="card-header border-0">
                      <div className="d-flex justify-content-between">
                        <h3 className="card-title" style={{ color: "#4685c4" }}>
                          Financial Freedom Target
                        </h3>
                      </div>
                    </div>
                    <div className="card-body">
                      <div className="d-flex">
                        <p className="d-flex flex-column text-center">
                          {/* <span>Revenue Over Time($k)</span> */}
                        </p>
                        {/* <p class="ml-auto d-flex flex-column text-right">
              <span class="text-success">
                <i class="fas fa-arrow-up"></i> 12.5%
              </span>
              <span class="text-muted">Since last week</span>
            </p> */}
                      </div>
                      {/* /.d-flex */}
                      <div className="position-relative mb-4">
                        <Line
                          data={state}
                          options={{
                            title: {
                              display: true,
                              text: "Revenue Over Time($k)",
                              fontSize: 20,
                            },
                            legend: {
                              display: true,
                              position: "right",
                            },
                          }}
                        />
                      </div>
                      {/* 
          <div class="d-flex flex-row justify-content-end">
            <span class="mr-2">
              <i class="fas fa-square text-primary"></i> This Week
            </span>

            <span>
              <i class="fas fa-square text-gray"></i> Last Week
            </span>
          </div> */}
                    </div>
                  </div>
                  {/* /.card */}
                </div>
              </div>
            </div>
            ;
          </div>
          {/* /.row */}
          {/* Info boxes */}
        </section>
      </div>
    );
  }
}

Dashboard.propTypes = {
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
})(Dashboard);
