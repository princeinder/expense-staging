import React, { Component } from "react";
import PlaidLinkButton from "react-plaid-link-button";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { getAccounts, addAccount } from "../../actions/accountActions";
import DataTable from "react-data-table-component";
import Chart from "chart.js";

class IncomeOverview extends Component {
  componentDidMount() {
    //    const myChartRef = this.chartRef.current.getContext("2d");

    //    new Chart(myChartRef, {
    //      type: "line",
    //      data: {
    //        //Bring in data
    //        labels: ["Jan", "Feb", "March"],
    //        datasets: [
    //          {
    //            label: "Sales",
    //            data: [86, 67, 91],
    //          },
    //        ],
    //      },
    //      options: {
    //        //Customize chart options
    //      },
    //    });
    this.props.getAccounts();
  }

  onLogoutClick = (e) => {
    e.preventDefault();
    this.props.logoutUser();
  };
  onEvent = (e, metadata) => {
    var ins_id = metadata.institution_id;
    if (ins_id == "") {
    }
    return false;
  };
  // Add account
  handleOnSuccess = (token, metadata) => {
    const plaidData = {
      public_token: token,
      metadata: metadata,
    };
    this.props.addAccount(plaidData);
  };

  render() {
    return (
      <section className="content">
        <div className="row">
          <div className="col-md-12">
            <div className="box">
              <div className="box box-primary">
                <div className="box-header with-border">
                  <h3 className="box-title">Income Statement</h3>
                  <div className="box-tools pull-right">
                    <button
                      type="button"
                      className="btn btn-box-tool"
                      data-widget="collapse"
                    >
                      <i className="fa fa-minus" />
                    </button>
                    <button
                      type="button"
                      className="btn btn-box-tool"
                      data-widget="remove"
                    >
                      <i className="fa fa-times" />
                    </button>
                  </div>
                </div>
                <div className="box-body chart-responsive">
                  <div
                    id="myChart"
                    ref={this.chartRef}
                    style={{ height: 300 }}
                  />
                </div>
                {/* /.box-body */}
              </div>
              {/* /.box-footer */}
            </div>
            {/* /.box */}
          </div>
          {/* /.col */}
        </div>
        {/* /.row */}
        <div className="row content-main">
          <div className="col-md-1 "></div>
          <div className="col-md-8">
            <div className="cash-flow" style={{ border: "none" }}>
              <div className="cash-head">
                <div className="col-md-8 pull-left">
                  <h1>Income Statement</h1>
                  <h2 style={{ textAlign: "left" }}>
                    {/*?php $userData = $this-*/}
                    {/*?php echo $userData['name'];?*/}
                  </h2>
                </div>
                <div className="col-md-4 pull-right">
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
              <div className="row">
                <div className="col-md-4 pull-right">
                  <div
                    id="scerario"
                    className="col-md-4"
                    style={{ textAlign: "center" }}
                  >
                    <i className="fa fa-plus" />
                    <h3> Scenario Planning</h3>
                  </div>
                  <div
                    id="budget"
                    className="col-md-2"
                    style={{ textAlign: "center" }}
                  >
                    <i className="fa fa-plus" />
                    <h3> Budget </h3>
                  </div>
                </div>
              </div>
              <div>
                <div className="workflow">
                  <div className="inputScope1">
                    {/*?php foreach($cashFlow as $key =*/}
                    <div
                      className="full-hd"
                      style={{ borderBottom: "2px solid #4685c4" }}
                    >
                      <div className="col-md-3">
                        <h4>{/*?php echo $key; ?*/} </h4>
                      </div>
                      <div className="col-md-3">
                        <h4 />
                      </div>
                      <div className="col-md-2 ">
                        <div className="scerario">
                          <h4 style={{ textAlign: "right" }}>
                            {" "}
                            Scenario Planning{" "}
                          </h4>
                        </div>
                      </div>
                      <div className="col-md-2">
                        <div className="budget">
                          <h4 style={{ textAlign: "right" }}> Budget </h4>
                        </div>
                      </div>
                      <div className="col-md-2 ">
                        <h4 style={{ textAlign: "right" }}> Actual </h4>
                      </div>
                    </div>
                    {/*?php 
   $subCatSum = array();
   $fPlanSum = array();
   $fBudgetSum = array();
   foreach($val as $k =*/}{" "}
                    <div className="main-line">
                      <div className="col-md-3">
                        <h3 style={{ fontWeight: 600, textAlign: "left" }}>
                          {" "}
                          {/*?php echo $k;?*/}{" "}
                        </h3>
                      </div>
                      <div className="col-md-3"></div>
                      <div className="col-md-2"></div>
                      <div className="col-md-2"></div>
                      <div className="col-md-2"></div>
                    </div>
                    {/* For Each lopp */}
                    <div className="main-line">
                      <div className="col-md-3" style={{ textIndent: 30 }}>
                        <h4 style={{ textAlign: "left" }}>
                          {" "}
                          {/*?php echo $vl['account_name'];?*/}{" "}
                        </h4>
                      </div>
                      <div className="col-md-3">
                        {/* <h4> <?php //echo $vl['account_name'];?> </h4> */}
                      </div>
                      <div className="col-md-2 inputAmount">
                        <div className="scerario">
                          <h3>
                            <input
                              type="text"
                              className="amount_"
                              data-acccat=""
                              data-subcat=""
                              data-accountname=""
                              data-id=""
                              data-type="plan"
                              defaultValue=""
                            />
                          </h3>
                        </div>
                      </div>
                      <div className="col-md-2 inputAmount">
                        <div className="budget">
                          <h3>
                            <input
                              type="text"
                              className="bamount_"
                              data-acccat=""
                              data-subcat=""
                              data-accountname=""
                              data-id=""
                              data-type="budget"
                              defaultValue=""
                            />
                          </h3>
                        </div>
                      </div>
                      <div className="col-md-2 inputScope">
                        <h3>
                          <input
                            type="text"
                            className="budget_amount"
                            data-acccat=""
                            data-subcat=""
                            data-accountname=""
                            data-id=""
                            defaultValue=""
                            readOnly
                          />
                        </h3>
                      </div>
                    </div>
                    <div
                      className="main-line"
                      style={{ borderTop: "2px solid #eee" }}
                    >
                      <div
                        id="initials_data"
                        className="col-md-10 right-side initials"
                      >
                        <h4> Total {/*?php echo $k;?*/} </h4>
                      </div>
                      <div className="col-md-2 bg-grey scerario">
                        <h3 style={{ textAlign: "right" }}>
                          {/*?php
   $fPlanSum[] = array_sum($planSum);
   echo str_replace(".00", "", number_format(array_sum($planSum),2));		 
	?*/}
                        </h3>
                      </div>
                      <div className="col-md-2 bg-grey budget">
                        <h3 style={{ textAlign: "right" }}>
                          {/*?php
   $fBudgetSum[] = array_sum($budgetSum);
   echo str_replace(".00", "",number_format(array_sum($budgetSum),2));
		?*/}
                        </h3>
                      </div>
                      <div
                        className="col-md-2 bg-grey"
                        style={{ float: "right" }}
                      >
                        <h3 style={{ textAlign: "right" }}>
                          {/*?php
   $subCatSum[] = array_sum($accountSum);
     echo str_replace(".00", "",number_format(array_sum($accountSum),2));?*/}
                        </h3>
                      </div>
                    </div>
                    {/*?php 
   }
  ?*/}
                    <div className="main-line-grey">
                      <div className="col-md-6">
                        <h4 style={{ color: "#4685c4", fontWeight: 600 }}>
                          {" "}
                          {/*?php 
		 
	  echo ($key == "Income") ? "Total $key Cash-In" : "Total $key Cash-out";?*/}
                        </h4>
                      </div>
                      <div className="col-md-2 ">
                        <div className="scerario">
                          <h3>
                            {/*?php
		
		$pSum = array_sum($fPlanSum);
   if($key == "Income")
   { $totalCashInPlan += $pSum ;}
   else
   { $totalCashOutPlan += $pSum ;}
    echo str_replace(".00", "",number_format($pSum,2));?*/}
                          </h3>
                        </div>
                      </div>
                      <div className="col-md-2">
                        <div className="budget">
                          <h3>
                            {/*?php $bSum = array_sum($fBudgetSum);
   if($key == "Income")
   { $totalCashInBudget += $bSum;}
   else
   { $totalCashOutBudget += $bSum;}
   echo str_replace(".00", "",number_format($bSum,2));?*/}
                          </h3>
                        </div>
                      </div>
                      <div className="col-md-2">
                        <h3 style={{ color: "#4685c4", textAlign: "right" }}>
                          {/*?php $catSum = array_sum($subCatSum);
   if($key == "Income")
   { $totalCashInAmount += $catSum;}
   else
   { $totalCashOutAmount += $catSum;}
    echo str_replace(".00", "",number_format($catSum,2));?*/}
                        </h3>
                      </div>
                    </div>
                    {/*?php } ?*/}
                    <div className="col-md-12 full-hd">
                      <h4>Total Cash Flow </h4>
                    </div>
                    <div className="main-line-grey">
                      <div className="col-md-3">
                        <h4> Total Cash-In </h4>
                      </div>
                      <div className="col-md-3"></div>
                      <div className="col-md-2">
                        <div className="scerario">
                          <h3>
                            {/*?php echo (empty($totalCashInPlan)) ? 0 : str_replace(".00", "",number_format($totalCashInPlan,2));?*/}
                          </h3>
                        </div>
                      </div>
                      <div className="col-md-2">
                        <div className="budget">
                          <h3>
                            {/*?php echo (empty($totalCashInBudget)) ? 0 : str_replace(".00", "",number_format($totalCashInBudget,2));?*/}
                          </h3>
                        </div>
                      </div>
                      <div className="col-md-2">
                        <h3>
                          {/*?php echo (empty($totalCashInAmount)) ? 0 : str_replace(".00", "",number_format($totalCashInAmount,2));?*/}
                        </h3>
                      </div>
                    </div>
                    <div
                      className="main-line-grey"
                      style={{ borderTop: "none" }}
                    >
                      <div className="col-md-3">
                        <h4> Total Cash-Out </h4>
                      </div>
                      <div className="col-md-3"></div>
                      <div className="col-md-2">
                        <div className="scerario">
                          <h3>
                            {/*?php echo (empty($totalCashOutPlan)) ? 0 : str_replace(".00", "",number_format($totalCashOutPlan,2));?*/}
                          </h3>
                        </div>
                      </div>
                      <div className="col-md-2">
                        <div className="budget">
                          <h3>
                            {/*?php echo (empty($totalCashOutBudget)) ? 0 : str_replace(".00", "",number_format($totalCashOutBudget,2));?*/}
                          </h3>
                        </div>
                      </div>
                      <div className="col-md-2">
                        <h3>
                          {/*?php echo (empty($totalCashOutAmount)) ? 0 : str_replace(".00", "",number_format($totalCashOutAmount,2));?*/}
                        </h3>
                      </div>
                    </div>
                    <div
                      className="main-line-grey"
                      style={{ borderTop: "none" }}
                    >
                      <div className="col-md-3">
                        <h4>Net Income Margin</h4>
                      </div>
                      <div className="col-md-3"></div>
                      <div className="col-md-2">
                        <div className="scerario">
                          <h3>{/*?php 
	  if($totalCashInPlan */}</h3>
                        </div>
                      </div>
                      <div className="col-md-2">
                        <div className="budget">
                          <h3>{/*?php 
	  if($totalCashInBudget */}</h3>
                        </div>
                      </div>
                      <div className="col-md-2">
                        <h3>{/*?php 
	  if($totalCashInAmount */}</h3>
                      </div>
                    </div>
                    <div
                      className="main-line-green"
                      style={{ backgroundColor: "#4685c4" }}
                    >
                      <div className="col-md-3">
                        <h4 style={{ fontWeight: 600, textAlign: "left" }}>
                          Net Cash Flow{" "}
                        </h4>
                      </div>
                      <div className="col-md-3"></div>
                      <div className="col-md-2">
                        <div className="scerario">
                          <h3 style={{ fontWeight: 600, textAlign: "right" }}>
                            {/*?php echo str_replace(".00", "",number_format(abs($totalCashOutPlan - $totalCashInPlan),2));?*/}
                          </h3>
                        </div>
                      </div>
                      <div className="col-md-2">
                        <div className="budget">
                          <h3 style={{ fontWeight: 600, textAlign: "right" }}>
                            {/*?php echo str_replace(".00", "",number_format(abs($totalCashOutBudget - $totalCashInBudget),2));?*/}
                          </h3>
                        </div>
                      </div>
                      <div className="col-md-2">
                        <h3 style={{ fontWeight: 600, textAlign: "right" }}>
                          {/*?php echo str_replace(".00", "",number_format(($totalCashInAmount - $totalCashOutAmount  ),2));?*/}
                        </h3>
                      </div>
                    </div>
                  </div>
                  {/* /.modal */}
                  <div className="modal fade" id="trans_list" role="dialog">
                    <div className="modal-dialog modal-lg">
                      {/* Modal content*/}
                      <div className="modal-content">
                        {/*div class="modal-header">
    <button type="button" class="close" data-dismiss="modal">&times;</button>
    <h4 class="modal-title">Transactions</h4>
  </div*/}
                        <div className="modal-body"></div>
                        <div className="modal-footer">
                          <button
                            type="button"
                            className="btn btn-default"
                            data-dismiss="modal"
                          >
                            Close
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-1 "></div>
        </div>
      </section>
    );
  }
}

IncomeOverview.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  getAccounts: PropTypes.func.isRequired,
  addAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  account: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  account: state.account,
});

export default connect(mapStateToProps, {
  logoutUser,
  getAccounts,
  addAccount,
})(IncomeOverview);
