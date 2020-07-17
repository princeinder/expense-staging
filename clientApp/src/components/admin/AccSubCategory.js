import React, { Component } from "react";
import PlaidLinkButton from "react-plaid-link-button";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import moment from "moment";
import {
  addAccount,
  getAccTypes,
  addAccType,
  deleteAccType,
  addAccCategory,
  getAccCategories,
  getAccSubCategories,
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

class AccSubCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      acccategory: "",
      accsubcategory: "",
      errors: "",
    };
  }
  componentDidMount() {
    this.props.getAccSubCategories();
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors,
      });
    }
    if (nextProps.postDeleted) {
      this.props.account.unshift(nextProps.newPost);
    }
  }

  onChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };
  onSubmit = (e) => {
    e.preventDefault();

    const accNameData = {
      accsubcategory: this.state.accsubcategory,
      acccategory: this.state.acccategory,
    };

    this.props.addAccSubCategory(accNameData);
  };
  render() {
    const { user } = this.props.auth;
    console.log(this.props.account);
    const { accTypes, accountsLoading, accCategories } = this.props.account;

    return (
      <div>
        <section className="content">
          <div className="row">
            <div className="col-sm-offset-2 col-md-8">
              <div className="box box-primary">
                <div id="alertMsg" />
                <div className="box-header with-border">
                  <h3 className="box-title">Account Sub Category</h3>
                </div>
                {/* /.box-header */}
                {/* form start */}
                <form
                  method="post"
                  name="addSubCategoryForm"
                  id="addSubCategoryForm"
                  onSubmit={this.onSubmit}
                >
                  <div className="box-body">
                    <div className="form-group">
                      <label>Account Category</label>
                      <select
                        id="acccategory"
                        name="acccategory"
                        className="form-control"
                        onChange={this.onChange}
                      >
                        <option value>--Account Category--</option>
                        {accountsLoading ? <div>Loading</div> : ""}
                        {accCategories.map((ac) => (
                          <option value={ac.id}>{ac.name}</option>
                        ))}
                      </select>
                      <span className="err" style={{ color: "red" }} />
                    </div>
                    <div className="form-group">
                      <label htmlFor="category Name">
                        Account Sub Category
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="accsubcategory"
                        name="accsubcategory"
                        onChange={this.onChange}
                        placeholder="Enter Category"
                      />
                      <span className="err" style={{ color: "red" }} />
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
              <h3 className="box-title m-30 ">Account Sub Categories</h3>
              <div className="box-body">
                <table
                  id="categoryTable"
                  className="table table-bordered table-hover"
                >
                  <thead>
                    <tr>
                      <th>S.No</th>
                      <th>Account Categories</th>
                      <th>Account Sub Categories</th>
                      <th>Created</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody></tbody>
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
                  name="updateSubCategoryForm"
                  id="updateSubCategoryForm"
                  onSubmit={this.onSubmit}
                >
                  <div className="box-body">
                    <div className="form-group">
                      <label htmlFor="exampleInputEmail1">Category Name</label>
                      <select
                        id="cat_name_edit"
                        name="cat_name"
                        className="form-control"
                      >
                        {/*?php foreach($categoryList as $val){?*/}
                        <option value="<?= $val['id'];?>">
                          {" "}
                          {/*?= $val['name'];?*/}{" "}
                        </option>
                        {/*?php } ?*/}
                      </select>
                      <span className="err" style={{ color: "red" }} />
                    </div>
                    <div className="form-group">
                      <label htmlFor="category Name">Sub Category Name</label>
                      <input
                        type="text"
                        className="form-control"
                        id="name_edit"
                        name="name"
                        placeholder="Enter Category"
                      />
                      <span className="err" style={{ color: "red" }} />
                    </div>
                    <input type="hidden" id="sub_cat_id" name="sub_cat_id" />
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

AccSubCategory.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  getAccTypes: PropTypes.func.isRequired,
  addAccType: PropTypes.func.isRequired,
  addAccount: PropTypes.func.isRequired,
  deleteAccType: PropTypes.func.isRequired,
  addAccCategory: PropTypes.func.isRequired,
  getAccCategories: PropTypes.func.isRequired,
  getAccSubCategories: PropTypes.func.isRequired,
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
  addAccCategory,
  getAccCategories,
  getAccSubCategories,
})(AccSubCategory);
