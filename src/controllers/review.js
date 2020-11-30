const reviewModel = require("../models/review");
const { response } = require("../helpers");
module.exports = {
  getAll: async function (req, res) {
    try {
      const result = await reviewModel.getAll();
      if (result[0]) {
        response(res, 200, result);
      } else {
        response(res, 400, { message: "data not found" });
      }
    } catch (error) {
      response(res, 500, { message: error.message });
    }
  },
  getById: async function (req, res) {
    try {
      const { id } = req.params;
      const result = await reviewModel.getById(id);
      if (result[0]) {
        response(res, 200, result);
      } else {
        response(res, 400, { message: "data not found" });
      }
    } catch (error) {
      response(res, 500, { message: error.message });
    }
  },
  updateReview: async function (req, res) {
    try {
      const setData = req.body;
      const { id } = req.query;
      const result = await reviewModel.updateReview(id, setData);
      console.log(result);
      response(res, 200, { data: result, message: "success update review" });
    } catch (error) {
      response(res, 500, { message: "failed update review" });
    }
  },
  createReview: async function (req, res) {
    try {
      const setData = req.body;
      const result = await reviewModel.createReview(setData);
      response(res, 200, { result: result, message: "success create review" });
    } catch (error) {
      response(res, 500, { message: "failed create review" });
    }
  },
  reviewByUser: async function (req, res) {
    try {
      const { rating } = req.body;
      const { airline_id } = req.query;
      const setData = {
        airline_id: airline_id,
        rating: rating,
        user_id: req.token.id,
      };
      console.log(setData);
      const result = await reviewModel.reviewByUser(setData);
      response(res, 200, { result: result, message: "success create review" });
    } catch (error) {
      response(res, 500, { message: "failed create review" });
    }
  },
  terminateReview: async function (req, res) {
    try {
      const { id } = req.query;
      const result = await reviewModel.terminateReview(id);
      response(res, 200, { result: result, message: "Success Delete Flight" });
    } catch (error) {
      response(res, 500, { message: "Failed Delete Flight" });
    }
  },
};
