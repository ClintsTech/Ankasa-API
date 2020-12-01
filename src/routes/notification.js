const router = require("express").Router();
const notificationController = require("../controllers/notification");
const authentication = require("../middlewares/auth");
router
  .get("/", notificationController.getNotification) //get all notification
  .post("/", notificationController.createNotification) //Create notification
  .patch("/", notificationController.updateNotification) //Edit notification
  .delete("/", authentication.authentication, notificationController.deleteNotification) //Delete notification
  .get(
    "/byId",
    authentication.authentication,
    notificationController.getNotificationId
  ) //Get Notification by id
  .patch(
    "/byId/:id",
    notificationController.notificationOpened
  ); // Read is True
module.exports = router;
