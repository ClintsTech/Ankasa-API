const response = require("../helpers/response");
const userModel = require("../models/user");

module.exports = {
  getAll: (req, res) => {
    userModel
      .getAll()
      .then((data) => response.success(data, res))
      .catch((err) => response.failed(err, res));
  },
  getUser: (req, res) => {
    userModel
      .getUser(req.token.id)
      .then((data) => response.success(data, res))
      .catch((err) => response.failed(err, res));
  },
  setUser: (req, res) => {
    userModel
      .setUser(req.body)
      .then((data) => response.success(data, res, "insert data success"))
      .catch((err) => response.failed(err, res));
  },
  updateUser: (req, res) => {
    userModel
      .updateUser(req.token.id, req.body)
      .then((data) => response.success(data, res, "Update data success"))
      .catch((err) => response.failed(err, res));
  },
  terminateUser: (req, res) => {
    userModel
      .terminateUser(req.params.id)
      .then((data) => response.success(data, res))
      .catch((err) => response.failed(err, res));
  },
};
