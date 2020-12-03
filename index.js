const express = require("express");
const bodyParser = require("body-parser");
const passport = require("passport");
const cookieSession = require("cookie-session");
const cors = require("cors");
const chatModel = require("./src/models/chat");
const { response } = require("./src/helpers");
const auth2 = require("./src/controllers/auth2");

require("./src/middlewares/passport");
// require("dotenv").config();

const app = express();
require("dotenv").config();

const routeNavigator = require("./src");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());
app.use(cors());

// var http = require('http').createServer(app);
// var io = require('socket.io')(http);
// io.on('connection', (socket) => {
//   console.log('a user connected');
//   socket.on('disconnect', () => {
//     console.log('user disconnected');
//   });
// });

// notification
var admin = require("firebase-admin");

var serviceAccount = require("./src/services/ankasa-8dc57-firebase-adminsdk-4in6l-48a27bdb6f.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://ankasa-8dc57.firebaseio.com"
});


//socket
const server = require("http").createServer(app);
const io = require("socket.io")(server);
io.on('connection', async (socket)=> {
  const id = socket.handshake.query.id
  console.log('user connect - ', id)
  socket.join(id)
    try{
      const result = await chatModel.getAllMessage(id);
      io.emit("refresh-chat", result);
      // console.log(result);
    }catch(e){
      console.log(e);
    }

  socket.on("postMessage", async (data) =>{
    try{
      const result = await chatModel.postMessage(data)
      console.log(result)
    }catch(e){
      console.log(e)
    }
  })

 
});

// server.listen(4444);

app.get("/", (req, res) => {
  res.send("server online");
});

app.use(
  cookieSession({
    name: "ankasa",
    keys: ["key1", "key2"],
  })
);

app.use("/api/v1", routeNavigator);

// server.listen(8000 || process.env.PORT, () => {
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
app.use(express.static("public"));

server.listen(8000 || process.env.PORT, () => {
  console.log(`Server running on PORT ${8000 || process.env.PORT}`);
});
