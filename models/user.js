const mysql = require("../config/conn");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
let instance = null;

class User {
  static getUserInstance() {
    return instance ? instance : new User();
  }

  async getAllUsers(role) {
    try {
      const response = await new Promise((resolve, reject) => {
        const query =
          "SELECT u.id , u.pimage , u.name ,u.phone, u.email ,u.city ,u.state ,u.bio , m.name as membership , r.title FROM user u LEFT JOIN role r ON u.role = r.id LEFT JOIN membership m ON u.membership_id = m.id  WHERE r.id <> " +
          role +
          "";
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

  async findById(id) {
    try {
      console.log(id);
      const response = await new Promise((resolve, reject) => {
        const query =
          "SELECT users.*,roles.role FROM users LEFT JOIN roles ON users.role=roles.id WHERE users.id = ? ";
        mysql.query(query, [id], (err, results) => {
          if (err) reject(new Error(err.message));
          resolve(results[0]);
        });
      });
      return response;
    } catch (error) {
      return error;
    }
  }

  async createUser(user) {
    try {
      const response = await new Promise((resolve, reject) => {
        bcrypt.genSalt(10, (err, salt) => {
          if (err) reject(new Error(err.message));
          bcrypt.hash(user.password, salt, (err, hash) => {
            if (err) reject(new Error(err.message));
            user.password = hash;
            const query = "INSERT INTO users SET ? ";
            mysql.query(query, [user], function (err, results) {
              if (err) reject(new Error(err.message));
              resolve(results.insertId);
            });
          });
        });
      });
      return response;
    } catch (error) {
      return error;
    }
  }

  async loginUser(email, password) {
    try {
      const response = await new Promise((resolve, reject) => {
        const query =
          "SELECT users.* ,roles.role FROM users LEFT JOIN roles ON users.role=roles.id WHERE users.email = ? ";
        mysql.query(query, [email], function (err, results) {
          if (err) return reject(new Error(err.message));
          if (!results[0]) return reject("Auth failed");
          if (results[0]) {
            bcrypt.compare(password, results[0].password).then((isMatch) => {
              if (isMatch) {
                const payload = {
                  id: results[0].id,
                  name: results[0].name,
                  role: results[0].role,
                };
                jwt.sign(
                  payload,
                  "secret",
                  {
                    expiresIn: 31556926, // 1 year in seconds
                  },
                  (err, token) => {
                    if (token) resolve(token);
                    reject(err);
                  }
                );
              } else {
                return reject("Auth failed");
              }
            });
          }
        });
      });
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async getSingleUser(id) {
    try {
      const response = await new Promise((resolve, reject) => {
        const query =
          "SELECT u.id , u.pimage , u.name ,u.phone, u.email ,u.city ,u.state ,u.bio , m.name as membership , r.title FROM user u LEFT JOIN role r ON u.role = r.id LEFT JOIN membership m ON u.membership_id = m.id  WHERE u.id = " +
          id +
          "";

        mysql.query(query, (err, results) => {
          if (err) reject(new Error(err.message));
          resolve(results);
        });
      });
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async fieldExists(field, value, id = "") {
    try {
      const response = await new Promise((resolve, reject) => {
        var query = "SELECT 1 FROM  users WHERE " + field + " = ?";
        if (id) query += " AND id <> ?";
        mysql.query(query, [value, id], (err, results) => {
          if (err) reject(new Error(err.message));
          resolve(results[0]);
        });
      });
      return response;
    } catch (error) {
      return error;
    }
  }

  async passwordExists(value, id) {
    try {
      const response = await new Promise((resolve, reject) => {
        var query = "SELECT * FROM  user WHERE id = ? ";
        mysql.query(query, [id], (err, results) => {
          if (err) reject(new Error(err.message));
          bcrypt.compare(value, results[0].password, function (err, result) {
            resolve(result);
          });
        });
      });
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async insertNewName(name) {
    try {
      const dateAdded = new Date();
      const insertId = await new Promise((resolve, reject) => {
        const query = "INSERT INTO names (name, date_added) VALUES (?,?);";

        conn.query(query, [name, dateAdded], (err, result) => {
          if (err) reject(new Error(err.message));
          resolve(result.insertId);
        });
      });
      return {
        id: insertId,
        name: name,
        dateAdded: dateAdded,
      };
    } catch (error) {
      console.log(error);
    }
  }

  async deleteRowById(id) {
    try {
      id = parseInt(id, 10);
      const response = await new Promise((resolve, reject) => {
        const query = "DELETE FROM user WHERE id = ?";

        mysql.query(query, [id], (err, result) => {
          if (err) reject(new Error(err.message));
          resolve(result.affectedRows);
        });
      });

      return response === 1 ? true : false;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async updateNameById(body, id) {
    try {
      id = parseInt(id, 10);
      const response = await new Promise((resolve, reject) => {
        const query = "UPDATE user SET ? WHERE id = ?";

        mysql.query(query, [body, id], (err, result, fields) => {
          if (err) reject(new Error(err.message));
          resolve(result.affectedRows);
        });
      });

      return response === 1 ? true : false;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async searchByName(name) {
    try {
      const response = await new Promise((resolve, reject) => {
        const query = "SELECT * FROM names WHERE name = ?;";

        mysql.query(query, [name], (err, results) => {
          if (err) reject(new Error(err.message));
          resolve(results);
        });
      });

      return response;
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = User;
