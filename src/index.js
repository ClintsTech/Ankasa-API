const router = require("express").Router();
const authRoutes = require("./routes/auth");
const destinationRoutes = require("./routes/destination");
const userRoutes = require("./routes/user");
const flightRoutes = require("./routes/flight");
const airlineRoutes = require("./routes/airline");
const bookingRoutes = require("./routes/booking");

router.use("/auth", authRoutes);
router.use("/destination", destinationRoutes);
router.use("/user", userRoutes);
router.use("/flight", flightRoutes);
router.use("/airline", airlineRoutes);
router.use("/booking", bookingRoutes);

module.exports = router;
