const socket = io.connect(window.location.host);
let join, create;

let newPress = true;

function setup() {
    console.log("ye");
    createCanvas(windowWidth,windowHeight);
    socket.on('connect', function(){
        // Setup here
        console.log("YEEE");
    });

    socket.on("Start_Chat",function(){

    });
    create = new Button("Create Room", 200, 40, width/2 - 100, height/2, function () {
        alert("");
    });
    join = new Button("Join Room", 200, 40, width/2 + 100, height/2, function () {
        alert("");
    });
}

function draw() {
    join.tick();
    create.tick();
}

function Button(label, width, height, x, y, onClick) {
    this.label = label;
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.onClick = onClick;

    this.tick = function () {
        strokeWeight(3);
        line(this.x - this.width/2, this.y - this.height/2, this.x + this.width/2, this.y - this.height/2);
        line(this.x + this.width/2, this.y - this.height/2, this.x + this.width/2, this.y + this.height/2);
        line(this.x + this.width/2, this.y + this.height/2, this.x - this.width/2, this.y + this.height/2);
        line(this.x - this.width/2, this.y + this.height/2, this.x - this.width/2, this.y - this.height/2);

        
        textSize(30);
        textAlign(CENTER, CENTER);
        color(0, 0, 0);
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