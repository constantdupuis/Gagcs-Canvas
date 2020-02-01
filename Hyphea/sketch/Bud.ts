class Bud
{
    pos : p5.Vector;
    dir : number = 0.0;
    radius : number = 0.0;

    constructor( pos : p5.Vector, dir : number, radius : number)
    {
        this.pos = pos;
        this.dir =dir;
        this.radius = radius;
    }

    draw() : void{
        fill(122, 126, 93);
        noStroke();
        circle(this.pos.x, this.pos.y, this.radius);
    }
}

