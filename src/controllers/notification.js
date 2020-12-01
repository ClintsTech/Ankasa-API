const notificationModels = require("../models/notification");
const { response } = require("../helpers/");

module.exports = {
  getNotification: async function (req, res) {
    try {
      const result = await notificationModels.getNotification();
      response(res, 200, { data: result, message: "Success Get Notification" });
    } catch (error) {
      response(res, 500, { message: "Failed Get Notification" });
    }
  },
  createNotification: async function (req, res) {
    try {
      const setData = req.body;
      const result = await notificationModels.createNotification(setData);
      response(res, 200, {
        result: result,
        message: "1Success Create Notification",
      });
    } catch (error) {
      response(res, 500, { message: "Failed Create Notification" });
    }
  },
  updateNotification: async function (req, res) {
    try {
      const setData = req.body;
      const { id } = req.query;
      const result = await notificationModels.updateNotification(id, setData);
      response(res, 200, {
        result: result,
        message: "Success Update Notification",
      });
    } catch (error) {
      response(res, 500, { message: "Failed Update Notification" });
    }
  },
  deleteNotification: async function (req, res) {
    try {
      const { id } = req.token;
      const result = await notificationModels.deleteNotification(id);
      response(res, 200, {
        result: result,
        message: "Success Delete Destination",
      });
    } catch (error) {
      response(res, 500, { message: "Failed Delete Destination" });
    }
  },
  getNotificationId: async function (req, res) {
    try {
      const { id } = req.token;
      console.log(id)
      const result = await notificationModels.getNotificationId(id);
      response(res, 200, { data: result, message: "Success Get Notification by Id" });
    } catch (error) {
      response(res, 500, { message: "Failed Get Notification by Id" });
    }
  },
  notificationOpened: async function (req, res) {
    try {
        // console.log(req.params)
      const { id } = req.params;
      const result = await notificationModels.notificationOpened(id);
      response(res, 200, { data: result, message: "Success Read" });
    } catch (error) {
      response(res, 500, { message: "Failed Read" });
    }
  },
};
