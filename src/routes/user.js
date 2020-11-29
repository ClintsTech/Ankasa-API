const router = require("express").Router();
const userRoutes = require("../controllers/user");
const uploadImg = require("../middlewares/multer");
const authJWT = require("../middlewares/auth");

router
  .get("/all", authJWT.authentication, userRoutes.getAllUser)
  .get("/", authJWT.authentication, userRoutes.getUserById)
  .patch(
    "/update",
    authJWT.authentication,
    uploadImg.singleUpload,
    userRoutes.updateUser
  )
module.exports = router;
