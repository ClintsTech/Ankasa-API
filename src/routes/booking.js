const router = require("express").Router();
const bookingController = require("../controllers/booking");
const { authorization } = require("../middlewares/auth");
const authentication = require("../middlewares/auth");
router
  .get("/", bookingController.getBooking) //get all Booking
  .post("/", bookingController.createBooking) //Create Booking
  .patch("/", bookingController.updateBooking) //Edit Booking
  .delete("/", bookingController.deleteBooking) //Delete Booking

  //Create Booking By User
  .post(
    "/add",
    authentication.authentication,
    bookingController.userBooking
  )

  //get Booking By Specific User
  .get(
    "/user",
    authentication.authentication,
    bookingController.getBookingUser
  )

  .get(
    "/specific/:id",
    authentication.authentication,
    bookingController.getBookingId
  ); //get Booking by Id
module.exports = router;
