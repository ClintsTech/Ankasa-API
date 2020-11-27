const router = require('express').Router()
const flightController = require('../controllers/flight')

router
    .post('/search-flight', flightController.searchFlight)
    .post('/:id', flightController.getFlightbyId)

module.exports = router