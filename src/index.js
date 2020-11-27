const router = require('express').Router()
const authRoutes = require('./routes/auth')
const destinationRoutes = require('./routes/destination')

router.use('/auth', authRoutes)
router.use('/destination', destinationRoutes)

module.exports = router