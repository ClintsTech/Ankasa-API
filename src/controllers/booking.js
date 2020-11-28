const bookingModels = require('../models/booking')
const { response } = require('../helpers/')

module.exports={
    getBooking: async function(req, res) {
        try {
            const result = await bookingModels.getBooking()
            response(res, 200, { data: result, message: 'Success Get booking' })
        } catch (error) {
            response(res, 500, { message: 'Failed Get booking'})
        }
    },
    createBooking: async function(req,res){
        try{
            const setData = req.body
            const result= await bookingModels.createBooking(setData)
            response(res, 200, {result:result, message: 'Success Create booking'})
        }catch(error){
            response(res, 500, { message: 'Failed Create booking'})
        }
    },
    updateBooking: async function(req,res){
        try{
            const setData = req.body
            const {id} =req.query
            const result = await bookingModels.updateBooking(id, setData)
            response(res, 200, {result:result, message: 'Success Update booking'})
        }catch(error){
            response(res, 500, { message: 'Failed Update booking'})
        }
    },
    deleteBooking: async function(req,res){
        try{
            const {id} = req.query
            const result= await bookingModels.deleteBooking(id)
            response(res, 200, {result:result, message: 'Success Delete booking'})
        }catch(error){
            response(res, 500, { message: 'Failed Delete booking'})
        }
    },
}