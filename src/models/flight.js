const db = require("../config/mysql");

module.exports = {
  searchFlight: function (setData, limit, offset) {
    const { city_departure, city_arrived, departure, classs } = setData;
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT f.id flight_id, f.city_departure, f.city_arrived, a.name plane, a.seat, a.image logo, a.facilities, a.class, a.code, a.terminal, f.seat reserved_seats, f.departure, f.status, f.time_estimate, f.gate FROM flights f LEFT JOIN airlines a ON (f.plane = a.id) WHERE (f.city_departure = '${city_departure}' AND f.city_arrived = '${city_arrived}' AND DATE(f.departure) = '${departure}' AND a.class='${classs}') LIMIT ${limit} OFFSET ${offset}`,
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
  getFlightbyId: function (setData, id) {
    const { city_departure, city_arrived, departure, classs } = setData;
    console.log(setData);
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT f.id flight_id, f.city_departure, f.city_arrived, a.name plane, a.seat, a.image logo, a.facilities, a.class, a.code, a.terminal, f.seat reserved_seats, f.departure, f.status, f.time_estimate, f.gate FROM flights f LEFT JOIN airlines a ON (f.plane = a.id) WHERE (f.city_departure = '${city_departure}' AND f.city_arrived = '${city_arrived}' AND DATE(f.departure) = '${departure}' AND a.class='${classs}' AND f.id=${id})`,
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
  getFlight: function () {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM flights`, (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(new Error(err));
        }
      });
    });
  },
  createFlight: function (setData) {
    return new Promise((resolve, reject) => {
      db.query("INSERT INTO flights SET ?", setData, (err, res) => {
        if (!err) {
          resolve(res);
        } else {
          reject(new Error(err));
        }
      });
    });
  },
  updateFlight: function (id, setData) {
    console.log(setData, id);
    return new Promise((resolve, reject) => {
      db.query(
        `UPDATE flights SET ? WHERE id=${id}`,
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
  deleteFlight: function (id) {
    return new Promise((resolve, reject) => {
      db.query(`DELETE FROM flights WHERE id=${id}`, (err, res) => {
        if (!err) {
          resolve(res);
        } else {
          reject(new Error(err));
        }
      });
    });
  },
};
