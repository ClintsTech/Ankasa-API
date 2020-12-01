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
      db.query(
        `SELECT m.id_from, s.photoSender ,s.sender, m.id_to, s.photoReceiver, s.receiver, DATE_FORMAT(m.sending_time, '%H:%i') time, m.message FROM 
            (SELECT c.id_from, c.message, u1.name as sender,u1.photo AS photoSender, u2.name as receiver,u2.photo AS photoReceiver, c.id_to, MAX(c.sending_time) AS time
                        FROM chat c
                        JOIN users u1
                        ON c.id_from = u1.id
                        JOIN users u2
                        ON c.id_to = u2.id
                        GROUP BY c.id_from, c.id_to) s
            JOIN chat m
            ON m.id_from = s.id_from
            AND m.id_to = s.id_to
            AND m.sending_time = s.time;`,
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
