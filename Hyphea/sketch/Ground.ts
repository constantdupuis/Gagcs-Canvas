class Ground
{
  allBranches : Branch[] = [];
  colorScale : chroma.Scale;

  constructor()
  {
    this.colorScale = chroma.scale(['red', 'yellow', 'black','blue', 'white', 'green']);
  }

  /**
   * Add a branche
   */
  addBranch( b : Branch) : number
  {
    b.ground = this;
    b.idx = this.allBranches.length;
    this.allBranches.push( b );
    console.log(`New branche with id ${this.allBranches.length-1}`);
    return this.allBranches.length-1;
  }

  /**
   * Check if a Bud is to close of a branches
   * @param b 
   */
  toClose( b : Bud) : boolean
  {
    // loop over all branches
    for( let i = 0; i < this.allBranches.length; i++)
    {
      let br = this.allBranches[i];

      //console.log(`current branche id ${br.idx} bud branch id ${b.branch.idx}`);

      // bud owned by the current branch to test
      if( br.idx == b.branch.idx)
      {
        if(br.buds.length > 10)
        {
          for( let y = 0; y < br.buds.length-10; y++)
          {
            let bu = br.buds[y];
            if( p5.Vector.dist(b.pos, bu.pos) < 10.0) 
            {
              console.log(`1 Branch ${b.branch.idx} to close from parent branch ${br.idx}`);
              console.log(`current branche id ${br.idx} bud branch id ${b.branch.idx}`);
              //console.log(this.allBranches);
              return true;
            }
          }
        }
        else
        {
          return false;
        }
      }
      else if( br.idx == b.branch.parentBranch.idx) // check if branch is grand mother of the bud branch 
      {
        let budRootIndex = b.branch.rootBudIdx;
        if( budRootIndex < 10 )
        {
          return false;
        }
        else if(budRootIndex > 10 && budRootIndex < br.buds.length - 5)
        {
          // search before bud branching idx
          for( let y = 0; y < budRootIndex-5; y++)
          {
            let bu = br.buds[y];
            if( p5.Vector.dist(b.pos, bu.pos) < 20.0) 
            {
              console.log(`2 Branch ${b.branch.idx} to close from grand parent branch ${br.idx}`);
              console.log(`current branch ${br.idx}, curretn bud ${b.idx} bud branch ${b.branch.idx}, parent branch ${b.branch.parentBranch.idx}`);
              //console.log(this.allBranches);
              return true;
            }
          }

          // search after bud branching idx
          for( let y = budRootIndex+10; y < br.buds.length; y++)
          {
            let bu = br.buds[y];
            if( p5.Vector.dist(b.pos, bu.pos) < 20.0) 
            {
              console.log(`3 Branch ${b.branch.idx} to close from grand parent branch ${br.idx}`);
              console.log(`current branch ${br.idx}, curretn bud ${b.idx} bud branch ${b.branch.idx}, parent branch ${b.branch.parentBranch.idx}`);
              //console.log(this.allBranches);
              return true;
            }
          }
        }
      }
      else // branche is any other
      {
        for( let y = 0; y < br.buds.length; y++)
        {
          let bu = br.buds[y];
          if( p5.Vector.dist(b.pos, bu.pos) < 15.0)
          {
            console.log(`3 Branch ${b.branch.idx} to close of branch ${br.idx}`);
            console.log(`current branche id ${br.idx} bud branch id ${b.branch.idx}`);
            return true;
          } 
        }
      }

      return false;
    }
  }
}