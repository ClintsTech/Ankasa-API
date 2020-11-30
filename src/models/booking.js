const db = require("../config/mysql");

module.exports = {
  getBooking: function () {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM booking`, (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(new Error(err));
        }
      });
    });
  },
  createBooking: function (setData) {
    return new Promise((resolve, reject) => {
      db.query("INSERT INTO booking SET ?", setData, (err, res) => {
        if (!err) {
          resolve(res);
        } else {
          reject(new Error(err));
        }
      });
    });
  },
  updateBooking: function (id, setData) {
    // console.log(setData, id)
    return new Promise((resolve, reject) => {
      db.query(`UPDATE booking SET ? WHERE id=${id}`, setData, (err, res) => {
        if (!err) {
          resolve(res);
        } else {
          reject(new Error(err));
        }
      });
    });
  },
  deleteBooking: function (id) {
    return new Promise((resolve, reject) => {
      db.query(`DELETE FROM booking WHERE id=${id}`, (err, res) => {
        if (!err) {
          resolve(res);
        } else {
          reject(new Error(err));
        }
      });
    });
  },
  userBooking: function (setData) {
    return new Promise((resolve, reject) => {
      db.query(`INSERT INTO booking SET ?`, setData, (err, res) => {
        if (!err) {
          resolve(res);
        } else {
          reject(new Error(err));
        }
      });
    });
  },
  getSeat: function (id) {
    return new Promise((resolve, reject) => {
      db.query(`SELECT seat FROM flights where id=${id}`, (err, res) => {
        if (!err) {
          resolve(res);
        } else {
          reject(new Error(err));
        }
      });
    });
  },
  addSeat: function (id, seat) {
    return new Promise((resolve, reject) => {
      db.query(`UPDATE flights SET ? WHERE id=${id}`, seat, (err, res) => {
        if (!err) {
          resolve(res);
        } else {
          reject(new Error(err));
        }
      });
    });
  },
  getBookingUser: function (id) {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT a.name as plane, a.code,a.terminal, a.class, f.city_departure,f.departure, f.city_arrived,f.gate, b.time, b.ordered_seat, b.isPaid, u.name, u.email 
            FROM airlines a 
            join flights f on a.id=f.plane 
            join booking b on f.id=b.flight_id 
            join users u on b.user_id=u.id 
            where u.id=${id}`,
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
