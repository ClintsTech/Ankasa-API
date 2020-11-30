const db = require("../config/mysql");

module.exports = {
  createReview: (body) => {
    return new Promise((resolve, reject) => {
      db.query(`INSERT INTO review SET ?`, body, (err, data) => {
        if (!err) {
          resolve(body);
        } else {
          reject(err);
        }
      });
    });
  },
  reviewByUser: (body) => {
    return new Promise((resolve, reject) => {
      db.query(`INSERT INTO review SET ?`, body, (err, data) => {
        if (!err) {
          resolve(body);
        } else {
          reject(err);
        }
      });
    });
  },
  getAll: () => {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT a.id, a.airline_id, b.name as airline, b.class, a.user_id, c.name user_name, a.rating 
         FROM review AS a 
          JOIN airlines AS b ON b.id = a.airline_id 
          JOIN users AS c on c.id = a.user_id`,
        (err, data) => {
          if (!err) {
            resolve(data);
          } else {
            reject(err);
          }
        }
      );
    });
  },
  getById: (id) => {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT a.id, a.airline_id, b.name as airline, b.class, a.user_id, c.name user_name, a.rating 
        FROM review AS a 
         JOIN airlines AS b ON b.id = a.airline_id 
         JOIN users AS c on c.id = a.user_id
        WHERE a.id=${id}`,
        (err, data) => {
          if (!err) {
            resolve(data);
          } else {
            reject(err);
          }
        }
      );
    });
  },
  updateReview: function (id, setData) {
    return new Promise((resolve, reject) => {
      db.query(`UPDATE review SET ? WHERE id=${id}`, setData, (err, res) => {
        if (!err) {
          resolve(res);
        } else {
          reject(new Error(err));
        }
      });
    });
  },
  terminateReview: function (id) {
    return new Promise((resolve, reject) => {
      db.query(`DELETE FROM review WHERE id=${id}`, (err, res) => {
        if (!err) {
          resolve(res);
        } else {
          reject(new Error(err));
        }
      });
    });
  },
};
