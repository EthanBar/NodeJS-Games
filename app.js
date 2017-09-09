var path = require('path');
var express = require('express');
var app = express();

var server = app.listen(3000, '0.0.0.0', function () {
    var host = 'localhost';
    var port = server.address().port;
    console.log('listening on http://'+host+':'+port+'/');
});

var io = require('socket.io').listen(server);

var htmlPath = path.join(__dirname, '/public');

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