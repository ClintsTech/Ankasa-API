const router = require("express").Router();
const authRoutes = require("./routes/auth");
const destinationRoutes = require("./routes/destination");
const userRoutes = require("./routes/user");
const flightRoutes = require("./routes/flight");
const airlineRoutes = require("./routes/airline");
const bookingRoutes = require("./routes/booking");
const reviewRoutes = require("./routes/review");
<<<<<<< HEAD
const chatRoutes = require("./routes/chat");
=======
const paymentRoutes = require("./routes/payment");
>>>>>>> bb2cac507a9973252576623ac67af531b4d42fe6

router.use("/auth", authRoutes);
router.use("/destination", destinationRoutes);
router.use("/user", userRoutes);
router.use("/flight", flightRoutes);
router.use("/airline", airlineRoutes);
router.use("/booking", bookingRoutes);
router.use("/review", reviewRoutes);
<<<<<<< HEAD
router.use("/chat", chatRoutes);
=======
router.use("/payment", paymentRoutes);
>>>>>>> bb2cac507a9973252576623ac67af531b4d42fe6

module.exports = router;
