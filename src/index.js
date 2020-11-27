const router = require("express").Router();
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const flightRoutes = require("./routes/flight");

router.use("/auth", authRoutes);

router.use("/user", userRoutes);

router.use("/flight", flightRoutes);

module.exports = router;
