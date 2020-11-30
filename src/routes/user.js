const router = require("express").Router();
const userRoutes = require("../controllers/user");
const uploadImg = require("../middlewares/multer");
const authJWT = require("../middlewares/auth");

router
  .get("/", userRoutes.getAll)
  .get("/getUser", authJWT.authentication, userRoutes.getUser)
  .post(
    "/insertUser",
    authJWT.authentication,
    uploadImg.singleUpload,
    userRoutes.setUser
  )
  .patch(
    "/update",
    authJWT.authentication,
    uploadImg.singleUpload,
    userRoutes.updateUser
  )
  .delete("/delete", authJWT.authentication, userRoutes.terminateUser);

module.exports = router;
