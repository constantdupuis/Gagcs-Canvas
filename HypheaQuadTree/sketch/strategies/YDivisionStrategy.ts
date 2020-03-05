/**
 *
 */
class YDivisionStrategy implements DivisionStrategy {
  private divisionThreshold: number = 20; // threshold os given in life time tick
  private newTimeToLiveRatio: number = 0.5; // this determine the life time ratio of child branches

  constructor(divisionThreshold: number, newTimeToLiveRatio: number) {
    this.divisionThreshold = divisionThreshold;
    this.newTimeToLiveRatio = newTimeToLiveRatio;
  }
  /**
   *
   * @param parentBranch
   */
  divide(parentBranch: Branch): boolean {
    let ret = false;
    if (
      parentBranch.currentLife > 0 &&
      parentBranch.currentLife % this.divisionThreshold == 0
    ) {
      let lastBud = parentBranch.lastBud;
      let newTTL = parentBranch.timeToLive * this.newTimeToLiveRatio;

      //console.log(`Spawn 2 branchs, TTL: ${newTTL}`);

      let newBranch = new Branch(parentBranch.generation + 1, newTTL);
      let rootBud = new Bud(
        lastBud.x,
        lastBud.y,
        lastBud.dir + HALF_PI / 2.0,
        lastBud.radius
      );
      newBranch.grow(rootBud);
      parentBranch.addChildBranch(newBranch);

      newBranch = new Branch(parentBranch.generation + 1, newTTL);
      rootBud = new Bud(
        lastBud.x,
        lastBud.y,
        lastBud.dir - HALF_PI / 2.0,
        lastBud.radius
      );
      newBranch.grow(rootBud);
      parentBranch.addChildBranch(newBranch);
      ret = true;
    }
    return ret;
  }
}
