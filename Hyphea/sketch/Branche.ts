class Branch
{
    ground : Ground = null;
    parentBranch : Branch = null;
    rootPos : p5.Vector;
    dir : number = 0.0;
    radius : number = 0.0;
    buds: Bud[] = [];
    lastBud : Bud;
    childBranches : Branch[] = [];
    growing = true;
    maxLife = 500;
    life = 0; 
    budDrawer : BudDrawer = null;
    idx : number = -1;
    generation : number = 0;
    rootBudIdx : number = -1;

    constructor( pos : p5.Vector, dir : number, radius: number, maxLife : number, generation: number)
    {
        this.rootPos = pos;
        this.dir = dir;
        this.radius = radius;
        this.maxLife = maxLife;
        this.life = 0;
        this.generation = generation;
    }

    // setGround( g : Ground)
    // {
    //     this.ground = g;
    //     this.ground.addBranch(this);
    // }

    grow() : void
    {
        // grow child branches
        this.childBranches.forEach(b => {
            b.grow();
        });

        // if this branch is not growing stop here
        if( !this.growing )return;

        // if first bud, grow from root
        if( this.buds.length == 0)
        {
            let newBud = new Bud(this.rootPos, this.dir, this.radius);
            this.buds.push(newBud);
            this.life++;
            this.lastBud = newBud;
            newBud.branch = this;
            this.budDrawer.draw(newBud, this.ground.colorScale((this.idx%10.0)/10.0));
        }
        else // otherwise grow from last bud
        {
            let growth = p5.Vector.fromAngle(this.lastBud.dir, 4.0);
            let newBud = new Bud(p5.Vector.add(this.lastBud.pos, growth), this.lastBud.dir + randomGaussian(0, QUARTER_PI/8.0), this.lastBud.radius );
            newBud.branch = this;

            // TODO check if bud is not to close another branches
            if( this.ground.toClose(newBud))
            {
                this.growing = false;
                return;
            } 

            newBud.idx = this.buds.length;     
            this.buds.push(newBud);

            this.life++;
            this.lastBud = newBud;
            this.budDrawer.draw(newBud, this.ground.colorScale((this.idx%10.0)/10.0));
        }

        if( this.lastBud.pos.x < 0 || this.lastBud.pos.x > windowWidth || 
            this.lastBud.pos.y < 0 || this.lastBud.pos.y > windowHeight)
            {
                this.growing = false;
            }

        // if maxium buds reach stop growing
        if( this.life >= this.maxLife) this.growing = false;
        //if( this.generation >= 3) this.growing = false;
        //return;

        // every x buds, create a sub branch
        //if( this.life % floor(this.maxLife/4.0) == 0 )
        if( this.life % 20 == 0 )
        {
            let dir = (random(0.0, 6.0) < 3.0 ?-1.0:1.0);
            let newB = new Branch(this.lastBud.pos, this.lastBud.dir + (QUARTER_PI * dir), this.lastBud.radius, this.maxLife / 2.0, this.generation+1);
            this.ground.addBranch(newB);
            
            newB.rootBudIdx = this.lastBud.idx;
            newB.budDrawer = this.budDrawer;
            newB.parentBranch = this;

            this.childBranches.push( newB );
        }
    }
}
