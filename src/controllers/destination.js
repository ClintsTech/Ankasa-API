const destinationModels = require('../models/destination')
const jwt = require('jsonwebtoken')
const { response } = require('../helpers/')

module.exports={
    getDestination: async function(req, res) {
        try {
            const result = await destinationModels.getDestination()
            response(res, 200, { data: result, message: 'Success Get Destination' })
        } catch (error) {
            response(res, 500, { message: 'Failed Get Destination'})
        }
    },
    createDestination: async function(req,res){
        try{
            const setData = req.body
            const result= await destinationModels.createDestination(setData)
            response(res, 200, {result:result, message: 'Success Create Destination'})
        }catch(error){
            response(res, 500, { message: 'Failed Create Destination'})
        }
    },
    updateDestination: async function(req,res){
        try{
            const setData = req.body
            const {id} =req.query
            const result = await destinationModels.updateDestination(id, setData)
            response(res, 200, {result:result, message: 'Success Update Destination'})
        }catch(error){
            response(res, 500, { message: 'Failed Update Destination'})
        }
    },
    deleteDestination: async function(req,res){
        try{
            const {id} = req.query
            const result= await destinationModels.deleteDestination(id)
            response(res, 200, {result:result, message: 'Success Delete Destination'})
        }catch(error){
            response(res, 500, { message: 'Failed Delete Destination'})
        }
    },
}