const router = require('express').Router()
const authRoutes = require('./routes/auth')

router.use('/auth', authRoutes)

module.exports = router