const router = require('express').Router()
const bookingController = require('../controllers/booking')
const { authorization } = require('../middlewares/auth')
const authentication = require('../middlewares/auth')
router
    .get('/', bookingController.getBooking) //get all Booking
    .post('/', bookingController.createBooking) //Create Booking
    .patch('/', bookingController.updateBooking) //Edit Booking
    .delete('/', bookingController.deleteBooking) //Delete Booking

    .post('/add', authentication.authentication ,authentication.authorization, bookingController.userBooking) //Create Booking By User
module.exports = router