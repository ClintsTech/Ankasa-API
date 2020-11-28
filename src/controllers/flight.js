const flightModel = require('../models/flight')
const { response } = require('../helpers')
module.exports = {
    searchFlight : async function ( req, res ) {
        try{
            const setData = req.body;
            const { limit, offset } = req.query
            const limitNew = !isNaN(parseInt(limit)) ? parseInt(limit) : 5
            const offsetNew = !isNaN(parseInt(offset)) ? parseInt(offset) : 1

            const result = await flightModel.searchFlight(setData, limitNew, offsetNew)
            // console.log(result[0])
            if ( result[0] ){
                response(res, 200, result);
            } else {
                response(res, 400, { message : "Flight not found" });
            }
        }catch(error) {
            response(res, 500, { message: error.message });
        }
    },
    getFlightbyId : async function ( req, res ) {
        try{
            const setData = req.body;
            const { id } = req.params
            // console.log(id)
            const result = await flightModel.getFlightbyId(setData, id)
            if ( result[0] ){
                response(res, 200, result);
            } else {
                response(res, 400, { message : "Flight not found" });
            }
        }catch(error) {
            response(res, 500, { message: error.message });
        }
    },
}