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

      // bud owned by the current branch to test
      if( br == b.branch)
      {
        if(br.buds.length > 10)
        {
          for( let y = 0; y < br.buds.length-10; y++)
          {
            let bu = br.buds[y];
            if( p5.Vector.dist(b.pos, bu.pos) < 15.0) 
            {
              console.log(`Branch ${b.branch.idx} to close of branch ${br.idx}`);
              return true;
            }
          }
        }
        else
        {
          return false;
        }
      }
      else if( br == b.branch.parentBranch) // check if branch is grand mother of the bud branch 
      {
        let budRootIndex = b.branch.rootBudIdx;
        if( budRootIndex < 10 )
        {
          return false;
        }
        else if(budRootIndex > 10 && budRootIndex < br.buds.length - 10)
        {
          // search before bud branching idx
          for( let y = 0; y < budRootIndex-10; y++)
          {
            let bu = br.buds[y];
            if( p5.Vector.dist(b.pos, bu.pos) < 15.0) 
            {
              console.log(`Branch ${b.branch.idx} to close of branch ${br.idx}`);
              return true;
            }
          }

          // search after bud branching idx
          for( let y = budRootIndex+10; y < br.buds.length; y++)
          {
            let bu = br.buds[y];
            if( p5.Vector.dist(b.pos, bu.pos) < 15.0) 
            {
              console.log(`Branch ${b.branch.idx} to close of branch ${br.idx}`);
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
            console.log(`Branch ${b.branch.idx} to close of branch ${br.idx}`);
            return true;
          } 
        }
      }

      return false;
    }
  }
}