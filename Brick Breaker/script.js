const L = -1;
const R = 1;
const U = -1;
const D = 1;

const A_key = 65;
const D_key = 68;

function Vector(x, y){
    this.x = x;
    this.y = y;
}

function Ball(pos, dir){
    this.pos = pos;
    this.dir = dir;
}

var ball = new Ball(new Vector(0, 0), new Vector(R, D));
var vel = 10;

var stop = false;

function Step() {
    if(stop) return;

    if(GetInput(A_key))
        MovePlayer(L);
    else if(GetInput(D_key))
        MovePlayer(R);
    
    MoveBall();
    ClampBall();

    window.requestAnimationFrame(Step);
}
window.requestAnimationFrame(Step);

function GetX(){
    return parseInt(document.getElementById("ball").style.left, 10);
}
function GetY(){
    return parseInt(document.getElementById("ball").style.top, 10);
}

function MoveBall(){
    ball.pos.x += (ball.dir.x * vel);
    ball.pos.y += (ball.dir.y * vel);

    document.getElementById("ball").style.left = ball.pos.x+"px";
    document.getElementById("ball").style.top = ball.pos.y+"px";
}
function ClampBall(){
    if(GetX() <= 0)
        ball.dir.x = R;
    else if(GetX() > 1500)
        ball.dir.x = L;

    if(GetY() <= 0)
        ball.dir.y = D;
    else if(GetY() > 700)
        ball.dir.y = U;
}

function MovePlayer(dir){
    let pos = document.getElementById("player").style.left;
    console.log("Move Player")
    if(dir == L){
        pos -= 10;
    }
    else if (dir == R){
        pos += 10;
    }
    document.getElementById("player").style.left = pos;
}

function GetInput(key){
    document.addEventListener('keydown', function(event) { return (event.keyCode == key) }, false);
}