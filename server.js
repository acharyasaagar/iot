const express = require('express');
const app = express();
const socket = require('socket.io');
const Gpio = require('onoff').Gpio; //include onoff to interact with the GPIO
const LED = new Gpio(4, 'out');
const path = require('path');

//start server at port 5000
var server = app.listen(5000, () => console.log('Listening at port 5000'));
// setup view engine
app.set('view engine', 'html');
app.use(express.static('public'));
//serve the UI
//Get route
app.get('/', (req, res) => {
	res.sendFile(path.resolve(__dirname,'./index.html'));
});

// Create a socket and pass express server as the handler
var io = socket(server);
//Add the connection event
io.on('connection', function (socket) {
      let lightStatus = 0; //light status initially set at 0

      // When server receives light event emitted by client

      socket.on('light', function(data){
            lightStatus = data; //write the data coming from light event to lightStatus
            if(lightStatus != LED.readSync()){ // if it is same as current state no change is required
                  LED.writeSync(lightStatus);// write lightStatus
            }
      });
});

process.on('SIGINT', function () {
      LED.writeSync(0); // Turn off the LED
      LED.unexport(); // Free the resources by unexporting Gpio
      process.exit(); //exit
    });
