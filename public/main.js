const socket = io.connect(window.location.host);
let join, create, myName, start;

let newPress = true;

const scenes = {
    MAIN: 0,
    ROOM: 1,
    GAME: 2
};

let currentScene = scenes.MAIN;

let code, isOwner;

let players = [];

function setup() {
    createCanvas(windowWidth,windowHeight);
    socket.on('connect', function(){
        // Setup here
    });

    socket.on("Start_Chat",function(){

    });
    create = new Button("Create Room", 200, 40, width/2 - 100, height/2, function () {
        myName = prompt("What's your name?");
        socket.emit("create-room", myName);
        socket.on("confirm-room", function (msg) {
            code = msg;
            start = new Button("Start Game", 200, 40, width/2, height/8 * 7, function () {
                socket.emit("start", "yeah");
                currentScene = scenes.GAME;
            });
            isOwner = true;
            currentScene = scenes.ROOM;
            let roomSocket = io('/' + code);
            roomSocket.on("username", function (msg) {
                players = msg;
            });
            socket.emit("username", myName);
        });
    });
    join = new Button("Join Room", 200, 40, width/2 + 100, height/2, function () {
        code = prompt("What's the room code?");
        socket.emit("join-room", code);
        socket.on("room-joined", function (msg) {
            if (msg === "joined") {
                let roomSocket = io('/' + code);
                roomSocket.on("username", function (msg) {
                    players = msg;
                });
                myName = prompt("Room found, what's your name?");
                socket.emit("username", myName);
                isOwner = false;
                currentScene = scenes.ROOM;
            } else {
                alert("Room not found")
            }
        })
    });
}

function draw() {
    background(255);
    if (currentScene === scenes.MAIN) {
        join.tick();
        create.tick();
    } else if (currentScene === scenes.ROOM) {
        textSize(40);
        textAlign(CENTER, CENTER);
        color(0, 0, 0);
        fill(0, 0, 0);
        text("Join with code: " + code, width/2, height/6);
        text("Connected Users: ", width/2, height/6 + 80);


        textSize(20);
        for (let index = 0; index < players.length; ++index) {
            text(players[index], width/2, height/6 + 120 + (index * height/20));
        }
        
        if (isOwner) {
            if (players.length > 3) {
                start.grayed = false;
            } else {
                start.grayed = true;
            }
            start.tick();
        }
    } else if (currentScene = scenes.GAME) {
        drawGame();
    }
}

function Button(label, width, height, x, y, onClick) {
    this.label = label;
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.onClick = onClick;
    this.grayed = false;

    this.tick = function () {
        fill(0, 0, 0);
        textSize(30);
        strokeWeight(3);
        line(this.x - this.width/2, this.y - this.height/2, this.x + this.width/2, this.y - this.height/2);
        line(this.x + this.width/2, this.y - this.height/2, this.x + this.width/2, this.y + this.height/2);
        line(this.x + this.width/2, this.y + this.height/2, this.x - this.width/2, this.y + this.height/2);
        line(this.x - this.width/2, this.y + this.height/2, this.x - this.width/2, this.y - this.height/2);
        textAlign(CENTER, CENTER);

        if (this.grayed) {
            fill(150, 150, 150);
        } else {
            fill(0, 0, 0);
        }
        strokeWeight(0);
        text(this.label, this.x, this.y);
        if (mouseIsPressed && (mouseX > this.x - this.width/2 && mouseX < this.x + this.width/2)
            && (mouseY > this.y - this.height/2 && mouseY < this.y + this.height/2) && newPress) {
            newPress = false;
            this.onClick();
        }
    };
}

function mouseReleased() {
    newPress = true;
}


const items = ['a starry sky', 'a large panda', 'the empire state building'];
// const thing = things[Math.floor(Math.random()*things.length)];

