var socket;

function setup() {
    createCanvas(200, 200);
    background(51);

    socket = io.connect('http://localhost:5000'); // Connect to the socket.io server
    socket.on('mouse', newDrawing); // Listen for 'mouse' events from the server
}

function newDrawing(data) {
    console.log(data); // Log the received data
    noStroke();
    fill(255, 0, 0); // Set fill color to red
    ellipse(data.x, data.y, 4, 4); // Draw a circle at the received coordinates
}

function mouseDragged() {
    console.log(mouseX + "," + mouseY);
    noStroke();
    fill(255);
    ellipse(mouseX, mouseY, 4, 4); // Draw a circle at the mouse position

    // data for message
    var data = {
        x: mouseX,
        y: mouseY
    }; 
    socket.emit('mouse', data); // Emit the 'mouse' event with the data
}

// function draw() {
//     if (mouseIsPressed) {
//         stroke(255);
//         strokeWeight(4);
//         line(mouseX, mouseY, pmouseX, pmouseY); // Draw a line from the previous mouse position to the current mouse position
//     }
// }