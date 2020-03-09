/**
 *
 */
class YDivisionStrategy implements DivisionStrategy {
  private divisionThreshold: number = 20; // threshold os given in ratio between 0.0 and 1.0
  private newTimeToLiveRatio: number = 0.5; // this determine the life time ratio of child branches
  private maxGeneration: number = 10;

  constructor(
    divisionThreshold: number,
    newTimeToLiveRatio: number,
    maxGeneration: number
  ) {
    this.divisionThreshold = divisionThreshold;
    this.newTimeToLiveRatio = newTimeToLiveRatio;
    this.maxGeneration = maxGeneration;
  }
  /**
   *
   * @param parentBranch
   */
  divide(parentBranch: Branch): boolean {
    let ret = false;

    if (parentBranch.generation >= this.maxGeneration) {
      console.log("Max generation reached.");
      parentBranch.setGrowing(false);
      return ret;
    }

    let step = ceil(parentBranch.timeToLive * this.divisionThreshold);

    if (parentBranch.currentLife > 0 && parentBranch.currentLife % step == 0) {
      let lastBud = parentBranch.lastBud;
      let newTTL = parentBranch.timeToLive * this.newTimeToLiveRatio;
      if (newTTL <= 5) {
        console.log("New branche to small, I don't devide");
        return ret;
      }

      //console.log(`Spawn 2 branchs, TTL: ${newTTL}`);

      let newBranch = new Branch(parentBranch.generation + 1, newTTL);
      let rootBud = new Bud(
        lastBud.x,
        lastBud.y,
        lastBud.dir + HALF_PI / 1.0,
        lastBud.radius
      );
      newBranch.grow(rootBud);
      parentBranch.addChildBranch(newBranch);

      newBranch = new Branch(parentBranch.generation + 1, newTTL);
      rootBud = new Bud(
        lastBud.x,
        lastBud.y,
        lastBud.dir - HALF_PI / 1.0,
        lastBud.radius
      );
      newBranch.grow(rootBud);
      parentBranch.addChildBranch(newBranch);

      ret = true;
    }
    return ret;
  }
}
