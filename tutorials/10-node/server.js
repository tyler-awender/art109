var express = require('express'); // Import the express module

var app = express(); // Create an instance of express
var server = app.listen(5000);

app.use(express.static('public')); // Serve static files from the 'public' directory

console.log('Server is running on port 3000');

var socket = require('socket.io'); // Import the socket.io module
var io = socket(server); // Create a socket.io server using the HTTP server

io.sockets.on('connection', newConnection);

function newConnection(socket) {
    console.log("New connection: " + socket.id); // Log the new connection
    socket.on('mouse', mouseMsg); // Listen for 'mouse' events from the client

    function mouseMsg(data) {
        console.log(data); // Log the received data
        socket.broadcast.emit('mouse', data); // Broadcast the 'mouse' event to all other connected clients
    }
}