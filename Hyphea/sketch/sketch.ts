
class myBudDrawer extends BudDrawer
{
    colorScale : chroma.Scale;

    init()
    {
        this.colorScale = chroma.scale(['#fafa6e','#2A4858']);
    }

    draw( b : Bud)
    {
        let color : chroma.Color = this.colorScale(0.5 + randomGaussian(0,0.2));
        fill(color.rgb());
        noStroke();
        circle(b.pos.x, b.pos.y, b.radius+ randomGaussian(0,2.0));
    }
}

let b : Branch;
let g : Ground;

function setup() {
    createCanvas(windowWidth, windowHeight);
    background(45, 33, 46);
    g = new Ground();
    b = new Branch(createVector(windowWidth/2.0, windowHeight*0.8), -HALF_PI, 10.0);
    b.budDrawer = new myBudDrawer();
    b.budDrawer.init();
    b.setGround( g );
}

function draw() {
    b.grow();
}
