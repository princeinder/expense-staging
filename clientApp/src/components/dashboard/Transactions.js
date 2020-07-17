import React, { Component } from "react";
import PropTypes from "prop-types";
import PlaidLinkButton from "react-plaid-link-button";
import { connect } from "react-redux";
import {
  getTransactions,
  updateTransaction,
  deleteTransaction,
} from "../../actions/transactionActions";
import { logoutUser } from "../../actions/authActions";
import MaterialTable from "material-table";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./Dashboard.css";
import moment from "moment";
import {
  getAccounts,
  addAccount,
  getAccTypes,
  addAccType,
  deleteAccType,
  addAccCategory,
  getAccCategories,
  getAccSubCategories,
  getAccCategoriesByName,
  getAccSubCategoriesByName,
} from "../../actions/accountActions";
import { MDBDataTableV5 } from "mdbreact";

class Transactions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: "",
      currentCategory: "",
      trasid: "",
      acctransdate: "",
      acctype: "",
      acccategory: "",
      accsubcategory: "",
      acctransdesc: "",
      acctransamount: "",
      message: "",
    };
  }

  componentDidMount() {
    this.props.getAccCategories();
    this.props.getTransactions();
    this.props.getAccTypes();
    this.props.getAccSubCategories();
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChangeCategorySelect = (event, id) => {
    console.log(event.target.value);
    console.log(id);
    this.props.updateTransaction({ cat_id: event.target.value }, id);
  };

  updateTransactionData = () => {
    const { transid, currentCategory } = this.state;
    this.props.updateTransaction({ cat_id: currentCategory }, transid);
  };
  deleteTransactionData = (id) => {
    this.props.deleteTransaction(id);
  };

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

  onUpdateTransaction = (e, id) => {
    const accTransData = {
      transaction_date: this.state.acctransdate
        ? moment(this.state.acctransdate).format("YYYY-MM-DD")
        : "",
      type_id: this.state.acctype,
      sub_cat_id: this.state.accsubcategory,
      cat_id: this.state.acccategory,
      description: this.state.acctransdesc,
      amount: this.state.acctransamount,
    };
    var propNames = Object.getOwnPropertyNames(accTransData);
    for (var i = 0; i < propNames.length; i++) {
      var propName = propNames[i];
      if (
        accTransData[propName] === null ||
        accTransData[propName] === "" ||
        accTransData[propName] === undefined
      ) {
        delete accTransData[propName];
      }
    }
    this.props.updateTransaction(accTransData, id);
    this.props.history.push("/transaction");
  };

  render() {
    const {
      currentCategory,
      transid,
      acctransdesc,
      acctransdate,
      acctype,
      acccategory,
      accsubcategory,
      acctransamount,
      errors,
    } = this.state;
    const {
      accTypes,
      accountsLoading,
      accCategories,
      accSubCategories,
    } = this.props.account;
    const {
      transactionsLoading,
      transactions,
      message,
    } = this.props.transaction;
    console.log(message);
    // var datatable = {
    //   columns: [
    //     {
    //       label: "Name",
    //       field: "name",
    //       width: 150,
    //       attributes: {
    //         "aria-controls": "DataTable",
    //         "aria-label": "Name",
    //       },
    //     },
    //     {
    //       label: "Position",
    //       field: "position",
    //       width: 270,
    //     },
    //     {
    //       label: "Office",
    //       field: "office",
    //       width: 200,
    //     },
    //     {
    //       label: "Age",
    //       field: "age",
    //       sort: "asc",
    //       width: 100,
    //     },
    //     {
    //       label: "Start date",
    //       field: "date",
    //       sort: "disabled",
    //       width: 150,
    //     },
    //     {
    //       label: "Salary",
    //       field: "salary",
    //       sort: "disabled",
    //       width: 100,
    //     },
    //   ],
    //   rows: [
    //     {
    //       name: "Tiger Nixon",
    //       position: "System Architect",
    //       office: "Edinburgh",
    //       age: "61",
    //       date: "2011/04/25",
    //       salary: "$320",
    //     },
    //     {
    //       name: "Garrett Winters",
    //       position: "Accountant",
    //       office: "Tokyo",
    //       age: "63",
    //       date: "2011/07/25",
    //       salary: "$170",
    //     },
    //     {
    //       name: "Ashton Cox",
    //       position: "Junior Technical Author",
    //       office: "San Francisco",
    //       age: "66",
    //       date: "2009/01/12",
    //       salary: "$86",
    //     },
    //     {
    //       name: "Cedric Kelly",
    //       position: "Senior Javascript Developer",
    //       office: "Edinburgh",
    //       age: "22",
    //       date: "2012/03/29",
    //       salary: "$433",
    //     },
    //     {
    //       name: "Airi Satou",
    //       position: "Accountant",
    //       office: "Tokyo",
    //       age: "33",
    //       date: "2008/11/28",
    //       salary: "$162",
    //     },
    //     {
    //       name: "Brielle Williamson",
    //       position: "Integration Specialist",
    //       office: "New York",
    //       age: "61",
    //       date: "2012/12/02",
    //       salary: "$372",
    //     },
    //     {
    //       name: "Herrod Chandler",
    //       position: "Sales Assistant",
    //       office: "San Francisco",
    //       age: "59",
    //       date: "2012/08/06",
    //       salary: "$137",
    //     },
    //     {
    //       name: "Rhona Davidson",
    //       position: "Integration Specialist",
    //       office: "Tokyo",
    //       age: "55",
    //       date: "2010/10/14",
    //       salary: "$327",
    //     },
    //     {
    //       name: "Colleen Hurst",
    //       position: "Javascript Developer",
    //       office: "San Francisco",
    //       age: "39",
    //       date: "2009/09/15",
    //       salary: "$205",
    //     },
    //     {
    //       name: "Sonya Frost",
    //       position: "Software Engineer",
    //       office: "Edinburgh",
    //       age: "23",
    //       date: "2008/12/13",
    //       salary: "$103",
    //     },
    //     {
    //       name: "Jena Gaines",
    //       position: "Office Manager",
    //       office: "London",
    //       age: "30",
    //       date: "2008/12/19",
    //       salary: "$90",
    //     },
    //     {
    //       name: "Quinn Flynn",
    //       position: "Support Lead",
    //       office: "Edinburgh",
    //       age: "22",
    //       date: "2013/03/03",
    //       salary: "$342",
    //     },
    //     {
    //       name: "Charde Marshall",
    //       position: "Regional Director",
    //       office: "San Francisco",
    //       age: "36",
    //       date: "2008/10/16",
    //       salary: "$470",
    //     },
    //     {
    //       name: "Haley Kennedy",
    //       position: "Senior Marketing Designer",
    //       office: "London",
    //       age: "43",
    //       date: "2012/12/18",
    //       salary: "$313",
    //     },
    //     {
    //       name: "Tatyana Fitzpatrick",
    //       position: "Regional Director",
    //       office: "London",
    //       age: "19",
    //       date: "2010/03/17",
    //       salary: "$385",
    //     },
    //     {
    //       name: "Michael Silva",
    //       position: "Marketing Designer",
    //       office: "London",
    //       age: "66",
    //       date: "2012/11/27",
    //       salary: "$198",
    //     },
    //     {
    //       name: "Paul Byrd",
    //       position: "Chief Financial Officer (CFO)",
    //       office: "New York",
    //       age: "64",
    //       date: "2010/06/09",
    //       salary: "$725",
    //     },
    //     {
    //       name: "Gloria Little",
    //       position: "Systems Administrator",
    //       office: "New York",
    //       age: "59",
    //       date: "2009/04/10",
    //       salary: "$237",
    //     },
    //     {
    //       name: "Bradley Greer",
    //       position: "Software Engineer",
    //       office: "London",
    //       age: "41",
    //       date: "2012/10/13",
    //       salary: "$132",
    //     },
    //     {
    //       name: "Dai Rios",
    //       position: "Personnel Lead",
    //       office: "Edinburgh",
    //       age: "35",
    //       date: "2012/09/26",
    //       salary: "$217",
    //     },
    //     {
    //       name: "Jenette Caldwell",
    //       position: "Development Lead",
    //       office: "New York",
    //       age: "30",
    //       date: "2011/09/03",
    //       salary: "$345",
    //     },
    //     {
    //       name: "Yuri Berry",
    //       position: "Chief Marketing Officer (CMO)",
    //       office: "New York",
    //       age: "40",
    //       date: "2009/06/25",
    //       salary: "$675",
    //     },
    //     {
    //       name: "Caesar Vance",
    //       position: "Pre-Sales Support",
    //       office: "New York",
    //       age: "21",
    //       date: "2011/12/12",
    //       salary: "$106",
    //     },
    //     {
    //       name: "Doris Wilder",
    //       position: "Sales Assistant",
    //       office: "Sidney",
    //       age: "23",
    //       date: "2010/09/20",
    //       salary: "$85",
    //     },
    //     {
    //       name: "Angelica Ramos",
    //       position: "Chief Executive Officer (CEO)",
    //       office: "London",
    //       age: "47",
    //       date: "2009/10/09",
    //       salary: "$1",
    //     },
    //     {
    //       name: "Gavin Joyce",
    //       position: "Developer",
    //       office: "Edinburgh",
    //       age: "42",
    //       date: "2010/12/22",
    //       salary: "$92",
    //     },
    //     {
    //       name: "Jennifer Chang",
    //       position: "Regional Director",
    //       office: "Singapore",
    //       age: "28",
    //       date: "2010/11/14",
    //       salary: "$357",
    //     },
    //     {
    //       name: "Brenden Wagner",
    //       position: "Software Engineer",
    //       office: "San Francisco",
    //       age: "28",
    //       date: "2011/06/07",
    //       salary: "$206",
    //     },
    //     {
    //       name: "Fiona Green",
    //       position: "Chief Operating Officer (COO)",
    //       office: "San Francisco",
    //       age: "48",
    //       date: "2010/03/11",
    //       salary: "$850",
    //     },
    //     {
    //       name: "Shou Itou",
    //       position: "Regional Marketing",
    //       office: "Tokyo",
    //       age: "20",
    //       date: "2011/08/14",
    //       salary: "$163",
    //     },
    //     {
    //       name: "Michelle House",
    //       position: "Integration Specialist",
    //       office: "Sidney",
    //       age: "37",
    //       date: "2011/06/02",
    //       salary: "$95",
    //     },
    //     {
    //       name: "Suki Burks",
    //       position: "Developer",
    //       office: "London",
    //       age: "53",
    //       date: "2009/10/22",
    //       salary: "$114",
    //     },
    //     {
    //       name: "Prescott Bartlett",
    //       position: "Technical Author",
    //       office: "London",
    //       age: "27",
    //       date: "2011/05/07",
    //       salary: "$145",
    //     },
    //     {
    //       name: "Gavin Cortez",
    //       position: "Team Leader",
    //       office: "San Francisco",
    //       age: "22",
    //       date: "2008/10/26",
    //       salary: "$235",
    //     },
    //     {
    //       name: "Martena Mccray",
    //       position: "Post-Sales support",
    //       office: "Edinburgh",
    //       age: "46",
    //       date: "2011/03/09",
    //       salary: "$324",
    //     },
    //     {
    //       name: "Unity Butler",
    //       position: "Marketing Designer",
    //       office: "San Francisco",
    //       age: "47",
    //       date: "2009/12/09",
    //       salary: "$85",
    //     },
    //     {
    //       name: "Howard Hatfield",
    //       position: "Office Manager",
    //       office: "San Francisco",
    //       age: "51",
    //       date: "2008/12/16",
    //       salary: "$164",
    //     },
    //     {
    //       name: "Hope Fuentes",
    //       position: "Secretary",
    //       office: "San Francisco",
    //       age: "41",
    //       date: "2010/02/12",
    //       salary: "$109",
    //     },
    //     {
    //       name: "Vivian Harrell",
    //       position: "Financial Controller",
    //       office: "San Francisco",
    //       age: "62",
    //       date: "2009/02/14",
    //       salary: "$452",
    //     },
    //     {
    //       name: "Timothy Mooney",
    //       position: "Office Manager",
    //       office: "London",
    //       age: "37",
    //       date: "2008/12/11",
    //       salary: "$136",
    //     },
    //     {
    //       name: "Jackson Bradshaw",
    //       position: "Director",
    //       office: "New York",
    //       age: "65",
    //       date: "2008/09/26",
    //       salary: "$645",
    //     },
    //     {
    //       name: "Olivia Liang",
    //       position: "Support Engineer",
    //       office: "Singapore",
    //       age: "64",
    //       date: "2011/02/03",
    //       salary: "$234",
    //     },
    //     {
    //       name: "Bruno Nash",
    //       position: "Software Engineer",
    //       office: "London",
    //       age: "38",
    //       date: "2011/05/03",
    //       salary: "$163",
    //     },
    //     {
    //       name: "Sakura Yamamoto",
    //       position: "Support Engineer",
    //       office: "Tokyo",
    //       age: "37",
    //       date: "2009/08/19",
    //       salary: "$139",
    //     },
    //     {
    //       name: "Thor Walton",
    //       position: "Developer",
    //       office: "New York",
    //       age: "61",
    //       date: "2013/08/11",
    //       salary: "$98",
    //     },
    //     {
    //       name: "Finn Camacho",
    //       position: "Support Engineer",
    //       office: "San Francisco",
    //       age: "47",
    //       date: "2009/07/07",
    //       salary: "$87",
    //     },
    //     {
    //       name: "Serge Baldwin",
    //       position: "Data Coordinator",
    //       office: "Singapore",
    //       age: "64",
    //       date: "2012/04/09",
    //       salary: "$138",
    //     },
    //     {
    //       name: "Zenaida Frank",
    //       position: "Software Engineer",
    //       office: "New York",
    //       age: "63",
    //       date: "2010/01/04",
    //       salary: "$125",
    //     },
    //     {
    //       name: "Zorita Serrano",
    //       position: "Software Engineer",
    //       office: "San Francisco",
    //       age: "56",
    //       date: "2012/06/01",
    //       salary: "$115",
    //     },
    //     {
    //       name: "Jennifer Acosta",
    //       position: "Junior Javascript Developer",
    //       office: "Edinburgh",
    //       age: "43",
    //       date: "2013/02/01",
    //       salary: "$75",
    //     },
    //     {
    //       name: "Cara Stevens",
    //       position: "Sales Assistant",
    //       office: "New York",
    //       age: "46",
    //       date: "2011/12/06",
    //       salary: "$145",
    //     },
    //     {
    //       name: "Hermione Butler",
    //       position: "Regional Director",
    //       office: "London",
    //       age: "47",
    //       date: "2011/03/21",
    //       salary: "$356",
    //     },
    //     {
    //       name: "Lael Greer",
    //       position: "Systems Administrator",
    //       office: "London",
    //       age: "21",
    //       date: "2009/02/27",
    //       salary: "$103",
    //     },
    //     {
    //       name: "Jonas Alexander",
    //       position: "Developer",
    //       office: "San Francisco",
    //       age: "30",
    //       date: "2010/07/14",
    //       salary: "$86",
    //     },
    //     {
    //       name: "Shad Decker",
    //       position: "Regional Director",
    //       office: "Edinburgh",
    //       age: "51",
    //       date: "2008/11/13",
    //       salary: "$183",
    //     },
    //     {
    //       name: "Michael Bruce",
    //       position: "Javascript Developer",
    //       office: "Singapore",
    //       age: "29",
    //       date: "2011/06/27",
    //       salary: "$183",
    //     },
    //     {
    //       name: "Donna Snider",
    //       position: "Customer Support",
    //       office: "New York",
    //       age: "27",
    //       date: "2011/01/25",
    //       salary: "$112",
    //     },
    //   ],
    // };
    console.log(message);
    return (
      <div>
        <section className="content">
          <div className="row">
            <div className="col-xs-12">
              <div className="box">
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
                <div className="box-header">
                  <div className="row">
                    <div className="col-xs-6">
                      <select
                        className="btn btn-primary"
                        style={{ borderRadius: 25 }}
                      >
                        <option> Bank of America</option>
                      </select>
                    </div>
                    <div className="col-xs-4">
                      <div className="form-group">
                        <div className="input-group">
                          <div className="input-group-addon">
                            <i className="fa fa-calendar" />
                          </div>
                          <input
                            type="text"
                            className="form-control pull-right"
                            id="date_range"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-xs-2 ">
                      {/* <input class="btn btn-success refresh" type="button" value="Refresh">  */}
                      {/*i class="fa fa-upload" aria-hidden="true"></i>
			<i class="fa fa-fw fa-plus-circle"></i>
			<i class="fa fa-fw fa-edit"></i>
			<i class="fa fa-fw fa-ellipsis-h"></i*/}
                    </div>
                  </div>
                </div>
                {/* /.box-header */}
                <div className="box-body">
                  {/* <MDBDataTableV5
                    hover
                    entriesOptions={[5, 20, 25]}
                    entries={5}
                    pagesAmount={4}
                    data={datatable}
                    checkbox
                    headCheckboxID="id41"
                    bodyCheckboxID="checkboxes41"
                    // getValueCheckboxes={(e) => {
                    //   showLogs2(e);
                    // }}
                    // getValueAllCheckBoxes={(e) => {
                    //   showLogs2(e);
                    // }}
                    multipleCheckboxes
                    proCheckboxes
                    filledCheckboxes
                    proSelect
                  /> */}
                  <table
                    id="example2"
                    className="table table-bordered table-hover"
                  >
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Type</th>
                        <th>Categories</th>
                        <th>Sub Categories</th>
                        <th>Description</th>
                        <th>Amount</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {transactionsLoading ? (
                        <tr style={{ textAlign: "center" }}>Loading</tr>
                      ) : (
                        ""
                      )}
                      {transactions.map((item, index) => (
                        <tr key={item.transaction_id}>
                          <td>{moment(item.date).format("YYYY-MM-DD")}</td>
                          <td>{item.transaction_type}</td>

                          <td>
                            <select
                              className="form-control"
                              name="currentCategory"
                              onChange={(e) =>
                                this.onChangeCategorySelect(
                                  e,
                                  item.transaction_id
                                )
                              }
                            >
                              {accCategories.map((accCat) => (
                                <option
                                  selected={
                                    accCat.name == item.category ? true : false
                                  }
                                  value={
                                    accCat.name == item.category
                                      ? ""
                                      : accCat.id
                                  }
                                >
                                  {accCat.name}
                                </option>
                              ))}
                            </select>
                          </td>
                          <td>{item.subcategory ? item.subcategory : " "}</td>
                          <td>{item.name}</td>
                          <td>{"$ " + item.amount}</td>
                          <td>
                            {transid == item.transaction_id &&
                            currentCategory ? (
                              <input
                                className="btn btn-primary edit_data"
                                type="button"
                                value="Update"
                                onClick={this.updateTransactionData}
                              />
                            ) : (
                              <button
                                className="btn btn-primary edit_data"
                                type="button"
                                value="Edit"
                                data-toggle="modal"
                                data-target={
                                  "#edit_modal" + item.transaction_id
                                }
                              >
                                Edit
                              </button>
                            )}

                            <input
                              className="btn btn-danger delete_trans"
                              type="button"
                              value="Delete"
                              onClick={(e) =>
                                this.deleteTransactionData(item.transaction_id)
                              }
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <a href="/addtransaction" className="btn btn-primary">
                    Add Transaction
                  </a>
                  {/* <input class="btn btn-primary add_transaction" type="button" value="Add Transaction">  */}
                </div>
                {/* /.box-body */}
              </div>
              {/* /.box */}
            </div>
            {/* /.col */}
          </div>
          {/* /.row */}
        </section>
        {/* Modal*/}
        {/* Modal*/}

        {transactions.map((item, index) => (
          <div
            className="modal fade"
            id={"edit_modal" + item.transaction_id}
            role="dialog"
          >
            <div className="modal-dialog">
              {/* Modal content*/}
              <div className="modal-content">
                <div className="modal-header">
                  <button type="button" className="close" data-dismiss="modal">
                    ×
                  </button>
                  <h4 className="modal-title">Update Transaction</h4>
                  {message.accTransaction ? (
                    <span className="err" style={{ color: "red" }}>
                      {message.accTransaction}
                    </span>
                  ) : null}
                </div>
                <div className="modal-body">
                  <form
                    method="post"
                    name="addTransactionForm"
                    id="addTransactionForm"
                  >
                    <div className="box-body">
                      <div className="form-group">
                        <label>Date:</label>
                        <div>
                          <DatePicker
                            required
                            id="acctransdate"
                            className="form-control"
                            value={
                              acctransdate
                                ? acctransdate
                                : moment(item.date).format("MM/DD/YYYY")
                            }
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
                          required
                        >
                          <option value="">--Type--</option>
                          {accountsLoading ? <div>Loading</div> : ""}
                          {accTypes.map((ac) => (
                            <option
                              selected={ac.name == item.transaction_type}
                              value={ac.id}
                            >
                              {ac.name}
                            </option>
                          ))}
                        </select>
                        <span className="err" style={{ color: "red" }} />
                      </div>
                      <div className="form-group">
                        <label htmlFor="exampleInputEmail1">
                          Account Category
                        </label>
                        <select
                          required
                          id="acccategory"
                          name="acccategory"
                          className="form-control"
                          onChange={this.onChangeCategory}
                          disabled={accCategories.length ? false : true}
                          required
                        >
                          <option value="">--Account Category--</option>
                          {accountsLoading ? <div>Loading</div> : ""}
                          {accCategories.map((ac) => (
                            <option
                              selected={ac.name == item.category}
                              value={ac.id}
                            >
                              {ac.name}
                            </option>
                          ))}
                        </select>
                        {/*input type="text" class="form-control" id="account_name" name ="account_name" placeholder="Enter account name"*/}
                        <span className="err" style={{ color: "red" }} />
                      </div>
                      <div className="form-group">
                        <div className="row">
                          <div className="col-md-12">
                            <label htmlFor="exampleInputEmail1">
                              Sub Category
                            </label>
                            <select
                              required
                              id="accsubcategory"
                              name="accsubcategory"
                              className="form-control"
                              onChange={this.onChange}
                              disabled={accCategories.length ? false : true}
                            >
                              <option value="">--Sub Category--</option>
                              {accountsLoading ? <div>Loading</div> : ""}
                              {accSubCategories.map((ac) => (
                                <option
                                  selected={ac.name == item.subcategory}
                                  value={ac.id}
                                >
                                  {ac.name}
                                </option>
                              ))}
                            </select>
                            <span className="err" style={{ color: "red" }} />
                          </div>
                        </div>
                      </div>
                      <div className="form-group">
                        <label htmlFor="exampleInputPassword1">
                          Description
                        </label>
                        <textarea
                          id="acctransdesc"
                          className="form-control"
                          name="acctransdesc"
                          placeholder="Enter description"
                          onChange={this.onChange}
                          // value={item.name}
                          defaultValue={item.name}
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
                          //value={item.amount}
                          defaultValue={item.amount}
                          required
                          placeholder="Enter amount"
                        />
                        <span className="err" style={{ color: "red" }} />
                      </div>
                    </div>
                    {/* /.box-body */}
                  </form>
                </div>
                <div className="modal-footer">
                  <button
                    type="submit"
                    id="btnSubmit"
                    className="btn btn-primary"
                    onClick={(e) =>
                      this.onUpdateTransaction(e, item.transaction_id)
                    }
                  >
                    Update
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
        ))}
      </div>
    );
  }
}

Transactions.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  getAccTypes: PropTypes.func.isRequired,
  addAccType: PropTypes.func.isRequired,
  addAccount: PropTypes.func.isRequired,
  deleteAccType: PropTypes.func.isRequired,
  addAccCategory: PropTypes.func.isRequired,
  getAccCategories: PropTypes.func.isRequired,
  getAccSubCategories: PropTypes.func.isRequired,
  getAccCategoriesByName: PropTypes.func.isRequired,
  getAccSubCategoriesByName: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  plaid: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  getTransactions: PropTypes.func.isRequired,
  transaction: PropTypes.object.isRequired,
  updateTransaction: PropTypes.object.isRequired,
  deleteTransaction: PropTypes.object.isRequired,
  history: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  account: state.account,
  errors: state.errors,
  transaction: state.transaction,
});

export default connect(mapStateToProps, {
  logoutUser,
  getAccTypes,
  addAccType,
  addAccount,
  deleteAccType,
  addAccCategory,
  getAccCategories,
  getAccSubCategories,
  getTransactions,
  updateTransaction,
  deleteTransaction,
  getAccCategoriesByName,
  getAccSubCategoriesByName,
})(Transactions);
