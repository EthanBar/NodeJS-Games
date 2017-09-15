const roles = {
    DRAW: 0,
    JUDGE: 1,
    RESULTS: 2
};

let role = roles.DRAW;

let singleDraw = {
    size: 1,
    r: 0,
    g: 0,
    b: 0,
    x: 0,
    y: 0
};

let draws = [];
let penSize = 2;
let penColor;

function drawGame() {
    switch (role) {
        case roles.DRAW:
            drawNow();
            break;
        case roles.JUDGE:

            break;

        case roles.RESULTS:

            break;
        default:

    }
}


let lastPress = false;
function drawNow() {
    penColor = color(0, 0, 0);
    socket.emit("ready-draw", code);
    strokeWeight(3);
    color(0, 0, 0);
    let x = 300, y = 300;
    line(width/2 + x, height/2 + y, width/2 - x, height/2 + y);
    line(width/2 - x, height/2 + y, width/2 - x, height/2 - y);
    line(width/2 - x, height/2 - y, width/2 + x, height/2 - y);
    line(width/2 + x, height/2 - y, width/2 + x, height/2 + x);

    if (mouseIsPressed && (mouseX < width/2 + x) && (mouseX > width/2 - x) && (mouseY < height/2 + y) && (mouseY > height/2 - y)) {
        draws.push(penSize);
        draws.push(mouseX - width/2 + x);
        draws.push(mouseY - height/2 + x);
        draws.push(lastPress);
    }

    strokeWeight(0);
    fill(0, 0, 0);
    for (let p = 0; p < draws.length; p += 4) {
        // strokeWeight(draws[p]);
        // fill(draws[i].r, draws[i].g, draws[i].b);
        if (p >= 3 && draws[p + 3]) {
            strokeWeight(draws[p]);
            line(draws[p - 3] + width / 2 - x, draws[p - 2] + height / 2 - y, draws[p + 1] + width / 2 - x, draws[p + 2] + height / 2 - y);
        }

    }
    lastPress = mouseIsPressed;
}