const router = require("express").Router();
const reviewConstroller = require("../controllers/review");
const authJWT = require("../middlewares/auth");

router
  .get("/", reviewConstroller.getAll)
  .get("/:id", reviewConstroller.getById)
  .patch("/", reviewConstroller.updateReview)
  .post("/", reviewConstroller.createReview)
  .post("/by-user", authJWT.authentication, reviewConstroller.reviewByUser)
  .delete("/", reviewConstroller.terminateReview);
// .post('/search-flight', flightController.searchFlight)
// .get('/', flightController.getFlight) //get all flight
module.exports = router;
