const router = require("express").Router();
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");

router.use("/auth", authRoutes);

router.use("/user", userRoutes);

module.exports = router;
