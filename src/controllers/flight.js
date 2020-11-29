const flightModel = require("../models/flight");
const { response } = require("../helpers");
module.exports = {
  searchFlight: async function (req, res) {
    try {
      const setData = req.body;
      const { limit, offset } = req.query;
      const limitNew = !isNaN(parseInt(limit)) ? parseInt(limit) : 5;
      const offsetNew = !isNaN(parseInt(offset)) ? parseInt(offset) : 1;

      const result = await flightModel.searchFlight(
        setData,
        limitNew,
        offsetNew
      );
      // console.log(result[0])
      if (result[0]) {
        response(res, 200, result);
      } else {
        response(res, 400, { message: "Flight not found" });
      }
    } catch (error) {
      response(res, 500, { message: error.message });
    }
  },
  getFlightbyId: async function (req, res) {
    try {
      const setData = req.body;
      const { id } = req.params;
      // console.log(id)
      const result = await flightModel.getFlightbyId(setData, id);
      if (result[0]) {
        response(res, 200, result);
      } else {
        response(res, 400, { message: "Flight not found" });
      }
    } catch (error) {
      response(res, 500, { message: error.message });
    }
  },
  getFlight: async function (req, res) {
    try {
      const result = await flightModel.getFlight();
      response(res, 200, { data: result, message: "Success Get Flight" });
    } catch (error) {
      response(res, 500, { message: "Failed Get Flight" });
    }
  },
  createFlight: async function (req, res) {
    try {
      const setData = req.body;
      const result = await flightModel.createFlight(setData);
      response(res, 200, { result: result, message: "Success Create Flight" });
    } catch (error) {
      response(res, 500, { message: "Failed Create Flight" });
    }
  },
  updateFlight: async function (req, res) {
    try {
      const setData = req.body;
      const { id } = req.query;
      const result = await flightModel.updateFlight(id, setData);
      response(res, 200, { result: result, message: "Success Update Flight" });
    } catch (error) {
      response(res, 500, { message: "Failed Update Flight" });
    }
  },
  deleteFlight: async function (req, res) {
    try {
      const { id } = req.query;
      const result = await flightModel.deleteFlight(id);
      response(res, 200, { result: result, message: "Success Delete Flight" });
    } catch (error) {
      response(res, 500, { message: "Failed Delete Flight" });
    }
  },
};
