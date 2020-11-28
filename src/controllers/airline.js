const airlineModels = require('../models/airline')
const { response } = require('../helpers/')

module.exports={
    getAirline: async function(req, res) {
        try {
            const result = await airlineModels.getAirlines()
            response(res, 200, { data: result, message: 'Success Get Airline' })
        } catch (error) {
            response(res, 500, { message: 'Failed Get Airline'})
        }
    },
    createAirline: async function(req,res){
        try{
            const setData = req.body
            const result= await airlineModels.createAirlines(setData)
            response(res, 200, {result:result, message: 'Success Create Airline'})
        }catch(error){
            response(res, 500, { message: 'Failed Create Airline'})
        }
    },
    updateAirline: async function(req,res){
        try{
            const setData = req.body
            const {id} =req.query
            const result = await airlineModels.updateAirlines(id, setData)
            response(res, 200, {result:result, message: 'Success Update Airline'})
        }catch(error){
            response(res, 500, { message: 'Failed Update Airline'})
        }
    },
    deleteAirline: async function(req,res){
        try{
            const {id} = req.query
            const result= await airlineModels.deleteAirlines(id)
            response(res, 200, {result:result, message: 'Success Delete airline'})
        }catch(error){
            response(res, 500, { message: 'Failed Delete Airline'})
        }
    },
}