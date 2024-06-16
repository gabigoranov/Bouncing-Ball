import { Ball } from "./ball.js";
import { Container } from "./container.js";

const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");

let container = new Container(canvas.width/2, canvas.height/2, 400, 40, 'black');
let ball = new Ball(canvas.width/2, canvas.height/2, 30, 'green', container, true, false);


setInterval(() => {
    if(ball.isRedrawn){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    ball.redraw();
    container.redraw();

    const isInsideOfContainer = ball.checkCollision(ball.x, ball.y, ball.size, container.x, container.y, container.size-2*container.thickness-1);

    if (isInsideOfContainer) {
        //bounce
        ball.bounce();
        ball.move();
        let audio = document.getElementById('bounce');
        audio.play();
    }
    else{
        ball.move();
    }

}, 10);

