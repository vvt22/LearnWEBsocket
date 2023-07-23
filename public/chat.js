// Make connection
//The code you provided below is using socket.io to create a client-side socket
//connection to a server running at "http://localhost:4000".
var socket = io.connect("http://localhost:4000");

/*  io: It is a global object provided by the socket.io library that 
allows you to work with WebSockets and real-time communication.
io.connect("http://localhost:4000"): 
This line creates a socket connection to the server located at "http://localhost:4000". 
It means the client is attempting to establish a real-time communication channel with the server.
Assuming there is a socket.io server running at "http://localhost:4000", 
this line of code sets up a bidirectional communication channel 
between the client (where this code is executed) and the server.   */

// Query DOM
var message = document.getElementById("message"),
  handle = document.getElementById("handle"),
  btn = document.getElementById("send"),
  feedback = document.getElementById("feedback"),
  output = document.getElementById("output");

// Emit events
btn.addEventListener("click", function () {
  socket.emit("chat", {
    message: message.value,
    handle: handle.value,
  });
  message.value = "";
});
message.addEventListener("keypress", function () {
  socket.emit("typing", handle.value);
});

// Listen for events
socket.on("chat", function (data) {
  feedback.innerHTML = "";
  output.innerHTML +=
    "<p><strong>" + data.handle + ": </strong>" + data.message + "</p>";
});

socket.on("typing", function (data) {
  feedback.innerHTML = "<p><em>" + data + " is typing a message...</em></p>";
});
