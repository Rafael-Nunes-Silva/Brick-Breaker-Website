const L = -1;
const R = 1;
const U = -1;
const D = 1;

const LArrow_key = 37;
const RArrow_key = 39;

const halfScrWidth = window.innerWidth/2;
const halfScrHeight = window.innerHeight/2;

function Vector(x, y){
    this.x = x;
    this.y = y;
}

class GameDiv{
    constructor(size){
        this.size = size;
        this.borders = [
            new Vector((window.innerWidth-size.x)/2, 0),
            new Vector(size.x+((window.innerWidth-size.x)/2), size.y)
        ];

        let doc = document.getElementById("game");
        doc.style.width = size.x+"px";
        doc.style.height = size.y+"px";
        this.doc = doc;
    }
}
class Brick {
    constructor(pos, size, color){
        this.destroyed = false;
        let b = document.createElement("span");
        b.setAttribute("class", "brick")
        this.doc = gameDiv.doc.appendChild(b);
        this.pos = pos;
        this.size = size;
        this.doc.style.left = pos.x+"px";
        this.doc.style.top = pos.y+"px";
        this.doc.style.padding = size.x+"px " + size.y+"px";
        this.doc.style.backgroundColor = color;
    }

    GetSize(){
        return this.size;
    }

    IsDestroyed(){
        return this.destroyed;
    }

    Destroy(){
        gameDiv.doc.removeChild(this.doc);
        this.destroyed = true;
    }
}
class Ball {
    constructor(pos) {
        this.doc = document.getElementById("ball");
        this.pos = pos;
        this.size = 32;
        this.dir = new Vector(0, 0);
        this.doc.style.left = pos.x+"px";
        this.doc.style.top = pos.y+"px";
    }
    
    Move(speed){
        let newPos = new Vector(this.pos.x + (this.dir.x * speed), this.pos.y + (this.dir.y * speed));

        if(newPos.x < (window.innerWidth - gameDiv.size.x)/2){
            newPos.x = (window.innerWidth - gameDiv.size.x)/2;
            this.dir.x = R;
        }
        else if(newPos.x > window.innerWidth - ((window.innerWidth - gameDiv.size.x)/2) - this.size){
            window.innerWidth - ((window.innerWidth - gameDiv.size.x)/2) - this.size
            this.dir.x = L;
        }

        if(ball.pos.y < 0){
            newPos.y = 0;
            ball.dir.y = D;
        }
        else if(ball.pos.y > gameDiv.size.y - this.size){
            newPos.y = gameDiv.size.y - this.size;
            ball.dir.y = U;
        }

        CheckCollision();

        this.pos = newPos;
        this.doc.style.left = this.pos.x+"px";
        this.doc.style.top = this.pos.y+"px";
    }
}
class Player {
    constructor(pos) {
        this.doc = document.getElementById("player");
        this.pos = pos;
        this.doc.style.left = pos.x+"px";
        this.doc.style.top = pos.y+"px";
    }
    
    Move(dir, speed){
        this.pos.x += dir.x * speed;
        this.pos.y += dir.y * speed;
        this.doc.style.left = this.pos.x+"px";
        this.doc.style.top = this.pos.y+"px";
    }
}

var gameDiv;

var player;
var ball;

var bricks = [];

function SetupGame(){
    gameDiv = new GameDiv(new Vector(window.innerWidth*0.75, window.innerHeight*0.75));

    player = new Player(new Vector(halfScrWidth, gameDiv.size.y));
    ball = new Ball(new Vector(halfScrWidth, halfScrHeight));

    let colors = [
        "aqua",
        "blue",
        "fuchsia",
        "green",
        "lime",
        "maroon",
        "navy",
        "olive",
        "purple",
        "red",
        "silver",
        "teal",
        "white",
        "yellow"
    ]
    for(let i=0, b=0; i<gameDiv.size.x/52-1; i++){
        for(let j=0; j<6; j++, b++){
            let pos = new Vector(gameDiv.borders[0].x, gameDiv.borders[0].y);
            pos.x += (52*i)+3;
            pos.y += (32*j)+3;
            bricks[b] = new Brick(pos, new Vector(15, 25), colors[Math.floor(Math.random()*14+1)]);
        }
    }
}
function StartGame(){

    ball.dir = new Vector(R, U);

    GameLoop();
}
function GameLoop() {
    
    ball.Move(10);

    window.requestAnimationFrame(GameLoop);
}

function CheckCollision(){
    for(let b=0; b<bricks.length; b++){
        let dist = Math.sqrt(Math.pow(bricks[b].pos.x-ball.pos.x, 2) + Math.pow(bricks[b].pos.y-ball.pos.y, 2));
        if(!bricks[b].IsDestroyed() && dist < 32)
            bricks[b].Destroy();
    }
}

document.addEventListener('keypress', function(event) {
    if(event.key == LArrow_key){
        player.dir = new Vector(L, 0);
        player.Move(L, 10);
    }
    else if(event.key == RArrow_key){
        player.dir = new Vector(R, 0);
        player.Move(R, 10);
    }
});