const bookingModels = require("../models/booking");
const { response } = require("../helpers/");

module.exports = {
  getBooking: async function (req, res) {
    try {
      const result = await bookingModels.getBooking();
      response(res, 200, { data: result, message: "Success Get booking" });
    } catch (error) {
      response(res, 500, { message: "Failed Get booking" });
    }
  },
  createBooking: async function (req, res) {
    try {
      const setData = req.body;
      const result = await bookingModels.createBooking(setData);
      response(res, 200, { result: result, message: "Success Create booking" });
    } catch (error) {
      response(res, 500, { message: "Failed Create booking" });
    }
  },
  updateBooking: async function (req, res) {
    try {
      const setData = req.body;
      const { id } = req.query;
      const result = await bookingModels.updateBooking(id, setData);
      response(res, 200, { result: result, message: "Success Update booking" });
    } catch (error) {
      response(res, 500, { message: "Failed Update booking" });
    }
  },
  deleteBooking: async function (req, res) {
    try {
      const { id } = req.query;
      const result = await bookingModels.deleteBooking(id);
      response(res, 200, { result: result, message: "Success Delete booking" });
    } catch (error) {
      response(res, 500, { message: "Failed Delete booking" });
    }
  },
  userBooking: async function (req, res) {
    try {
      const { id } = req.token;
      const { seat } = req.body;
      const { flight_id } = req.body;
      const flightSeat = await bookingModels.getSeat(flight_id); //get seat value from flights
      // console.log(flightSeat[0].seat)
      if (flightSeat[0]) {
        const reservedSeat = flightSeat[0].seat;
        const orderedSeat = generateSeat(reservedSeat, parseInt(seat));

        // console.log(reservedSeat,seat,orderedSeat)

        const setData = { user_id: id, ordered_seat: orderedSeat, ...req.body };
        delete setData.seat;

        // console.log(setData);

        const addSeat = await bookingModels.addSeat(flight_id, {
          seat: reservedSeat + parseInt(seat),
        });
        // console.log(addSeat);

        if (addSeat.affectedRows > 0) {
          const result = await bookingModels.userBooking(setData);
          response(res, 200, {
            result: result,
            message: "Success Add booking",
          });
        } else {
          response(res, 400, { message: "Cannot add seat value" });
        }
      } else {
        response(res, 404, { message: "Cannot get seat data" });
      }
    } catch (error) {
      response(res, 500, { message: "Failed Add booking" });
    }
  },
  getBookingUser: async function (req, res) {
    try {
      const { id } = req.token;
      const result = await bookingModels.getBookingUser(id);
      response(res, 200, { data: result, message: "Success Get user booking" });
    } catch (error) {
      response(res, 500, { message: "Failed Get user booking" });
    }
  },
  getBookingId: async function (req, res) {
    try {
      const { id } = req.token;
      // console.log(req.params.id)
      const bookId = req.params.id;
      const result = await bookingModels.getBookingId(id,bookId);
      response(res, 200, { data: result, message: "Success Get booking by id" });
    } catch (error) {
      response(res, 500, { message: "Failed Get booking by id" });
    }
  },
};

generateSeat = (reservedSeat, seat) => {
  let orderedSeat = "";
  for (i = reservedSeat + 1; i <= reservedSeat + seat; i++) {
    if (i != reservedSeat + seat) {
      orderedSeat += i + ",";
    } else {
      orderedSeat += i;
    }
  }
  return orderedSeat.trim();
};
