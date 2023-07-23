var express = require("express");
var socket = require("socket.io");
// App setup
var app = express();
var server = app.listen(4000, function () {
  console.log("listening for requests on port 4000,");
});

// Static files
app.use(express.static("public"));
//Socket setup
var io = socket(server);
//In socket.io, the on() method is used to listen for incoming events from the client or the server.
//It allows you to define event handlers that will be executed when a specific event occurs.
io.on("connection", function (socket) {
  console.log("made socket connection", socket.id);

  // Handle chat event
  socket.on("chat", function (data) {
    io.sockets.emit("chat", data);
  });
  /*
The code you provided is a server-side code snippet that handles incoming "chat" events from clients 
and then broadcasts the received data to all connected clients. Let's break it down:
socket.on("chat", function (data) { ... }): 
This code sets up an event listener on the server side for the "chat" event. 
Whenever a client emits a "chat" event to the server, this function will be executed, 
and the received data will be available in the data parameter.

io.sockets.emit("chat", data);: 
Once the server receives the "chat" event from a client, 
it immediately broadcasts the received data to all connected clients using io.sockets.emit(). 
This means that all connected clients, including the one that triggered the original "chat" event, 
will receive the "chat" event with the same data.
*/

  // Handle typing event
  socket.on("typing", function (data) {
    socket.broadcast.emit("typing", data);
  });
});
