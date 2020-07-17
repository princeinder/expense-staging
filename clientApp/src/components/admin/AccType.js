import React, { Component } from "react";
import PlaidLinkButton from "react-plaid-link-button";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import moment from "moment";
import { logoutUser } from "../../actions/authActions";
import {
  getAccounts,
  addAccount,
  getAccTypes,
  addAccType,
  deleteAccType,
} from "../../actions/accountActions";
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

class AccType extends Component {
  constructor(props) {
    super(props);
    this.state = {
      acctype: "",
      errors: "",
    };
  }

  componentDidMount() {
    this.props.getAccTypes();
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

  delAccType = (id) => {
    this.props.deleteAccType(id);
  };

  onSubmit = (e) => {
    e.preventDefault();

    const accTypeData = {
      acctype: this.state.acctype,
    };

    this.props.addAccType(accTypeData);
  };
  render() {
    const { errors } = this.state;
    const { accTypes, accountsLoading } = this.props.account;
    return (
      <div>
        <section className="content">
          <div className="row">
            <div className="col-sm-offset-2 col-md-8">
              <div className="box box-primary">
                <div id="alertMsg" />
                <div className="box-header with-border">
                  <h3 className="box-title">Add Type</h3>
                </div>
                {/* /.box-header */}
                {/* form start */}
                <form
                  method="post"
                  name="addCategoryForm"
                  id="addCategoryForm"
                  onSubmit={this.onSubmit}
                >
                  <div className="box-body">
                    <div className="form-group">
                      <label htmlFor="category Name">Type</label>
                      <input
                        type="text"
                        onChange={this.onChange}
                        className="form-control"
                        id="acctype"
                        name="acctype"
                        placeholder="Enter Type"
                      />
                      <span className="err" style={{ color: "red" }}>
                        {errors.accType}
                      </span>
                    </div>
                  </div>
                  {/* /.box-body */}
                  <div className="box-footer">
                    <button
                      type="submit"
                      id="btnSave"
                      className="btn btn-success pull-right"
                    >
                      Save
                    </button>
                  </div>
                  {/*?php //echo form_close(); ?*/}
                </form>
              </div>
            </div>
            <div className="col-sm-offset-2 col-md-8">
              <h3 className="box-title m-30 ">Type List</h3>
              <div className="box-body">
                <table
                  id="categoryTable"
                  className="table table-bordered table-hover"
                >
                  <thead>
                    <tr>
                      <th>S.No</th>
                      <th>Type Name</th>
                      <th>Created</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {accountsLoading ? (
                      <tr style={{ textAlign: "center" }}>Loading</tr>
                    ) : (
                      ""
                    )}
                    {accTypes ? (
                      accTypes.map((ac) => (
                        <tr>
                          <td>{ac.id}</td>
                          <td>{ac.name}</td>
                          <td>{moment(ac.created).format("Do MMMM, YYYY")}</td>
                          <td>
                            {" "}
                            <input
                              className="btn btn-primary edit_data"
                              type="button"
                              value="Edit"
                            />{" "}
                            <input
                              onClick={() => this.delAccType(ac.id)}
                              className="btn btn-danger delete_trans"
                              type="button"
                              value="Delete"
                            />
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>No results found</tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>
        <div className="modal fade" id="edit_modal" role="dialog">
          <div className="modal-dialog">
            {/* Modal content*/}
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal">
                  ×
                </button>
                <h4 className="modal-title">Edit Category</h4>
              </div>
              <div className="modal-body">
                <form
                  method="post"
                  name="updateCategoryForm"
                  id="updateCategoryForm"
                  action
                >
                  <div className="box-body">
                    <div className="form-group">
                      <label htmlFor="exampleInputEmail1">Category Name</label>
                      <input
                        type="text"
                        className="form-control"
                        id="name_edit"
                        name="name"
                        placeholder="Enter Category Name"
                      />
                      <span className="err" style={{ color: "red" }} />
                    </div>
                    <input type="hidden" id="cat_id" name="cat_id" />
                  </div>
                  {/* /.box-body */}
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="submit"
                  id="updateBtnSave"
                  className="btn btn-primary"
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
        <link
          rel="stylesheet"
          href="<?php echo ASSETS;?>bower_components/datatables.net-bs/css/dataTables.bootstrap.min.css"
        />
      </div>
    );
  }
}

AccType.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  getAccTypes: PropTypes.func.isRequired,
  addAccType: PropTypes.func.isRequired,
  addAccount: PropTypes.func.isRequired,
  deleteAccType: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  plaid: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  account: state.account,
  errors: state.errors,
});

export default connect(mapStateToProps, {
  logoutUser,
  getAccTypes,
  addAccType,
  addAccount,
  deleteAccType,
})(AccType);
