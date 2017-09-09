const path = require('path');
const express = require('express');
const app = express();

const server = app.listen(3000, '0.0.0.0', function () {
    const host = 'localhost';
    const port = server.address().port;
    console.log('listening on http://'+host+':'+port+'/');
});

const io = require('socket.io').listen(server);

const htmlPath = path.join(__dirname, '/public');

app.use(express.static(htmlPath));


io.on('connection', function(socket){
    console.log('a user connected');
    socket.emit("Start_Chat");

    socket.on('disconnect', function(){
        console.log('user disconnected');
    });

    socket.on('chat message', function(msg){
        console.log('message: ' + msg);
    });
});