const router = require("express").Router();
const authRoutes = require("./routes/auth");
const destinationRoutes = require("./routes/destination");
const flightRoutes = require("./routes/flight");

router.use("/auth", authRoutes);
router.use("/destination", destinationRoutes);

router.use("/user", userRoutes);

router.use("/flight", flightRoutes);

module.exports = router;
