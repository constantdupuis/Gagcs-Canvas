
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

let b : Branche;

function setup() {
    createCanvas(windowWidth, windowHeight);
    background(45, 33, 46);
    b = new Branche(createVector(windowWidth/2.0, windowHeight*0.8), -HALF_PI, 10.0);
    b.budDrawer = new myBudDrawer();
    b.budDrawer.init();
}

function draw() {
    b.grow();
}
