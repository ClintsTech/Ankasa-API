const router = require("express").Router();
const authRoutes = require("./routes/auth");
const destinationRoutes = require("./routes/destination");
const userRoutes = require("./routes/user");
const flightRoutes = require("./routes/flight");
const airlineRoutes = require("./routes/airline");
const bookingRoutes = require("./routes/booking");
const reviewRoutes = require("./routes/review");
const chatRoutes = require("./routes/chat");
const paymentRoutes = require("./routes/payment");
const notificationRoutes = require("./routes/notification");

router.use("/auth", authRoutes);
router.use("/destination", destinationRoutes);
router.use("/user", userRoutes);
router.use("/flight", flightRoutes);
router.use("/airline", airlineRoutes);
router.use("/booking", bookingRoutes);
router.use("/review", reviewRoutes);
router.use("/chat", chatRoutes);
router.use("/payment", paymentRoutes);
router.use("/notification", notificationRoutes);

module.exports = router;
