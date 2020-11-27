
const router = require('express').Router()
const authRoutes = require('./routes/auth')
const destinationRoutes = require('./routes/destination')

router.use('/destination', destinationRoutes)

router.use("/user", userRoutes);

router.use("/flight", flightRoutes);

module.exports = router;
