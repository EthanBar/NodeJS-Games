const socket = io.connect(window.location.host);
let newButton;

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
    newButton = new Button("Help me", 100, 40, 100, 100);
}

function draw() {
    // strokeWeight(1);
    // if (mouseIsPressed) {
    //     fill(0);
    // } else {
    //     fill(255);
    // }
    // ellipse(mouseX, mouseY, 80, 80);
    newButton.update();
}

function Button(label, width, height, x, y, onClick) {
    this.label = label;
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;

    this.update = function () {
        strokeWeight(3);
        line(this.x - this.width/2, this.y - this.height/2, this.x + this.width/2, this.y - this.height/2);
        line(this.x + this.width/2, this.y - this.height/2, this.x + this.width/2, this.y + this.height/2);
        line(this.x + this.width/2, this.y + this.height/2, this.x - this.width/2, this.y + this.height/2);
        line(this.x - this.width/2, this.y + this.height/2, this.x - this.width/2, this.y - this.height/2);

        textSize(30);
        textAlign(CENTER, CENTER);
        color(0, 0, 0);
        text(this.label, this.x, this.y);

        if (mouseIsPressed && (mouseX > this.x - width/2 && mouseX < this.x + width/2)
            && (mouseY > this.x - height/2 && mouseY < this.x + height/2) && newPress) {
            newPress = false;
            alert("yee");
        }
    };
}

function mouseReleased() {
    newPress = true;
}