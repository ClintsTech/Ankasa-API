const db = require("../config/mysql");

module.exports = {
  getAllMessage: function (id) {
    // console.log(id)
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT id, id_from, id_to, message, DATE_FORMAT(sending_time, '%H:%i') time FROM chat WHERE id_from=${id} OR id_to=${id}`,
        (err, result) => {
          if (!err) {
            resolve(result);
          } else {
            reject(new Error(err));
          }
        }
      );
    });
  },
  getLastMessage: function () {
    return new Promise((resolve, reject) => {
      // SELECT u.id, u.photo, u.name, c.message, DATE_FORMAT(c.sending_time, '%H:%i') time FROM users u LEFT JOIN ( SELECT * FROM chat ORDER BY id ASC) c ON u.id = c.id_from OR u.id =c.id_to WHERE u.id != 1 AND c.message GROUP BY name

      db.query(
        ` SELECT u.id, u.photo, u.name,t1.message, DATE_FORMAT(t1.sending_time, '%H:%i') time FROM users u JOIN chat t1 ON u.id = t1.id_from OR u.id =t1.id_to INNER JOIN (SELECT id_from, MAX(sending_time) time FROM chat GROUP BY id_from) t2 ON t1.id_from = t2.id_from AND t1.sending_time = t2.time WHERE t1.id_from != 1 AND u.id != 1`,
        (err, result) => {
          if (!err) {
            resolve(result);
          } else {
            reject(new Error(err));
          }
        }
      );
    });
  },
  postMessage: function (setData) {
    console.log(setData);
    return new Promise((resolve, reject) => {
      db.query(`INSERT INTO chat SET ?`, setData, (err, res) => {
        if (!err) {
          resolve(res);
        } else {
          reject(new Error(err));
        }
      });
    });
  },
};
