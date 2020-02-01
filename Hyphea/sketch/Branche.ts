class Branche
{
    root : p5.Vector;
    dir : number = 0.0;
    radius : number = 0.0;
    buds: Bud[] = [];
    lastBud : Bud;
    childBranches : Branche[] = [];
    growing = true;
    maxLife = 100;
    life = 100; 
    budDrawer : BudDrawer = null;

    constructor( pos : p5.Vector, dir : number, radius: number)
    {
        this.root = pos;
        this.dir = dir;
        this.radius = radius;
    }

    grow() : void
    {
        // gtow child branche
        this.childBranches.forEach(b => {
            b.grow();
        });

        // if this branch is not growing stop here
        if( !this.growing )return;

        // if first bud, grow from root
        if( this.buds.length == 0)
        {
            let newBud = new Bud(this.root, this.dir, this.radius);
            this.buds.push(newBud);
            this.lastBud = newBud;
            //newBud.draw();
            this.budDrawer.draw(newBud);
        }
        else // otherwise grow from last bud
        {
            let growth = p5.Vector.fromAngle(this.lastBud.dir, 4.0);
            let newBud = new Bud(p5.Vector.add(this.lastBud.pos, growth), this.lastBud.dir + randomGaussian(0, QUARTER_PI/8.0), this.lastBud.radius );
            this.buds.push(newBud);
            this.lastBud = newBud;
            //newBud.draw();
            this.budDrawer.draw(newBud);
        }

        // every 20 buds, create a sub branch
        if( this.buds.length % 10 == 0)
        {
            let newB = new Branche(this.lastBud.pos, this.lastBud.dir + randomGaussian(0.0, QUARTER_PI), this.lastBud.radius);
            newB.budDrawer = this.budDrawer;
            newB.life = this.life / 2.0;
            this.childBranches.push( newB);
        }

        // if maxium buds reach stop growing
        if( this.buds.length >= this.life) this.growing = false;
    }
}
