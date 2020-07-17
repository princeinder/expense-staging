import React, { Component } from "react";
import PlaidLinkButton from "react-plaid-link-button";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { getAccSubCategories, addAccount } from "../../actions/accountActions";
import DataTable from "react-data-table-component";

class SubCategories extends Component {
  componentDidMount() {
    this.props.getAccSubCategories();
  }

  // Logout
  onLogoutClick = (e) => {
    e.preventDefault();
    this.props.logoutUser();
  };
  onEvent = (e, metadata) => {
    var ins_id = metadata.institution_id;
    if (ins_id == "") {
    }
    return false;
    //if (e == 'SELECT_INSTITUTION')
    //  metadata.
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
    const columns = [
      {
        name: "Name",
        selector: "name",
        sortable: true,
      },
      {
        name: "Type",
        selector: "type",
        sortable: true,
      },
      {
        name: "Subtype",
        selector: "type",
        sortable: true,
      },
      {
        cell: () => (
          <div>
            <input
              className="btn btn-primary edit_data"
              type="button"
              value="Edit"
              style={{ marginRight: "5px" }}
            />

            <input
              className="btn btn-danger delete_trans"
              type="button"
              value="Delete"
            />
          </div>
        ),
        ignoreRowClick: true,
        allowOverflow: true,
        button: true,
      },
    ];
    const { user } = this.props.auth;
    console.log(this.props);
    const { items, accountsLoading } = this.props.account;
    console.log(items);
    // console.log(accountsLoading);
    // const { accounts, accountsLoading } = this.props.account;

    let accountContent;
    accountContent = (
      <div>
        <section className="content">
          <div className="row">
            <div className="col-sm-offset-2 col-md-8">
              <div className="box box-primary">
                <div id="alertMsg" />
                {/* /.box-header */}
                {/* form start */}
              </div>
            </div>
            <div className="col-sm-offset-2 col-md-8">
              <div className="row">
                <div className="col-md-12">
                  <div className="col-md-6">
                    <h3 className="box-title m-30 ">Sub Categories</h3>
                  </div>
                  {/* <div className="col-md-6" style={{ textAlign: "right" }}>
                    <PlaidLinkButton
                      buttonProps={{
                        className: "btn btn-primary",
                      }}
                      plaidLinkProps={{
                        clientName: "Expense",
                        key: "1081d0c03138252152adc52608d250",
                        env: "sandbox",
                        product: ["transactions"],
                        onSuccess: this.handleOnSuccess,
                        onEvent: this.onEvent,
                      }}
                      onScriptLoad={() => this.setState({ loaded: true })}
                    >
                      Add Account
                    </PlaidLinkButton>
                  </div> */}
                </div>
              </div>
              <div className="box-body">
                {/* {accountsLoading ? (
                  <tr style={{ textAlign: "center" }}>Loading</tr>
                ) : (
                  ""
                )}
                <DataTable
                  pagination={true}
                  title="Sub Accounts Name List"
                  columns={columns}
                  data={items}
                /> */}
                <table
                  id="categoryTable"
                  className="table table-bordered table-hover"
                >
                  <thead>
                    <tr>
                      {/* <th>S.No</th>  */}
                      <th>Type</th>
                      <th>Categories</th>
                      <th>Sub Categories</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {accountsLoading ? (
                      <tr>
                        <td>Loading</td>
                      </tr>
                    ) : (
                      ""
                    )}
                    {items.map((ac) => (
                      <tr>
                        <td>{ac.name}</td>
                        <td>{ac.type}</td>
                        <td>{ac.subtype}</td>
                        <td>
                          <input
                            className="btn btn-primary edit_data"
                            type="button"
                            value="Edit"
                          />{" "}
                          <input
                            className="btn btn-danger delete_trans"
                            type="button"
                            value="Delete"
                          />
                        </td>
                      </tr>
                    ))}
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
                <h4 className="modal-title">Edit Sub Account Name</h4>
              </div>
              <div className="modal-body">
                <form
                  method="post"
                  name="updateSubCategoryForm"
                  id="updateSubCategoryForm"
                >
                  <div className="box-body">
                    <div className="form-group">
                      <label htmlFor="category Name">Sub Account Name</label>
                      <input
                        type="text"
                        className="form-control"
                        id="name_edit"
                        name="name"
                        placeholder="Enter Category"
                        required
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
      </div>
    );

    return <div className="container">{accountContent}</div>;
  }
}

SubCategories.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  getAccSubCategories: PropTypes.func.isRequired,
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
  getAccSubCategories,
  addAccount,
})(SubCategories);
