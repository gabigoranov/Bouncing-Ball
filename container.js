const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");

export class Container{
    constructor(x, y, size, thickness, color){
        this.x = x;
        this.y = y;
        this.size = size;
        this.color = color;
        this.thickness = thickness;
    }

    redraw(){
        ctx.moveTo(this.x, this.y);
        ctx.beginPath();
        ctx.lineWidth = this.thickness;
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.strokeStyle = this.color;
        ctx.stroke();
        ctx.lineWidth = 1;
        ctx.strokeStyle = 'black';
    }
}