class Ground
{
  allBranches : Branch[] = [];

  /**
   * Add a branche
   */
  addBranch( b : Branch)
  {
    this.allBranches.push( b );
  }

  /**
   * Check if a Bud is to close of a branches
   * @param b 
   */
  toCLose( b : Bud) : boolean
  {
    // loop over all branches
    // only check the bud against branches that are not owner of the bud, 
    // or parent of the branche parent of the bud
    return false;
  }
}