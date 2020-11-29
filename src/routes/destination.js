const router = require('express').Router()
const destinationController = require('../controllers/destination')

router
    .get('/', destinationController.getDestination) //get all destination
    .post('/', destinationController.createDestination) //Create destination
    .patch('/', destinationController.updateDestination) //Edit destination
    .delete('/', destinationController.deleteDestination) //Delete destination
module.exports = router