const authModels = require("../models/auth");
const jwt = require("jsonwebtoken");
const { response } = require("../helpers");
module.exports = {
  Login: async function (req, res) {
    try {
      let id = "";
      let setID = "";
      const mail = req.user.emails[0].value;
      const setData = { email: mail, device_token: "" };
      if (req.user.provider == "google") {
        id = req.user.id;
        setID = { google_id: id };
      } else if (req.user.provider == "facebook") {
        id = req.user.id;
        setID = { facebook_id: id };
      }
      let result = await authModels.checkUser(setData);
      if (!result[0]) {
        res.status(401).send({
          message: "Email Not Found",
        });
      }
      const isLogin = await authModels.isLogin(setData.email);
      console.log(isLogin);
      if (isLogin[0].device_token !== "") {
        res.status(403).send({
          message:
            "Your account already login. Please logout from your old device if you want login here",
        });
      } else if (isLogin[0].google_id !== null) {
        res.status(403).send({
          message:
            "Your account google login. Please logout from your old device if you want login here",
        });
      } else if (isLogin[0].facebook_id !== null) {
        res.status(403).send({
          message:
            "Your account facebook login. Please logout from your old device if you want login here",
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
        await authModels.postId(setID, setData.email);
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
