const mysql = require("../config/conn");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
let instance = null;

class Account {
  static getAccountInstance() {
    return instance ? instance : new Account();
  }
  async getUserAccounts(userid) {
    try {
      const response = await new Promise((resolve, reject) => {
        const query = "SELECT * from accounts WHERE userid = ? ";
        mysql.query(query, [userid], (err, results) => {
          if (err) reject(new Error(err.message));
          resolve(results);
        });
      });
      return response;
    } catch (error) {
      return error;
    }
  }

  async createUserAccounts(account) {
    try {
      const response = await new Promise((resolve, reject) => {
        const prequery = "SELECT 1 from accounts WHERE institutionId = ? ";
        mysql.query(prequery, [account.institutionId], (err, results) => {
          if (results[0]) {
            S;
            reject(new Error("Account Already Linked"));
          } else {
            const query = "INSERT into accounts SET ? ";
            mysql.query(query, [account], (err, results) => {
              if (err) reject(new Error(err.message));
              resolve(results.insertId);
            });
          }
        });
      });
      return response;
    } catch (error) {
      return error;
    }
  }

  async createAccountType(name) {
    try {
      const response = await new Promise((resolve, reject) => {
        const query = "INSERT into account_types SET name = ? ";
        mysql.query(query, [name], (err, results) => {
          if (err) reject(new Error(err.message));
          resolve(results.insertId);
        });
      });
      return response;
    } catch (error) {
      return error;
    }
  }

  async getAccountType(name) {
    try {
      const response = await new Promise((resolve, reject) => {
        const query = "SELECT 1 from account_types WHERE name = ? ";
        mysql.query(query, [name], (err, results) => {
          if (err) reject(new Error(err.message));
          resolve(results[0]);
        });
      });
      return response;
    } catch (error) {
      return error;
    }
  }

  async deleteAccountType(id) {
    try {
      const response = await new Promise((resolve, reject) => {
        const query = "DELETE from account_types WHERE id = ? ";
        mysql.query(query, [id], (err, results) => {
          if (err) reject(new Error(err.message));
          resolve(results);
        });
      });
      return response;
    } catch (error) {
      return error;
    }
  }

  async getAccountTypes() {
    try {
      const response = await new Promise((resolve, reject) => {
        const query = "SELECT * from account_types";
        mysql.query(query, (err, results) => {
          if (err) reject(new Error(err.message));
          console.log(results);
          resolve(results);
        });
      });
      return response;
    } catch (error) {
      return error;
    }
  }

  async getAccountCategory(name) {
    try {
      const response = await new Promise((resolve, reject) => {
        const query = "SELECT 1 from account_categories WHERE name = ? ";
        mysql.query(query, [name], (err, results) => {
          if (err) reject(new Error(err.message));
          resolve(results[0]);
        });
      });
      return response;
    } catch (error) {
      return error;
    }
  }
  async addAccountCategory(data) {
    try {
      const response = await new Promise((resolve, reject) => {
        const query =
          "INSERT into account_categories SET name = ? ,type_id = ? ";
        mysql.query(
          query,
          [data.acccategory, parseInt(data.acctype)],
          (err, results) => {
            if (err) reject(new Error(err.message));
            resolve(results.insertId);
          }
        );
      });
      return response;
    } catch (error) {
      return error;
    }
  }

  async getAccountCategories() {
    try {
      const response = await new Promise((resolve, reject) => {
        const query =
          "SELECT account_categories.*,account_types.name as type from account_categories  LEFT JOIN account_types ON account_categories.type_id=account_types.id ";
        mysql.query(query, (err, results) => {
          if (err) reject(new Error(err.message));
          console.log(results);
          resolve(results);
        });
      });
      return response;
    } catch (error) {
      return error;
    }
  }

  async getAccountCategoriesByName(typeid) {
    try {
      const response = await new Promise((resolve, reject) => {
        const query = "SELECT * from account_categories  WHERE type_id = ? ";
        mysql.query(query, [typeid], (err, results) => {
          if (err) reject(new Error(err.message));
          resolve(results);
        });
      });
      return response;
    } catch (error) {
      return error;
    }
  }
  async getAccountSubCategoriesByName(catid, userid) {
    try {
      const response = await new Promise((resolve, reject) => {
        const query =
          "SELECT * from account_sub_categories WHERE cat_id = ? AND user_id = ?";
        mysql.query(query, [catid, userid], (err, results) => {
          if (err) reject(new Error(err.message));
          resolve(results);
        });
      });
      return response;
    } catch (error) {
      return error;
    }
  }
  async getAccountSubCategory(name) {
    try {
      const response = await new Promise((resolve, reject) => {
        const query = "SELECT 1 from account_sub_categories WHERE name = ?";
        mysql.query(query, [name], (err, results) => {
          console.log(results);
          if (err) reject(new Error(err.message));
          resolve(results[0]);
        });
      });
      return response;
    } catch (error) {
      return error;
    }
  }

  async addAccountSubCategories(data, userid) {
    try {
      const response = await new Promise((resolve, reject) => {
        const query =
          "INSERT into account_sub_categories SET name = ? ,cat_id = ? ,user_id = ? ";
        mysql.query(
          query,
          [data.accsubcategory, parseInt(data.acccategory), userid],
          (err, results) => {
            if (err) reject(new Error(err.message));
            resolve(results.insertId);
          }
        );
      });
      return response;
    } catch (error) {
      return error;
    }
  }

  async getAccountSubCategories() {
    try {
      const response = await new Promise((resolve, reject) => {
        const query =
          "SELECT account_sub_categories.*,account_categories.name as category from account_sub_categories  LEFT JOIN account_categories ON account_sub_categories.cat_id=account_categories.id ";
        mysql.query(query, (err, results) => {
          if (err) reject(new Error(err.message));
          resolve(results);
        });
      });
      return response;
    } catch (error) {
      return error;
    }
  }

  async getAccountCategory(name) {
    try {
      const response = await new Promise((resolve, reject) => {
        const query = "SELECT 1 from account_categories WHERE name = ? ";
        mysql.query(query, [name], (err, results) => {
          if (err) reject(new Error(err.message));
          resolve(results[0]);
        });
      });
      return response;
    } catch (error) {
      return error;
    }
  }

  async addAccountTransaction(data) {
    try {
      const response = await new Promise((resolve, reject) => {
        const query = "INSERT into account_transactions SET ? ";
        mysql.query(query, [data], (err, results) => {
          if (err) reject(new Error(err.message));
          resolve(results.insertId);
        });
      });
      return response;
    } catch (error) {
      return error;
    }
  }
  async getAccountTransactions(userid) {
    try {
      const response = await new Promise((resolve, reject) => {
        const query = `SELECT account_transactions.amount,account_transactions.id as transaction_id ,account_transactions.transaction_date as date ,account_transactions.description as name,account_types.name as transaction_type ,account_categories.name as category ,account_sub_categories.name as subcategory from account_transactions LEFT JOIN account_types ON account_transactions.type_id = account_types.id LEFT JOIN account_categories ON  account_transactions.cat_id= account_categories.id LEFT JOIN account_sub_categories ON account_transactions.sub_cat_id = account_sub_categories.id WHERE account_transactions.user_id = ?`;
        mysql.query(query, [userid], (err, results) => {
          if (err) reject(new Error(err.message));
          resolve(results);
        });
      });
      return response;
    } catch (error) {
      return error;
    }
  }
  async updateAccountTransaction(id, data) {
    try {
      const response = await new Promise((resolve, reject) => {
        const query = "UPDATE account_transactions SET ? WHERE id = ?";
        mysql.query(query, [data, id], (err, results) => {
          console.log(err);
          if (err) reject(new Error(err.message));
          if (results.changedRows) resolve(id);
        });
      });
      return response;
    } catch (error) {
      return error;
    }
  }

  async deleteAccountTransaction(id) {
    console.log(id);
    try {
      const response = await new Promise((resolve, reject) => {
        const query = "DELETE from account_transactions  WHERE id = ?";
        mysql.query(query, [id], (err, results) => {
          if (err) reject(new Error(err.message));
          if (results.affectedRows) resolve(id);
        });
      });
      return response;
    } catch (error) {
      return error;
    }
  }

  async getAccountTransaction(desc) {
    try {
      const response = await new Promise((resolve, reject) => {
        const query =
          "SELECT 1 from account_transactions WHERE description = ?";
        mysql.query(query, [desc], (err, results) => {
          if (err) reject(new Error(err.message));
          resolve(results[0]);
        });
      });
      return response;
    } catch (error) {
      return error;
    }
  }
}

module.exports = Account;
