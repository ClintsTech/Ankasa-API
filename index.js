const express = require("express");
const bodyParser = require("body-parser");
const passport = require("passport");
const cookieSession = require("cookie-session");
const cors = require("cors");
const auth2 = require("./src/controllers/auth2");

// const passportController = require("./src/controllers/passport");
require("./src/middlewares/passport");

const app = express();

const routeNavigator = require("./src");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Test");
});

app.use(
  cookieSession({
    name: "ankasa",
    keys: ["key1", "key2"],
  })
);

app.use("/api/v1", routeNavigator);

app.get(
  "/facebook/callback",
  passport.authenticate("facebook", { failureRedirect: "/google" }),
  auth2.Login
);

app.get(
  "/facebook",
  passport.authenticate("facebook", { scope: ["profile", "email"] })
);

app.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/google" }),
  auth2.Login
);

app.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.listen(8000 || process.env.PORT, () => {
  console.log(`Server running on PORT ${8000 || process.env.PORT}`);
});
