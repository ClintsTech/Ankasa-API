const userModel = require("../models/user");
const { response } = require("../helpers");
const bcrypt = require("bcrypt");
const { checkUser } = require('../models/auth')

module.exports = {
  getAllUser: async function (req, res) {
    try {
      const { id } = req.token;
      const result = await userModel.getAllUser(id);
      if (result[0]) {
        response(res, 200, result);
      } else {
        response(res, 400, { message: "Data not avaliable" });
      }
    } catch (e) {
      response(res, 500, { message: "Failed Get all user" });
    }
  },
  getUserById: async function (req, res) {
    try {
      const { id } = req.token;
      const result = await userModel.getUserById(id);
      const address = result[0].address.split(",");
      result[0].city = address[0];
      result[0].country = address[1];
      delete result[0].password;
      if (result[0]) {
        response(res, 200, result);
      } else {
        response(res, 400, { message: "User not found" });
      }
    } catch (e) {
      response(res, 500, { message: "Failed get data user" });
    }
  },

  updateUser: async function (req, res) {
    try {
      const { id } = req.token;
      const setData = req.body;

      if(req.file) {
        setData.photo = req.file.filename;
      } else {
        delete setData.photo
      }

      if(setData.email) {
        const check = await checkUser(setData)

        if(check[0]) {
          return response(res, 403, { message: 'Email already exist'})
        }
      }

      if (setData.currPassword && setData.password) {
        const result = await userModel.getUserById(id);
        const check = bcrypt.compareSync(
          setData.currPassword,
          result[0].password
        );
        if (check) {
          const salt = bcrypt.genSaltSync(10);
          const hash = bcrypt.hashSync(setData.password, salt);
          setData.password = hash;
          delete setData.currPassword;
        } else {
          response(res, 400, { message: "Failed update password" });
        }
      }

      const result = await userModel.updateUser(id, setData);
      if (result.affectedRows) {
        response(res, 201, result);
      }
    } catch (e) {
      response(res, 500, { message: "Internal server error" });
    }
  },
};
