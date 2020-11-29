const authModels = require("../models/auth");
const jwt = require("jsonwebtoken");
const { response } = require("../helpers");
module.exports = {
  Login: async function (req, res) {
    try {
      res.send(req.user.emails[0].value);
      const mail = req.user.emails[0].value;
      const setData = { email: mail, device_token: "" };
      let result = await authModels.checkUser(setData);
      if (!result[0]) {
        res.status(401).send({
          message: "Email Not Found",
        });
      }
      const check_device = await authModels.checkDevice(setData.email);
      if (check_device[0].device_token !== "") {
        res.status(403).send({
          message:
            "Your account already login. Please logout from your old device if you want login here",
        });
      } else {
        const { id, email, name, photo, phone, role, device_token } = result[0];
        const token = jwt.sign(
          {
            id,
            name,
            email,
            photo,
            phone,
            role,
            device_token,
          },
          process.env.SECRET_KEY
        );
        await authModels.postDevice(token, setData.email);
        let roles = "user";
        if (role == 6) {
          roles = "admin";
        }
        response(res, 200, {
          message: "Auth Success",
          token,
          roles,
        });
      }
    } catch (error) {
      response(res, 500, { message: error.message });
    }
  },
};
