
class myBudDrawer extends BudDrawer
{
    colorScale : chroma.Scale;

    init()
    {
        this.colorScale = chroma.scale(['#fafa6e','#2A4858']);
    }

    draw( b : Bud, c : chroma.Color)
    {
        //let color : chroma.Color = this.colorScale(0.5 + randomGaussian(0,0.2));
        fill(c.rgb());
        noStroke();
        //circle(b.pos.x, b.pos.y, b.radius+ randomGaussian(0,2.0));
        circle(b.pos.x, b.pos.y, b.radius);
    }
}

let b : Branch;
let g : Ground;

function setup() {
    createCanvas(windowWidth, windowHeight);
    background(45, 33, 46);
    g = new Ground();
    b = new Branch(createVector(windowWidth*1/2, windowHeight*1/2), -HALF_PI, 5.0, 250, 0);
    b.budDrawer = new myBudDrawer();
    b.budDrawer.init();
    g.addBranch(b);
    //b.setGround( g );
}

function draw() {
    b.grow();
}
