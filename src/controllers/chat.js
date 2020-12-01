const chatModel = require("../models/chat");
const { response } = require("../helpers");
module.exports = {
  getLastMessage: async function (req, res) {
    try {
      // const { id } = req.params;
      // console.log(id)
      const result = await chatModel.getLastMessage();
      if (result) {
        response(res, 200, result);
      } else {
        response(res, 400, { message: "Chat not found" });
      }
    } catch (error) {
      response(res, 500, { message: error.message });
    }
  },
};
