const db = require("../config/mysql");

module.exports = {
  getNotification: function () {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM notification`, (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(new Error(err));
        }
      });
    });
  },
  createNotification: function (setData) {
    return new Promise((resolve, reject) => {
      db.query("INSERT INTO notification SET ?", setData, (err, res) => {
        if (!err) {
          resolve(res);
        } else {
          reject(new Error(err));
        }
      });
    });
  },
  updateNotification: function (id, setData) {
    console.log(setData, id);
    return new Promise((resolve, reject) => {
      db.query(
        `UPDATE notification SET ? WHERE id=${id}`,
        setData,
        (err, res) => {
          if (!err) {
            resolve(res);
          } else {
            reject(new Error(err));
          }
        }
      );
    });
  },
  deleteNotification: function (id) {
    return new Promise((resolve, reject) => {
      db.query(`DELETE FROM notification WHERE user_id=${id}`, (err, res) => {
        if (!err) {
          resolve(res);
        } else {
          reject(new Error(err));
        }
      });
    });
  },
  getNotificationId: function (id) {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT id, tittle,description, isRead from notification WHERE id=${id}`,
        (err, res) => {
          if (!err) {
            resolve(res);
          } else {
            reject(new Error(err));
          }
        }
      );
    });
  },
  notificationOpened: function (id) {
    return new Promise((resolve, reject) => {
      db.query(
        `Update notification SET isRead= true WHERE id=${id}`,
        (err, res) => {
          if (!err) {
            resolve(res);
          } else {
            reject(new Error(err));
          }
        }
      );
    });
  },
};
