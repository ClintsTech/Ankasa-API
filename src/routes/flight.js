const router = require('express').Router()
const flightController = require('../controllers/flight')

router
    .post('/search-flight', flightController.searchFlight)
    .get('/:id', flightController.getFlightbyId)
    .get('/', flightController.getFlight) //get all flight
    .post('/', flightController.createFlight) //Create flight
    .patch('/', flightController.updateFlight) //Edit flight
    .delete('/', flightController.deleteFlight) //Delete flight
module.exports = router