const path = require('path');
const express = require('express');
const app = express();

const server = app.listen(process.env.PORT, function () {
    const host = 'localhost';
    const port = server.address().port;
    console.log('listening on http://'+host+':'+port+'/');
});

const io = require('socket.io').listen(server);

const htmlPath = path.join(__dirname, '/public');

app.use(express.static(htmlPath));


let rooms = {};

io.on('connection', function(socket){
    console.log('a user connected');
    socket.emit("Start_Chat");

    socket.on('disconnect', function(){
        console.log('user disconnected');
    });

    socket.on('chat message', function(msg){
        console.log('message: ' + msg);
    });

    socket.on("create-room", function (msg) {
        let room = new Room(msg);
        rooms[room.code] = room;
        socket.on("username", function (username) {
            room.users.push(username);
            console.log(username + "created room: " + room.code);
            room.socketRoom.emit("username", room.users);
        });

        socket.emit("confirm-room", room.code);
    });

    socket.on("join-room", function (msg) {
        if (msg in rooms) {
            socket.emit("room-joined", "joined");
            socket.on("username", function (username) {
                rooms[msg].users.push(username);
                console.log(username + "joined room: " + rooms[msg].code);
                rooms[msg].socketRoom.emit("username", rooms[msg].users);
            });
        } else {
            socket.emit("room-joined", "bad");
        }
    })
});

function Room(owner) {
    this.code = GenerateCode();
    this.users = [];
    this.owner = owner;

    this.socketRoom = io.of('/' + this.code);
    // this.socketRoom.on("username", function (msg) {
    //     this.users.push(msg);
    //     console.log(this.users);
    // });

    this.checkCode = function(toCheck) {
        return toCheck === this.code;

    }
}

/**
 * @return {string}
 */
function GenerateCode() {
    let text = "";
    const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (let i = 0; i < 5; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}