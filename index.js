const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const chatModel = require("./src/models/chat");
const { response } = require("./src/helpers");
const app = express();
require('dotenv').config()

const routeNavigator = require("./src");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// var http = require('http').createServer(app);
// var io = require('socket.io')(http);
// io.on('connection', (socket) => {
//   console.log('a user connected');
//   socket.on('disconnect', () => {
//     console.log('user disconnected');
//   });
// });


//socket
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const connections = [];
io.on('connection', async (socket)=> {
  // const id = socket.handshake.query.id
  const id = 1
  console.log('user connect - ', socket.id)
  connections.push(socket)
  socket.on('disconnect', function(){
		console.log('disconnected - '+ socket.id);
	});
  // socket.join(itemId)

  try{
    const result = await chatModel.getAllMessage(id);
    if (result != 0){
      // console.log(result)
      io.emit('refresh-chat',result)
    }else{
      console.log('Message not found')
    }
    
    // response(res, 200, { result: result, message: "Success get all message" });
  }catch(e){
    console.log(e)
    // response(res, 500, { message: "Post message failed" });
  }

  socket.on('postMessage', async (addData) => {
      // console.log(message)
      // socket.broadcast.to(itemId).emit('refresh-chat', chat)
        try{
          // console.log(addData)
          const result = await chatModel.postMessage(addData);
          io.emit('successPost',addData)
          // response(res, 200, { result: result, message: "Success post message" });
        }catch(e){
          // response(res, 500, { message: "Post message failed" });
          console.log(e)
        }
  })
  // socket.on('getAllMessage', async (id) => {
  //     // console.log(message)
  //     // socket.broadcast.to(itemId).emit('refresh-chat', chat)
  //       try{
  //         const result = await chatModel.getAllMessage(id);
  //         io.emit('refresh-chat',result)
  //         response(res, 200, { result: result, message: "Success get all message" });
  //       }catch(e){
  //         response(res, 500, { message: "Post message failed" });
  //       }
  // })
})

// server.listen(4444);

app.get("/", (req, res) => {
  res.send("server online");
});

app.use("/api/v1", routeNavigator);

server.listen(8000 || process.env.PORT, () => {
  console.log(`Server running on PORT ${8000 || process.env.PORT}`);
});
