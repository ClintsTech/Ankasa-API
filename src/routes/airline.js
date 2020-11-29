const router = require('express').Router()
const airlineController = require('../controllers/airline')

router
    .get('/', airlineController.getAirline) //get all airline
    .post('/', airlineController.createAirline) //Create airline
    .patch('/', airlineController.updateAirline) //Edit airline
    .delete('/', airlineController.deleteAirline) //Delete airline
module.exports = router