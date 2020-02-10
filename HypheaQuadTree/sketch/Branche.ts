
/**
 * 
 */
class Branch {
    parentBranch: Branch = null;
    rootParticle: Bud = null;
    lastParticle: Bud = null;
    qtree : QuadTree<Bud> = null;
    buds : Bud[] = [];
    childBranches : Branch[] = [];
  
    timeToLive : number = 100;
    currentLife : number = 0;
    growing = true;
    branchingFreq = 0;
    branchingLifeFactor = 0.5;

    constructor( qtree: QuadTree<Bud>, posx :number, posy: number, dir : number, 
        life : number, branchingFreq : number, branchingLifeFactor : number)
    {
        this.qtree = qtree;
        this.timeToLive = life;
        this.currentLife = 0;
        this.branchingFreq = branchingFreq;
        this.branchingLifeFactor = branchingLifeFactor;
    
        this.rootParticle = new Bud(posx, posy, dir, this);
        this.lastParticle = null;
        this.qtree.insert( this.rootParticle );
        this.buds.push(this.rootParticle);
        drawParticle(this.rootParticle);
    }
  
    grow() : boolean
    {

        this.childBranches.forEach(b => b.grow());

        // if end of life reach return
        if( this.currentLife > this.timeToLive) 
        {
            this.growing = false;
        }
    
        if( !this.growing)
        {
            return false;
        }
        
        // build next bud position
        let newPos : p5.Vector;
        let reference : Bud;
        
        if( this.lastParticle == null)
        {
            reference = this.rootParticle;
        }
        else
        {
            reference = this.lastParticle;
        }
    
        // create a new bud based on previous one from this same branch
        newPos = p5.Vector.fromAngle(reference.dir + randomGaussian(0.0, QUARTER_PI/4.0), 3.0);
        newPos = createVector(reference.x, reference.y).add(newPos);
    
        //console.log(`New pos ${newPos}`);
    
        // get buds around this new bud
        let near = this.qtree.query( new BoundaryRectangle(newPos.x-15, newPos.y-15, 30, 30));
        //console.log(`Near ${near.length}`);
    
        // remove buds that are from the same branch of this new bud
        // this to avoid near bud i-of our own branch to avoid us to grow
        near = near.filter(p => { 

            // exclude buds from the same branche 
            if( p.branch === this ) return false;
            
            // excludes buds from child branches
            for( let i = 0; i < this.childBranches.length; i++)
            {
                let cb = this.childBranches[i];
                if( p.branch === cb ) return false;
            }
            
            // excludes buds from direct parent branche
            if( p.branch.parentBranch != null)
            {
                if( p.branch.parentBranch === this) return false;
            }
             
            return true;
        } );
        //console.log(`Near filtered ${near.length}`);
        
        // check 
        let toClose = false;
        for( let i = 0; i < near.length; i++)
        {
            let p = near[i];
            if( p5.Vector.dist(createVector(p.x, p.y),createVector(newPos.x, newPos.y) ) < 10.0)
            {
            console.log("To close");
            toClose = true;
            break;
            }
        }
    
        if( toClose)
        {
            this.growing = false;
            return false;
        }
    
        let newParticle = new Bud(newPos.x, newPos.y, reference.dir, this);
    
        this.lastParticle = newParticle;
        this.qtree.insert(newParticle);
        this.buds.push(newParticle);
    
        drawParticle(newParticle);

        if( this.currentLife >= this.branchingFreq && this.currentLife % this.branchingFreq == 0)
        {
            let newBranche = new Branch( this.qtree, newParticle.x, newParticle.y, newParticle.dir + QUARTER_PI, 
                this.timeToLive * this.branchingLifeFactor, this.branchingFreq, this.branchingLifeFactor);

            this.childBranches.push( newBranche);
            newBranche.parentBranch = this;
        }
        
        this.currentLife++;
        return true;
        }
    }