const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

require('dotenv').config()

const app = express();

const routeNavigator = require("./src");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Test");
});

app.use("/api/v1", routeNavigator);

app.listen(8000 || process.env.PORT, () => {
  console.log(`Server running on PORT ${8000 || process.env.PORT}`);
});
