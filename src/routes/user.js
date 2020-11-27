const router = require("express").Router();
const userRoutes = require("../controllers/user");
const uploadImg = require("../middlewares/multer");
const authJWT = require("../middlewares/auth");

router
  .get("/", authJWT.authentication, userRoutes.getAll)
  .get("/getUser", authJWT.authentication, userRoutes.getUser)
  .post(
    "/",
    authJWT.authentication,
    uploadImg.singleUpload,
    userRoutes.register
  )
  .patch(
    "/:id",
    authJWT.authentication,
    uploadImg.singleUpload,
    userRoutes.updateUser
  )
  .delete("/:id", authJWT.authentication, userRoutes.terminateUser);

module.exports = router;
