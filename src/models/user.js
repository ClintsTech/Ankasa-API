const db = require("../config/mysql");
const bcrypt = require("bcrypt");

module.exports = {
  getAll: () => {
    return new Promise((resolve, reject) => {
      db.query("SELECT * FROM users ORDER BY id DESC", (err, res) => {
        if (!err) {
          resolve(res);
        }
        reject(err);
      });
    });
  },
  getUser: (token) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM users WHERE ?`, token.id, (err, res) => {
        if (!err) {
          resolve(res);
        }
        reject(err);
      });
    });
  },
  setUser: (body) => {
    return new Promise((resolve, reject) => {
      const { password } = body;
      bcrypt.hash(password, 10, function (err, hashPass) {
        const newBody = { ...body, password: hashPass };
        if (err) {
          reject(err);
        }
        db.query(`INSERT INTO users SET ?`, newBody, (err, data) => {
          if (!err) {
            resolve(newBody);
          } else {
            reject(err);
          }
        });
      });
    });
  },
  updateUser: (id, body) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM users WHERE ?`, id, (err, result) => {
        if (err) {
          reject(err);
        } else {
          body.photo = !body.photo ? result[0].photo : body.photo;
          let password = undefined;
          if (!body.password) {
            password = result[0].password;
          } else {
            password = bcrypt.hashSync(body.password, bcrypt.genSaltSync(10));
          }
          const newBody = { ...body, password: password };
          db.query(
            `UPDATE users SET ? WHERE id=${id}`,
            newBody,
            (err, data) => {
              if (!err) {
                resolve(newBody);
              } else {
                reject(err);
              }
            }
          );
        }
      });
    });
  },
  terminateUser: (id) => {
    return new Promise((resolve, reject) => {
      db.query(`DELETE FROM users WHERE id=${id}`, (err, res) => {
        if (!err) {
          resolve(res);
        }
        reject(err);
      });
    });
  },
};
