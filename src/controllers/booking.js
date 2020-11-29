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
    userBooking: async function(req,res){
        try{
            const {id} = req.token
            const {seat} =req.body
            const {flight_id}= req.body
            const flightSeat= await bookingModels.getSeat(flight_id) //get seat value from flights
            // console.log(flightSeat[0].seat)
            if(flightSeat[0]){
                const availableSeat = flightSeat[0].seat
                console.log(availableSeat - parseInt(seat))
                const setData = {user_id: id, ...req.body}
                console.log(setData)
                delete setData.seat
                const reducingSeat=await bookingModels.reduceSeat(flight_id,{seat: availableSeat - parseInt(seat)})
                console.log(reducingSeat)
                if(reducingSeat.affectedRows>0){
                    const result= await bookingModels.userBooking(setData)
                    response(res, 200, {result:result, message: 'Success Add booking'})
                }else{
                    response(res, 400, {message: 'Can not reduce seat value'})
                }
            }else{
                response(res, 404, {message: 'Can not get seat data'})
            }
        }catch(error){
            response(res, 500, { message: 'Failed Add booking'})
        }
    },
}