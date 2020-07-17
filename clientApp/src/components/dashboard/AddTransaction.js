import React, { Component } from "react";
import PropTypes from "prop-types";
import PlaidLinkButton from "react-plaid-link-button";
import { connect } from "react-redux";
import moment from "moment";
import {
  getAccounts,
  addAccount,
  getAccTypes,
  addAccType,
  deleteAccType,
  addAccCategory,
  getAccSubCategoriesByName,
  getAccCategoriesByName,
  addAccSubCategory,
} from "../../actions/accountActions";

import { addAccTransaction } from "../../actions/transactionActions";

import { logoutUser } from "../../actions/authActions";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./Dashboard.css";
import MaterialTable from "material-table";

class AddTransactions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      acctransdate: "",
      acctype: "",
      acccategory: "",
      accsubcategory: "",
      acctransdesc: "",
      acctransamount: "",
      errors: "",
      message: "",
    };
  }

  componentDidMount() {
    this.props.getAccTypes();
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
    if (nextProps.transaction.message) {
      this.setState({ message: nextProps.transaction.message });
    }
  }

  // Add account
  handleOnSuccess = (token, metadata) => {
    const { accounts } = this.props;
    const plaidData = {
      public_token: token,
      metadata: metadata,
      accounts: accounts,
    };

    this.props.addAccount(plaidData);
  };

  // Delete account
  onDeleteClick = (id) => {
    const { accounts } = this.props;
    const accountData = {
      id: id,
      accounts: accounts,
    };
    this.props.deleteAccount(accountData);
  };

  // Logout
  onLogoutClick = (e) => {
    e.preventDefault();
    this.props.logoutUser();
  };
  onChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onChangeDate = (e) => {
    this.setState({
      acctransdate: e,
    });
  };
  onChangeType = (e) => {
    this.setState({ [e.target.id]: e.target.value });
    this.props.getAccCategoriesByName(e.target.value);
  };

  onChangeCategory = (e) => {
    this.setState({ [e.target.id]: e.target.value });
    this.props.getAccSubCategoriesByName(e.target.value);
  };

  onSubmitSubCategory = (e) => {
    e.preventDefault();
    const accSubCatgeoryData = {
      accsubcategory: this.state.accsubcategory,
      acccategory: this.state.acccategory,
    };
    this.props.addAccSubCategory(accSubCatgeoryData);
  };

  onSubmitTransaction = (e) => {
    e.preventDefault();

    const accTransData = {
      transaction_date: moment(this.state.acctransdate).format("YYYY-MM-DD"),
      type_id: this.state.acctype,
      sub_cat_id: this.state.accsubcategory,
      cat_id: this.state.acccategory,
      description: this.state.acctransdesc,
      amount: this.state.acctransamount,
    };
    this.props.addAccTransaction(accTransData);
  };

  render() {
    const {
      accTypes,
      accountsLoading,
      accCategories,
      accSubCategories,
      accmessage,
    } = this.props.account;
    const { transactionsLoading, items } = this.props.transaction;
    const {
      acctransdate,
      acctype,
      acccategory,
      accsubcategory,
      acctransdesc,
      acctransamount,
      errors,
      message,
    } = this.state;
    return (
      <section className="content">
        <div className="row">
          <div className="col-sm-offset-2 col-md-8">
            <div className="box box-primary">
              <div id="alertMsg">
                {message.accTransaction ? (
                  <div class="alert alert-success alert-dismissible">
                    {" "}
                    <a
                      href="#"
                      class="close"
                      data-dismiss="alert"
                      aria-label="close"
                    >
                      ×
                    </a>{" "}
                    <strong>Success! </strong>
                    {message.accTransaction}.{" "}
                  </div>
                ) : null}
              </div>
              <div className="box-header with-border">
                <h3 className="box-title">Add Transaction</h3>
              </div>
              <span className="err" style={{ color: "red" }}>
                {errors.accTransaction}
              </span>
              <form
                method="post"
                name="addTransactionForm"
                id="addTransactionForm"
                onSubmit={this.onSubmitTransaction}
              >
                <div className="box-body">
                  <div className="form-group">
                    <label>Date:</label>
                    <div>
                      <DatePicker
                        required
                        id="acctransdate"
                        className="form-control"
                        selected={acctransdate}
                        onChange={this.onChangeDate}
                      />
                      <span className="err" style={{ color: "red" }} />
                    </div>
                    {/* /.input group */}
                  </div>
                  <div className="form-group">
                    <label>Type</label>
                    <select
                      required
                      id="acctype"
                      name="acctype"
                      className="form-control"
                      onChange={this.onChangeType}
                      value={acctype}
                      required
                    >
                      <option value="">--Type--</option>
                      {accountsLoading ? <div>Loading</div> : ""}
                      {accTypes.map((ac) => (
                        <option value={ac.id}>{ac.name}</option>
                      ))}
                    </select>
                    <span className="err" style={{ color: "red" }} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Account Category</label>
                    <select
                      required
                      id="acccategory"
                      name="acccategory"
                      className="form-control"
                      onChange={this.onChangeCategory}
                      disabled={accCategories.length ? false : true}
                      value={acccategory}
                      required
                    >
                      <option value="">--Account Category--</option>
                      {accountsLoading ? <div>Loading</div> : ""}
                      {accCategories.map((ac) => (
                        <option value={ac.id}>{ac.name}</option>
                      ))}
                    </select>
                    {/*input type="text" class="form-control" id="account_name" name ="account_name" placeholder="Enter account name"*/}
                    <span className="err" style={{ color: "red" }} />
                  </div>
                  <div className="form-group">
                    <div className="row">
                      <div className="col-md-10">
                        <label htmlFor="exampleInputEmail1">Sub Category</label>
                        <select
                          required
                          id="accsubcategory"
                          name="accsubcategory"
                          value={accsubcategory}
                          className="form-control"
                          onChange={this.onChange}
                          disabled={accCategories.length ? false : true}
                        >
                          <option value="">--Sub Category--</option>
                          {accountsLoading ? <div>Loading</div> : ""}
                          {accSubCategories.map((ac) => (
                            <option value={ac.id}>{ac.name}</option>
                          ))}
                        </select>
                        <span className="err" style={{ color: "red" }} />
                      </div>
                      <div className="col-md-2">
                        <button
                          type="button"
                          id="addAccSubCategory"
                          className="btn btn-primary btn-sm pull-right"
                          style={{ marginTop: 26 }}
                          data-toggle="modal"
                          data-target="#myModal"
                          disabled={accCategories.length ? false : true}
                        >
                          Add Sub Category
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Description</label>
                    <textarea
                      id="acctransdesc"
                      className="form-control"
                      name="acctransdesc"
                      placeholder="Enter description"
                      onChange={this.onChange}
                      value={acctransdesc}
                      defaultValue={""}
                      required
                    />
                    <span className="err" style={{ color: "red" }} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Amount</label>
                    <input
                      type="text"
                      className="form-control"
                      id="acctransamount"
                      name="acctransamount"
                      onChange={this.onChange}
                      value={acctransamount}
                      required
                      placeholder="Enter amount"
                    />
                    <span className="err" style={{ color: "red" }} />
                  </div>
                </div>
                {/* /.box-body */}
                <div className="box-footer">
                  <button
                    type="submit"
                    id="btnSave"
                    className="btn btn-primary"
                  >
                    Save
                  </button>
                </div>
                {/*?php //echo form_close(); ?*/}
              </form>
            </div>
          </div>
        </div>
        {/* Modal */}
        {/* Modal*/}
        <form
          method="post"
          name="addSubAccForm"
          id="addSubAccForm"
          onSubmit={this.onSubmitSubCategory}
        >
          <div className="modal fade" id="myModal" role="dialog">
            <div className="modal-dialog">
              {/* Modal content*/}
              <div className="modal-content">
                <div className="modal-header">
                  <button type="button" className="close" data-dismiss="modal">
                    ×
                  </button>
                  <h4 className="modal-title">Add Sub Category</h4>
                </div>
                <div className="modal-body">
                  <span className="err" style={{ color: "red" }}>
                    {errors.accSubCategory}
                  </span>
                  <div className="box-body">
                    <div className="form-group">
                      <label htmlFor="exampleInputEmail1">Sub Category</label>
                      <input
                        type="text"
                        className="form-control"
                        id="accsubcategory"
                        name="accsubcategory"
                        onChange={this.onChange}
                        placeholder="Enter Sub Category"
                        required
                      />
                      <span className="err" style={{ color: "red" }} />
                    </div>
                  </div>
                  {/* /.box-body */}
                  <div
                    id="modalErr"
                    style={{ display: "none", color: "red", float: "right" }}
                  >
                    Please select Account Category
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="submit"
                    id="btnSave"
                    className="btn btn-primary"
                    disabled={accCategories.length ? false : true}
                  >
                    Add
                  </button>
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
        </form>
      </section>
    );
  }
}

AddTransactions.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  getAccTypes: PropTypes.func.isRequired,
  addAccType: PropTypes.func.isRequired,
  addAccount: PropTypes.func.isRequired,
  deleteAccType: PropTypes.func.isRequired,
  addAccCategory: PropTypes.func.isRequired,
  getAccCategories: PropTypes.func.isRequired,
  addAccSubCategory: PropTypes.func.isRequired,
  getAccSubCategories: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  plaid: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  message: PropTypes.object.isRequired,
  transaction: PropTypes.object.isRequired,
  addAccTransaction: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  account: state.account,
  errors: state.errors,
  message: state.message,
  transaction: state.transaction,
});

export default connect(mapStateToProps, {
  logoutUser,
  getAccTypes,
  addAccType,
  addAccount,
  deleteAccType,
  addAccCategory,
  addAccSubCategory,
  getAccSubCategoriesByName,
  getAccCategoriesByName,
  addAccTransaction,
})(AddTransactions);
