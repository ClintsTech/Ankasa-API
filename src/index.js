const router = require("express").Router();
const authRoutes = require("./routes/auth");
const destinationRoutes = require("./routes/destination");
const userRoutes = require("./routes/user");
const flightRoutes = require("./routes/flight");
const airlineRoutes = require("./routes/airline");

router.use("/auth", authRoutes);
router.use("/destination", destinationRoutes);
router.use("/user", userRoutes);
router.use("/flight", flightRoutes);
router.use("/airline", airlineRoutes);

module.exports = router;
