const router = require("express").Router();
const paymentRoute = require("../controllers/payment");
const authJWT = require("../middlewares/auth");

router.post("/", authJWT.authentication, paymentRoute.pay);
// router.post("/", paymentRoute.pay);
module.exports = router;
