const db = require("../config/mysql");
const bcrypt = require("bcrypt");

module.exports = {
  getAllUser: function (id) {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM users WHERE id !=${id}`, (err, result) => {
        if (!err) {
          resolve(result);
        }
        reject(new Error(err));
      });
    });
  },
  getUserById: function (id) {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM users WHERE id=${id}`, (err, result) => {
        if (!err) {
          resolve(result);
        }
        reject(new Error(err));
      });
    });
  },

  updateUser: function (id, setData) {
    return new Promise((resolve, reject) => {
      db.query(`UPDATE users SET ? WHERE id=${id}`, setData, (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(new Error(err));
        }
      });
    });
  },
};
