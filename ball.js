const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");

export class Ball{
    constructor(x, y, size, color, container, isRedrawn, isColorRandom){
        this.x = x;
        this.y = y;
        this.size = size;
        this.color = color;
        this.isRedrawn = isRedrawn;
        this.isColorRandom = isColorRandom;
        this.fills = {
            0: 'black',
            1: 'white',
            2: 'green',
            3: 'red',
            4: 'blue',
            5: 'yellow',
            6: 'pink',
        };

        this.forceX = 0;
        this.forceY = 0;

        this.container = container;

        this.dirX = 'right';
    }

    redraw(){
        ctx.moveTo(this.x, this.y);
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI*2);
        ctx.stroke();
        if(this.isColorRandom){
            let random = Math.floor(Math.random()*(6-0)+0n);
            this.color = this.fills[random];
        }
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.fillStyle = 'black';
    }


    move(){
        this.y += this.forceY/30;
        this.x += this.forceX/30;

        this.forceY -= this.forceY/30;
        this.forceX -= this.forceX/30;


        this.gravity(7);

        this.redraw();
    }

    gravity(force){
        this.y += force;
    }

    bounce(){
        let randomY = Math.random()*(260-221)+221;
        let randomX = Math.random()*(250-50)+50;

        let incrementY = 300+randomY;

        let angle = this.angleOfBallToCenter();
        let incrementX = 50+randomX;

        this.forceY -= incrementY;
        if(this.checkCollision(this.x+incrementX, this.y-incrementY, this.size, this.container.x, this.container.y, this.container.size-2*this.container.thickness-1)){
            this.dirX = 'left';
        }
        else if(this.checkCollision(this.x-incrementX, this.y-incrementY, this.size, this.container.x, this.container.y, this.container.size-2*this.container.thickness-1))
        {
            this.dirX = 'right';
        }

        switch(this.dirX){
            case 'left':
                this.forceX -= incrementX;
                break;
            case 'right':
                this.forceX += incrementX;
                break;
        }
    }

    checkCollision(ballX, ballY, ballRadius, arcX, arcY, arcOuterRadius) {
        const dx = ballX - arcX;
        const dy = ballY - arcY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < ballRadius + arcOuterRadius) {
            return false;
        }
    
        return true;
    }

    angleOfBallToCenter(){
        const dx = this.x - this.container.x;
        const dy = this.y - this.container.y;

        const angle = Math.atan2(dy, dx);
        const angleDegrees = (angle * 180) / Math.PI;

        return angleDegrees;
    }

}