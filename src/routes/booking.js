const router = require('express').Router()
const bookingController = require('../controllers/booking')

router
    .get('', bookingController.getBooking) //get all Booking
    .post('', bookingController.createBooking) //Create Booking
    .patch('', bookingController.updateBooking) //Edit Booking
    .delete('', bookingController.deleteBooking) //Delete Booking
module.exports = router